
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

        const conteudoProduto = 
        `
            <section class="imagem-produtos">
                <img class="imagem-produto" src="${produto.imagem}" alt="Imagem de um ${produto.nome}">
            </section>
            <section class="info-produtos">
                <h3 class="titulo-produto">${produto.nome}</h3>
                <img class="preco-produto" src="../assets/images/preco-produto.png" alt="Imagem do Preço do Produto">
                <div class="descricao-produto">
                    <p>${produto.descricao}</p>
                </div>
                <button class="botao-produto" id="botao-produto" onclick="botaoResgateConfirmado('${produto.id}')" data-id="${produto.id}">Resgatar</button>
            </section>
        `

        containerProdutos.innerHTML = conteudoProduto
    } catch (error) { //Dúvida a ser sanada com Sérgio ou Letícia: enquanto o usuário não tiver feito nenhum resgate, deve ser exibido algum produto, como abaixo, ou vários produtos, um carrossel...
        console.error('Clique em Resgatar e escolha um produto!', error)
        containerProdutos.innerHTML = 
        `
            <section class="imagem-produtos">
                <img class="imagem-produto" src="../assets/images/console-sony-playstation-5.png" alt="Imagem de um Play Station 5">
            </section>
            <section class="info-produtos">
                <h3 class="titulo-produto">Console Sony Play Station 5 SSD 825GB</h3>
                <img class="preco-produto" src="../assets/images/preco-produto.png" alt="Imagem do Preço do Produto">
                <div class="descricao-produto">
                    <p>Desfrute do carregamento do seu PS5, extremamente rápido com o SSD de altíssima velocidade, uma imersão mais profunda com suporte a feedback tátil, gatilhos adaptáveis e áudio 3D, além de uma geração inédita de jogos incríveis para PlayStation. Domine o poder de uma CPU e GPU personalizadas e o SSD com E/S integradas que redefinem as regras do que o console PlayStation pode fazer. Maximize suas sessões de jogo com tempo de carregamento praticamente instantâneo para jogos do PS5 instalados.</p>
                </div>
                <button class="botao-produto">Resgatar</button>
            </section>
        `
    }
}

/*---------------------------------------------------------------------------*/

const carregarDadosProdutos = async () => {
    
    const dadosProdutos = await obterProduto()

    mostrarProdutos(dadosProdutos)
}

carregarDadosProdutos()

/*---------------------------------------------------------------------------*/

const botaoResgateConfirmado = (id) => {
    window.location.href = `resgate.html?id=${id}`;
}