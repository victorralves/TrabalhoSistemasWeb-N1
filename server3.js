const express = require('express');
const app = express();

app.use(express.json());

const estoque = [
    { CodProduto: 1, Estoque: 10 },
    { CodProduto: 2, Estoque: 15 },
    { CodProduto: 3, Estoque: 20 }
];

console.log("http://localhost:3002");
app.listen(3002);