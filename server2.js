//SERVIDOR API DE PEDIDOS

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const listaPreco = [
    { PrecoProduto: 5.5 },
    { PrecoProduto: 5 },
    { PrecoProduto: 8 }
];

const listaPedidos = [
    { NumPedido: 1, NomeCliente: "João", TotalPedido: 10, Itens: [{ CodProduto: 1, Qtd: 1 }, { CodProduto: 2, Qtd: 3 }] },
    { NumPedido: 2, NomeCliente: "Maria", TotalPedido: 5, Itens: [{ CodProduto: 2, Qtd: 5 }] }
];

app.get('/produtos', async (req, res) => {
    var estoque = await fetch('http://localhost:3003/estoque');
    if (estoque.status === 200) {
        produtosServer3 = await estoque.json();
        
        var produtos = listaPreco.map((item, posicao) => {
            return {
                CodProduto: produtosServer3[posicao].CodProduto,
                NomeProduto: produtosServer3[posicao].NomeProduto,
                PrecoProduto: item.PrecoProduto,
                Estoque: produtosServer3[posicao].Estoque
            };
        })
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
        var listaPedidosAtualizada = listaPedidos.map((pedido, posicao) => {
            return {
                NumPedido: pedido.NumPedido,
                NomeCliente: pedido.NomeCliente,
                TotalPedido: pedido.TotalPedido,
                CodProduto: produtosServer3[posicao].CodProduto,
                NomeProduto: produtosServer3[posicao].NomeProduto,
                PrecoProduto: listaPreco[posicao].PrecoProduto,
            };
        });
        res.status(200).json(listaPedidosAtualizada);
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
        if (item.CodProduto == null) {
            return res.status(400).json({ message: 'Codigo do produto nao informado' });
        }
        if (Number.isNaN(item.Qtd) || item.Qtd <= 0 || item.Qtd > consultaEstoque[i].Estoque) {
            return res.status(400).json({ message: 'Qtd invalida' });
        }
    }
    for (let i = 0; i < pedido.Itens.length; i++) {
        const produtoEncontrado = consultaEstoque.find(produto => produto.CodProduto === pedido.Itens[i].CodProduto);
        if (!produtoEncontrado) {
            return res.status(400).json({ message: 'Produto nao encontrado' });
        }
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

    for (let i = 0; i < pedido.Itens.length; i++) {
        const item = pedido.Itens[i];

        const produtoEncontrado = consultaEstoque.find(
            produto => produto.CodProduto === Number(item.CodProduto)
        );

        const posicao = consultaEstoque.findIndex(
            produto => produto.CodProduto === Number(item.CodProduto)
        );

        const precoProduto = listaPreco[posicao].PrecoProduto;

        totalPedido += Number(item.Qtd) * precoProduto;
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

app.post('/pedidos/:id/fechar', (req, res) => {
    const pedidoId = req.params.id;
    const pedidoAtualizado = req.body;
    res.json({ message: 'Pedido fechado com sucesso', pedidoId, pedidoAtualizado });
});


console.log("http://localhost:3002");
app.listen(3002);