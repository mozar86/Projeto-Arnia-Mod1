
const obterProduto = async () => {
    const requisicao = await fetch('http://localhost:3000/produtosResgatar')

    const produtos = await requisicao.json()

    return produtos
}

/*---------------------------------------------------------------------------*/

const mostrarProdutos = async (produtos) => {
    const containerProdutos = document.getElementById('container-produtos')

    try {
        const parametros = new URLSearchParams(window.location.search)
        const id = parametros.get('id')


        const produto = produtos.find(produto => produto.id === id)

        const conteudoProduto = `
            <section class="imagem-produtos">
                <img class="imagem-produto" src="${produto.imagem}" alt="Imagem de um ${produto.nome}">
            </section>
            <section class="info-produtos">
                <h3 class="titulo-produto">${produto.nome}</h3>
                <img class="preco-produto" src="../assets/images/preco-produto.png" alt="Imagem do Preço do Produto">
                <div class="descricao-produto">
                    <p>${produto.descricao}</p>
                </div>
                <button class="botao-produto" onclick="botaoResgateConfirmado('${produto.id}')" data-id="${produto.id}">Resgatar</button>
            </section>
        `

        containerProdutos.innerHTML = conteudoProduto
    } catch (error) {
        console.error('Erro ao exibir produtos:', error)
        containerProdutos.innerHTML = 'Erro ao carregar produtos.'
    }
}

/*---------------------------------------------------------------------------*/

const carregarDadosProdutos = async () => {
    
    const dadosProdutos = await obterProduto()

    mostrarProdutos(dadosProdutos)
}

carregarDadosProdutos()


