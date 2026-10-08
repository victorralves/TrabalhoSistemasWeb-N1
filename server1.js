//SERVIDOR PÁGINAS ESTÁTICAS!!

const express = require('express');
const app = express();

app.use(express.json());

app.get('/public', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/public/cardapio.html', (req, res) => {
    res.sendFile(__dirname + '/cardapio.html');
});

app.get('/public/pedidos.html', (req, res) => {
    res.sendFile(__dirname + '/pedidos.html');
});

app.listen(3000);