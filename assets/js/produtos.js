const obterProdutos = async (id) =>{
    const requisicao = await fetch(`https://projeto-final-cuture-code-db.onrender.com/produtos/${id}`)
    let produto = await requisicao.json()
    return produto
}


const exibirProduto = async (produto) =>{
    let produtoResgatado = document.getElementById('container-produto')   
    produtoResgatado.innerHTML +=`
    <div class="imagem-produto">
    <img src="${produto.imagem}"/>
</div>
<div class="descricao-produto">
    <h1 "class="titulo"><span id='nome'>${produto.nome}<span></h1>
    <span class="valor">Por ${produto.valor} <img class"imagem-preco" src="../Imagens/diamond.png"></span>
    <p class="texto">${produto.descricao}</p>
    <button onclick="resgatar(${produto.id})">Resgatar</button>
</div>`;
}
const salvarResgate = async (id) =>{
    const produto =  await obterProdutos(id) 
    console.log(produto)
     const produtoSelecionado = {
         imagem: produto.imagem,
         nome: produto.nome,
         id: produto.id,
         valor: produto.valor,
         data: new Date()

     }
    console.log(produtoSelecionado)     
     await fetch(`https://projeto-final-cuture-code-db.onrender.com/resgates`, {
         method: 'POST',
         headers: {
             'Accept': 'application/json, text/plain, */*',
             'Content-Type': 'application/json'
         },
         body: JSON.stringify(produtoResgatado)
     })
} 
    
   

const resgatar = async (id) =>{
    await salvarResgate(id)
    window.location = `../pages/paginaResgate.html?id=${id}`
}

const carregarDadosProduto = async () =>{
    const parametros = new URLSearchParams(window.location.search);
    const id = parametros.get('id');
    const produtos = await getProdutoResgatado(id)
    mostrarProduto(produtos)
}

carregarDadosProduto()