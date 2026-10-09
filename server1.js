//SERVIDOR PÁGINAS ESTÁTICAS!!

const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/cardapio', (req, res) => {
    res.sendFile(__dirname + '/public/cardapio.html');
});

app.get('/pedidos', (req, res) => {
    res.sendFile(__dirname + '/public/pedidos.html');
});

console.log("http://localhost:3001");
app.listen(3001);