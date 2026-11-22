import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    function irParaPedidos() {
        navigate('/pedidos');
    }

    function irParaCardapio() {
        navigate('/cardapio');
    }

    return (
        <main>
            <h1 style={{ textAlign: 'center' }}>Bem-vindo a Lanchonete do Negueba</h1>
            <p style={{ textAlign: 'center' }}>Aqui você pode gerenciar seus pedidos de forma eficiente.</p>
            <p style={{ textAlign: 'center', marginTop: '10px' }}>O que você deseja fazer hoje?</p>

            <div style={{ textAlign: 'center' }}>
                <button style={{ textAllign: 'center' }} onClick={irParaPedidos}>
                    Ir para Pedidos
                </button>
            </div>

            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <button style={{ textAllign: 'center' }} onClick={irParaCardapio}>
                    Ir para Cardápio
                </button>
            </div>
        </main>
    );
}

export default Home;
