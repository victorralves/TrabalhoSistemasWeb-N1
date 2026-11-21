import { useState, useEffect } from 'react';
import Produto from '../components/Produto';

function Cardapio() {
    const [produtos, setProdutos] = useState([]);
    const [quantidades, setQuantidades] = useState({});
    const [nomeCliente, setNomeCliente] = useState('');

    useEffect(() => {
        buscarProdutos();
    }, []);

    async function buscarProdutos() {
        try {
            const resposta = await fetch('http://localhost:3002/produtos');

            if (!resposta.ok) {
                throw new Error('Erro ao buscar produtos');
            }

            const dados = await resposta.json();
            setProdutos(dados);
        } catch (erro) {
            console.error(erro);
        }
    }

    function atualizarQuantidade(codigo, quantidade) {
        setQuantidades({
            ...quantidades,
            [codigo]: Number(quantidade)
        });
    }

    async function finalizarPedido() {
        const itens = [];

        for (let i = 0; i < produtos.length; i++) {
            const produto = produtos[i];
            const quantidade = quantidades[produto.CodProduto] || 0;

            if (quantidade > 0) {
                itens.push({
                    CodProduto: produto.CodProduto, Qtd: quantidade
                });
            }
        }

        if (itens.length === 0) {
            alert('Selecione pelo menos um produto!');
            return;
        }

        const pedido = {
            NomeCliente: nomeCliente,
            Itens: itens
        };

        try {
            const resposta = await fetch('http://localhost:3002/pedidos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pedido)
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(dados.message);
                return;
            }

            alert('Pedido realizado com sucesso!');
            setQuantidades({});
            setNomeCliente('');
        } catch (erro) {
            console.error(erro);
            alert('Erro ao realizar pedido.');
        }
    }

    return (
        <div>
            <h1>Cardápio</h1>

            <label>Nome do cliente:</label>
            <br />
            <input type="text" value={nomeCliente} onChange={(e) => setNomeCliente(e.target.value)} />
            {produtos.map((produto) => (
                <Produto
                    key={produto.CodProduto}
                    codigo={produto.CodProduto}
                    nome={produto.NomeProduto}
                    preco={produto.PrecoProduto}
                    estoque={produto.Estoque}
                    quantidade={quantidades[produto.CodProduto] || 0}
                    atualizarQuantidade={atualizarQuantidade}
                />
            ))}
            <br />
            <br />
            <button onClick={finalizarPedido}>
                Finalizar pedido
            </button>
        </div>
    );
}

export default Cardapio;