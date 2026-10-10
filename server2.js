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
    {NumPedido: 1, NomeCliente: "João", TotalPedido: 10, Itens: [{CodProduto: 1, Qtd: 2}, {CodProduto: 2, Qtd: 1}]},
    {NumPedido: 2, NomeCliente: "Maria", TotalPedido: 5, Itens: [{CodProduto: 2, Qtd: 1}]}
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

app.post('/pedidos', (req, res) => {
    const pedido = req.body;
    if ( pedido (not) in estoque || pedido.estoque.length === 0) {
        return res.status(400).json({ message: 'Pedido inválido' });
    }
    else{

        res.status(201).json({ message: 'Pedido criado com sucesso', pedido });
    }
});

app.post('/pedidos/:id/fechar', (req, res) => {
    const pedidoId = req.params.id;
    const pedidoAtualizado = req.body;
    res.json({ message: 'Pedido fechado com sucesso', pedidoId, pedidoAtualizado });
});


console.log("http://localhost:3002");
app.listen(3002);