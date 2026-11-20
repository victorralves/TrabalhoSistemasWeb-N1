function Produto({nome, preco, estoque}) {
    return (
        <div className="produto">
            <h2>{nome}</h2>
            <p>Preço: R$ {preco}</p>
            <p>Estoque disponível: {estoque}</p>
        </div>
    );
}

export default Produto;