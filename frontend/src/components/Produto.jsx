function Produto({ codigo, nome, preco, estoque, quantidade, atualizarQuantidade }) {
    return (
        <div className="produto">
            <h2>{nome}</h2>
            <p>Preço: R$ {preco}</p>
            <p>Estoque disponível: {estoque}</p>
            <label>Quantidade desejada:</label>
            <br />
            <input type="number"min="0" max={estoque} value={quantidade}
                onChange={(e) => atualizarQuantidade(codigo, e.target.value)}
            />
        </div>
    );
}

export default Produto;