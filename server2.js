//SERVIDOR API DE PEDIDOS

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

listaPreco = [
    {PrecoProduto: 5.5},
    {PrecoProduto: 5},
    {PrecoProduto: 8}
];

listaPedidos = [
    {NumPedido: 1, NomeCliente: "João", TotalPedido: 10, Itens: [{CodProduto: 1, Qtd: 1}, {CodProduto: 2, Qtd: 3}]},
    {NumPedido: 2, NomeCliente: "Maria", TotalPedido: 5, Itens: [{CodProduto: 2, Qtd: 5}]}
];

app.get('/produtos', async (req, res) => {
    var estoque = await fetch('http://localhost:3003/estoque');
    if(estoque.status === 200){
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
    else{
        let statusCode = estoque.status;
        console.error(`Erro ao obter o estoque. Status code: ${statusCode}`);
    }
});

app.get('/pedidos', async (req, res) => {
    var estoque = await fetch('http://localhost:3003/estoque');
    if(estoque.status === 200){
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
    else{
        let statusCode = estoque.status;
        console.error(`Erro ao obter o estoque. Status code: ${statusCode}`);
    }
});

app.post('/pedidos', async (req, res) => {
    var resposta = await fetch('http://localhost:3003/estoque');
    consultaEstoque = resposta.json();
    const pedido = req.body;
    TotalPedido = 0;
    if(pedido.NomeCliente == null || pedido.NomeCliente === ''){
        return res.status(400).json({ message: 'Nome invalido' });
    }
    if(pedido.Itens === null){
        return res.status(400).json({ message: 'Itens invalidos' });
    }
    for (let i = 0; i < pedido.Itens.length; i++) {
        const item = pedido.Itens[i];
        if (item.CodProduto == null) {
            return res.status(400).json({message: 'Codigo do produto nao informado'});
        }
        if (Number.isNaN(item.Qtd) || item.Qtd <= 0 || item.Qtd > consultaEstoque[i].Estoque) {
            return res.status(400).json({message: 'Qtd invalida'});
        }
    }
    for (let i = 0; i < estoque.Itens.length; i++) {
        if(consultaEstoque[i].CodProduto === Itens[i].CodProduto){
            res.status(200).json(consultaEstoque);
        }
        else{
            return res.status(400).json({message: 'Produto nao encontrado'});
        }
    }

    for (let i = 0; i < pedido.Itens.length; i++){
        listaPedidos[i].quantidade = Number(document.getElementById("quantideProduto").value)
        if(consultaEstoque[i].CodProduto === Itens[i].CodProduto){
            TotalPedido += PrecoProduto * listaPedidos[i].quantidade;
        }
    }

    return res.status(201).json('Pedido criado')
});

app.post('/pedidos/:id/fechar', (req, res) => {
    const pedidoId = req.params.id;
    const pedidoAtualizado = req.body;
    res.json({ message: 'Pedido fechado com sucesso', pedidoId, pedidoAtualizado });
});


console.log("http://localhost:3002");
app.listen(3002);