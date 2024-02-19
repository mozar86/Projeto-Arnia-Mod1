
const obterProdutos = async () => {
    
    const requisicao = await fetch('https://api-projeto-tnxh.onrender.com/produtos/')

    const produtos = await requisicao.json()
    
    console.log(produtos)

    return produtos
}

/*------------------------------------*/

const injetarProduto = (produtos) => {

    const produtoDiv = document.querySelector('.conjunto-cards')

    let conteudoProduto = ''

    produtos.forEach(produto => {
        conteudoProduto = conteudoProduto + 
        `
        <div class="card-produto" data-id="${produto.id}">
            <img class="imagem-produto" src="${produto.imagem}" alt="Imagem de um ${produto.nome}">
            <div class="descricao-produto">
                <h3 class="titulo-produto">${produto.nome}</h3>
            </div>
            <div class="div-botao-card">
                <button class="botao-card" onclick="botaoResgatarHome(${produto.id})" data-id="${produto.id}">Resgatar</button>
            </div>
        </div>
        `
    })
    produtoDiv.innerHTML = conteudoProduto
}

const botaoResgatarHome = (id) => {
    window.location.href = `produtos.html?id=${id}`;
}
/*------------------------------------*/

const carregarProdutos = async () => {
    
    const produtos = await obterProdutos()

    injetarProduto(produtos)
}

carregarProdutos()

/*------------------------------------*/



