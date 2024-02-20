const obterProdutos = async (id) =>{
   
    const requisicao = await fetch(`http://localhost:3000/produtosResgatar/${id}`)
    let produto = await requisicao.json()
   
    return produto
}


const exibirProduto = async (produto) =>{
    let produtoResgatado = document.getElementById('container-produtos')

    produtoResgatado.innerHTML +=
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
            <button class="botao-produto" onclick="resgatar(${produto.id})">Resgatar</button>
        </section>
    `
}

const envioResgate = async (id) =>{
    const produto =  await obterProdutos(id) 

     const produtoSelecionado = {
         imagem: produto.imagem,
         nome: produto.nome,
         id: produto.id,
         valor: produto.valor,
         data: new Date()

     }
    console.log(produtoSelecionado)     
     await fetch(`http://localhost:3000/meusResgates`, {
         method: 'POST',
         headers: {
             'Accept': 'application/json, text/plain, */*',
             'Content-Type': 'application/json'
         },
         body: JSON.stringify(produtoSelecionado)
     })
} 
    
   

const resgatar = async (id) =>{
    await envioResgate(id)
    window.location = `../html/resgate.html?id=${id}`
}

const carregarDados = async () =>{

    const parametros = new URLSearchParams(window.location.search)
    const id = parametros.get('id')

    const produtos = await obterProdutos(id)
    
    exibirProduto(produtos)

}

carregarDados()