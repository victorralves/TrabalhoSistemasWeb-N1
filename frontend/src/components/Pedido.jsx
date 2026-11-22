function Pedido({codigo, nome, quantidade, preco}) {
    return (
        <div>
            <h2>Pedido</h2>
            <p>Código: {codigo}</p>
            <p>Nome do Cliente: {nome}</p>
            <p>Quantidade: {quantidade}</p>
            <p>Preço: {preco}</p>
        </div>
    );
}

export default Pedido;