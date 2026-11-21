//SERVIDOR PÁGINAS ESTÁTICAS!!
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

console.log('http://localhost:3001');
app.listen(3001);