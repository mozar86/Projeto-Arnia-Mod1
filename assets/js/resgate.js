const obterProdutoResgatado = async (id) =>{
    console.log(id)
    const requisicao = await fetch(`https://api-projeto-tnxh.onrender.com/resgates/${id}`)
    let produto = await requisicao.json()
    console.log(produto)
    return produto
}


const mostrarProdutoResgatado = async (produtoResgatado) =>{
    console.log(produtoResgatado)
    let produtoResgatadoSelecionado = document.getElementById('produto-resgate')   
    produtoResgatadoSelecionado.innerHTML +=
    `
        <div><img class="img-produto-resgate" src="${produtoResgatado.imagem}"></div>
        <div class="explicacao-resgate">
            <h3>${produtoResgatado.nome}</h3>
            <p>Por: <span class="preco">${produtoResgatado.valor} <img class"imagem-preco" src="../Imagens/diamond.png"> </span></p>
        </div>
    `
}



const carregarProdutoResgatado = async () =>{
    const parametros = new URLSearchParams(window.location.search);
    const id = parametros.get('id');
    const produto = await obterProdutoResgatado(id)
    console.log(produto)
    mostrarProdutoResgatado(produto)
}

carregarProdutoResgatado()