async function buscarProdutos() {
    try {
        const resposta = await fetch('http://localhost:3002/produtos');

        if (!resposta.ok) {
            throw new Error('Erro ao buscar produtos');
        }
        const dados = await resposta.json();
        return dados;
    } catch (erro) {
        console.error(erro);
        alert('Erro ao buscar produtos.');
    }
    
}

export default buscarProdutos;