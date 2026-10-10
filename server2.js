//SERVIDOR API DE PEDIDOS

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const listaPreco = [
    { CodProduto: 1, PrecoProduto: 5.5 },
    { CodProduto: 2, PrecoProduto: 5 },
    { CodProduto: 3, PrecoProduto: 8 },
    { CodProduto: 4, PrecoProduto: 4 }
];

function buscarPreco(codigo) {
    for (var i = 0; i < listaPreco.length; i++) {
        if (listaPreco[i].CodProduto == codigo) {
            return listaPreco[i].PrecoProduto;
        }
    }
    return 0;
}

const listaPedidos = [
    { NumPedido: 1, NomeCliente: "João", TotalPedido: 10, Itens: [{ CodProduto: 1, Qtd: 1 }, { CodProduto: 2, Qtd: 3 }] },
    { NumPedido: 2, NomeCliente: "Maria", TotalPedido: 5, Itens: [{ CodProduto: 2, Qtd: 5 }] }
];

app.get('/produtos', async (req, res) => {
    var estoque = await fetch('http://localhost:3003/estoque');
    if (estoque.status === 200) {
        produtosServer3 = await estoque.json();

        var produtos = [];
        for (var i = 0; i < produtosServer3.length; i++) {
            produtos.push({
                CodProduto: produtosServer3[i].CodProduto,
                NomeProduto: produtosServer3[i].NomeProduto,
                PrecoProduto: buscarPreco(produtosServer3[i].CodProduto),
                Estoque: produtosServer3[i].Estoque
            });
        }
        res.status(200).json(produtos);
    }
    else {
        let statusCode = estoque.status;
        console.error(`Erro ao obter o estoque. Status code: ${statusCode}`);
    }
});

app.get('/pedidos', async (req, res) => {
    var estoque = await fetch('http://localhost:3003/estoque');
    if (estoque.status === 200) {
        produtosServer3 = await estoque.json();

        var linhas = [];
        for (var i = 0; i < listaPedidos.length; i++) {
            var pedido = listaPedidos[i];

            for (var j = 0; j < pedido.Itens.length; j++) {
                var item = pedido.Itens[j];

                var nome = '';
                for (var k = 0; k < produtosServer3.length; k++) {
                    if (produtosServer3[k].CodProduto == item.CodProduto) {
                        nome = produtosServer3[k].NomeProduto;
                    }
                }

                linhas.push({
                    NumPedido: pedido.NumPedido,
                    NomeCliente: pedido.NomeCliente,
                    TotalPedido: pedido.TotalPedido,
                    CodProduto: item.CodProduto,
                    NomeProduto: nome,
                    QuantidadePedida: item.Qtd,
                    PrecoProduto: buscarPreco(item.CodProduto)
                });
            }
        }
        res.status(200).json(linhas);
    }
    else {
        let statusCode = estoque.status;
        console.error(`Erro ao obter o estoque. Status code: ${statusCode}`);
    }
});

app.post('/pedidos', async (req, res) => {
    const resposta = await fetch('http://localhost:3003/estoque');
    const consultaEstoque = await resposta.json();

    const pedido = req.body;
    if (pedido.NomeCliente == null || pedido.NomeCliente === '') {
        return res.status(400).json({ message: 'Nome invalido' });
    }
    if (pedido.Itens === null) {
        return res.status(400).json({ message: 'Itens invalidos' });
    }

    for (let i = 0; i < pedido.Itens.length; i++) {
        const item = pedido.Itens[i];
        const quantidade = Number(item.Qtd);

        if (!Number.isInteger(quantidade) || quantidade <= 0) {
            return res.status(400).json({
                message: 'Quantidade inválida'
            });
        }

        const produtoEstoque = consultaEstoque.find(
            produto => produto.CodProduto === Number(item.CodProduto)
        );

        if (!produtoEstoque) {
            return res.status(400).json({
                message: 'Produto não encontrado'
            });
        }
        if (quantidade > produtoEstoque.Estoque) {
            return res.status(400).json({
                message: 'Quantidade maior que o estoque disponível'
            });
        }
    }

    let totalPedido = 0;

    if (pedido.Itens.length === 0) {
        return res.status(400).json({ message: 'PEDIDO SEM ITENS CARA, COLOCA ALGO AÍ!' });
    }

    for (let i = 0; i < pedido.Itens.length; i++) {
        var item = pedido.Itens[i];
        totalPedido += item.Qtd * buscarPreco(item.CodProduto);
    }

    const baixa = await fetch('http://localhost:3003/baixa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedido.Itens)
    });
    if (!baixa.ok) {
        return res.status(400).json({ message: 'Estoque insuficiente' });
    }

    listaPedidos.push({
        NumPedido: listaPedidos.length + 1,
        NomeCliente: pedido.NomeCliente,
        TotalPedido: totalPedido,
        Itens: pedido.Itens
    });

    console.log(listaPedidos);

    return res.status(201).json({
        message: 'Pedido criado'
    });
});

app.post('/pedidos/:id/fechar', (req, res) => { //CONSERTAR AQUI, NÃO ESTÁ FUNCIONANDO! NAO ESTÁ APAGANDO!
    const pedidoId = req.params.id;
    const indice = listaPedidos.findIndex(
        pedido => pedido.NumPedido === pedidoId
    );

    if (indice !== -1) {
        listaPedidos.delete(indice - 1);
    }

    const pedidoAtualizado = req.body;
    res.json({ message: 'Pedido fechado com sucesso', pedidoId, pedidoAtualizado });
});


console.log("http://localhost:3002");
app.listen(3002);