const obterMeusResgates = async () =>{
    const request = await fetch('https://projeto-final-cuture-code-db.onrender.com/resgates')
    return await request.json()
}

const mostrarHistoricoResgates = async (cards) =>{
    const card = document.getElementById('container-produto')    
    const options = {
        month: 'long', 
        day: 'numeric' 
      };
   cards.forEach(elemento => {
    let data = new Date(elemento.data)
        card.innerHTML +=`
            <div class="data"> <span>${data.toLocaleDateString('pt-BR', options)}</span></div>
            <div class="container-resgates">
                <div class="img-resgate">
                <img src="${elemento.imagem}" alt="">
            </div>
            <div class="texto-resgate">
                <span class="descricao-produto">${elemento.nome}</span>
                <p class="valor-joias">${elemento.valor}jóias</p>
            </div>
            </div>`
   });
}
  

const carregarDadosPerfil = async () =>{
    const produtos = await obterMeusResgates()
    mostrarHistoricoResgates(produtos)

}
carregarDadosPerfil()