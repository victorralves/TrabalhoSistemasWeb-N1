//SERVIDOR API DE PEDIDOS

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

listaEstoqueFront = [
    {NomeProduto: "Sanduíche", PrecoProduto: 5},
    {NomeProduto: "Refrigerante", PrecoProduto: 5},
    {NomeProduto: "Pão de Mel", PrecoProduto: 8}
];

app.get('/produtos', async (req, res) => {
    var estoque = await fetch('http://localhost:3003/estoque');
    if(estoque.status === 200){
        produtosServer3 = await estoque.json();
        var produtos = listaEstoqueFront.map((item, posicao) => {
            return {
                CodProduto: produtosServer3[posicao].CodProduto,
                NomeProduto: item.NomeProduto,
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

app.get('/pedidos', (req, res) => {
    res.json({ message: 'Lista de pedidos' });
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