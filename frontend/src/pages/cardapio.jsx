import { useState, useEffect } from 'react';
import Produto from '../components/Produto';

function Cardapio() {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        buscarProdutos();
    }, []);

    async function buscarProdutos() {
        try {
            const resposta = await fetch('http://localhost:3002/produtos');
            const dados = await resposta.json();

            setProdutos(dados);
            console.log("Produtos buscados com sucesso:", dados);
        } catch (erro) {
            console.log("Erro ao buscar produtos:", erro);
        }
    }

    return (
        <main>
            <h1>Cardápio</h1>

            {produtos.map((produto) => (
                <Produto
                    key={produto.CodProduto}
                    nome={produto.NomeProduto}
                    preco={produto.Preco}
                    estoque={produto.Quantidade}
                />
            ))}
        </main>
    );
}

export default Cardapio;