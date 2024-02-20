const obterResgate = async (id) =>{
    
    const requisicao = await fetch(`http://localhost:3000/meusResgates/${id}`)
    let produto = await requisicao.json()
    
    return produto
}


const exibirResgate = async (produto) =>{
    let produtoResgatadoSelecionado = document.getElementById('produto-resgate')   
    
    produtoResgatadoSelecionado.innerHTML +=
    `
        <img class="img-produto-resgate" src="${produto.imagem}"  alt="Imagem de ${produto.nome}"> 
        <h5 class="nome-produto-resgate">${produto.nome}</h5>
        <img class="preco-produto" src="../assets/images/preco-produto.png" alt="Imagem do Preço do Produto">
    `
}



const carregarResgate = async () =>{
    
    const parametros = new URLSearchParams(window.location.search);
    const id = parametros.get('id');
    
    const produto = await obterResgate(id)
    
    exibirResgate(produto)
}

carregarResgate()