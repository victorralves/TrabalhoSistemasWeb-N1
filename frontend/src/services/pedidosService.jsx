async function buscarPedidos() {
    try {
        const resposta = await fetch('http://localhost:3002/pedidos');
        const dados = await resposta.json();
        return dados;
    } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        throw error;
    }
}

export default buscarPedidos;