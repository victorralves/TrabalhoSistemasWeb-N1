const express = require('express');
const app = express();

app.use(express.json());

const estoque = [
    { CodProduto: 1, NomeProduto: "Sanduíche", Estoque: 10 },
    { CodProduto: 2, NomeProduto: "Refrigerante", Estoque: 15 },
    { CodProduto: 3, NomeProduto: "Pão de Mel", Estoque: 20 },
    { CodProduto: 4, NomeProduto: "Goiabada", Estoque: 17 }
];

app.get('/estoque', (req, res) => {
    res.json(estoque);
});

app.post('/baixa', 
    
    (body('Itens').isArray({ min: 1 }).withMessage('O pedido deve conter pelo menos um item'),
    body('Itens.*.CodProduto').isInt({ gt: 0 }).withMessage('Código do produto inválido'),
    body('Itens.*.Qtd').isInt({ gt: 0 }).withMessage('Quantidade inválida')),
    
    (req, res) => {
    const itens = req.body;
    let temEstoque = true;

    for (let i = 0; i < itens.length; i++) {
        let encontrado = false;

        for (let j = 0; j < estoque.length; j++) {
            if (itens[i].CodProduto == estoque[j].CodProduto) {
                encontrado = true;
                if (itens[i].Qtd > estoque[j].Estoque) {
                    temEstoque = false;
                }
            }
        }

        if (encontrado == false) {
            temEstoque = false;
        }
    }

    if (temEstoque == false) {
        return res.status(400).send('erro');
    }

    for (let i = 0; i < itens.length; i++) {
        for (let j = 0; j < estoque.length; j++) {
            if (itens[i].CodProduto == estoque[j].CodProduto) {
                estoque[j].Estoque -= itens[i].Qtd;
            }
        }
    }
    res.status(201).send('Baixa realizada com sucesso em!');
});

app.post('/reposicao', 
    
    (body('Itens').isArray({ min: 1 }).withMessage('O pedido deve conter pelo menos um item'),
    body('Itens.*.CodProduto').isInt({ gt: 0 }).withMessage('Código do produto inválido'),
    body('Itens.*.Qtd').isInt({ gt: 0 }).withMessage('Quantidade inválida')),

    (req, res) => {
    const itens = req.body;
    console.log(itens);
    for (let i = 0; i < itens.length; i++) {
        for (let j = 0; j < estoque.length; j++) {
            if (itens[i].CodProduto == estoque[j].CodProduto) {
                estoque[j].Estoque += itens[i].Estoque;
            }
        }
    }
    res.status(201).send('Reposição realizada com sucesso em!');
});

console.log("http://localhost:3003");
app.listen(3003);