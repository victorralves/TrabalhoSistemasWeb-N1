import {useState, useEffect} from 'react';
import Pedido from '../components/Pedido';
import buscarPedidos from '../services/pedidosService';

function Pedidos() {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        carregarPedidos();
    }, []);

    async function carregarPedidos() {
        try{
            const dados = await buscarPedidos();
            setPedidos(dados);
        } catch (error) {
            console.error('Erro ao carregar pedidos:', error);
        }
    }

    async function AtualizarPedidos() {
        carregarPedidos();
    }

    function mostrarPedidos(){
        return (
            <main>
                <h1 style={{ textAlign: 'center' }}>Pedidos</h1>

                <button onClick={AtualizarPedidos}>
                    Atualizar Pedidos
                </button>
                
                {pedidos.map((pedido) => (  
                    <Pedido
                        key={pedido.CodPedido}
                        nome={pedido.NomeCliente}
                        quantidade={pedido.Quantidade}
                        preco={pedido.PrecoTotal}
                    />
                ))}
            </main>
        );
    }

    mostrarPedidos();
}

export default Pedidos;