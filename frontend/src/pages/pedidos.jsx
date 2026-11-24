
import { useState, useEffect } from 'react';
import Pedido from '../components/Pedido';
import buscarPedidos from '../services/pedidosService';

function Pedidos() {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        carregarPedidos();
    }, []);

    async function carregarPedidos() {
        try {
            const dados = await buscarPedidos();
            setPedidos(dados);
        } catch (error) {
            alert('Erro ao carregar pedidos');
        }
    }

    return (
        <main>
            <h1 style={{ textAlign: 'center' }}>Pedidos</h1>

            <button onClick={carregarPedidos}>
                Atualizar Pedidos
            </button>

            {pedidos.map((pedido, index) => (
                <Pedido
                    key={`${pedido.NumPedido}-${pedido.CodProduto}-${index}`}
                    nomeCliente={pedido.NomeCliente}
                    quantidade={pedido.QuantidadePedida}
                    total={pedido.TotalPedido}
                    nomeProduto={pedido.NomeProduto}
                    codigo={pedido.NumPedido}
                />
            ))}
        </main>
    );
}

export default Pedidos;