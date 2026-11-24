function Pedido({codigo, nomeCliente, quantidade, total, nomeProduto}) {
    return (
        <div>
            <h2>Pedido</h2>
            <p>Código: {codigo}</p>
            <p>Nome do Cliente: {nomeCliente}</p>
            <p>Produto: {nomeProduto}</p>
            <p>Quantidade: {quantidade}</p>
            <p>Total: {total}</p>
        </div>
    );
}

export default Pedido;