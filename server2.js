//SERVIDOR API DE PEDIDOS

const express = require('express');
const app = express();

app.use(express.json());

app.get('/produtos', async (req, res) => {
    var estoque = await fetch('http://localhost:3002/estoque');
    if(estoque.status === 200){
        produtos = await estoque.json();
        res.status(200).json(produtos);
    }
    else{
        res.status(500).json({ message: 'Erro ao obter o estoque' });
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