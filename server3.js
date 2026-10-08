const express = require('express');
const app = express();

app.use(express.json());

const estoque = [
    { CodProduto: 1, Estoque: 10 },
    { CodProduto: 2, Estoque: 15 },
    { CodProduto: 3, Estoque: 20 }
];

app.get('/estoque', (req, res) => {
    res.json(estoque);
});

app.post('/baixa', (req, res) => {

});

app.post('/reposicao', (req, res) => {
    
});

console.log("http://localhost:3002");
app.listen(3002);