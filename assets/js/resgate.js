// resgate.js

const obterProdutoPorId = async (id) => {
    try {
        const requisicao = await fetch(`http://localhost:3000/produtosResgatar/${id}`);
        const produto = await requisicao.json();
        return produto;
    } catch (error) {
        console.error('Erro ao obter produto:', error);
        throw new Error('Erro ao obter produto');
    }
}

const salvarOperacaoResgate = async (produto) => {
    try {
        const resposta = await fetch('http://localhost:3000/meusResgates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                produto: {
                    nome: produto.nome,
                    imagem: produto.imagem,
                    joias: produto.joias,
                    horario: new Date().toISOString()
                }
            })
        });

        if (!resposta.ok) {
            throw new Error(`Erro ao salvar operação de resgate: ${resposta.status}`);
        }

        console.log('Operação de resgate salva com sucesso.');
        // Redirecionar para a tela de Produto resgatado
        window.location.href = 'produto_resgatado.html';
    } catch (error) {
        console.error('Erro ao salvar operação de resgate:', error);
        // Aqui você pode adicionar qualquer tratamento de erro adicional, se necessário
        throw new Error('Erro ao salvar operação de resgate');
    }
}



    const botaoProduto = document.getElementById('#botao-produto');
    //IMPORTANTE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //Tentar obter id de algo fora do innerHTML onde foi incluído o botao-produto

    botaoProduto.addEventListener('DOMContentLoaded','submit', async () => {
        const parametros = new URLSearchParams(window.location.search);
        const idProduto = parametros.get('id');        
        console.log(idProduto)
        try {
            const produto = await obterProdutoPorId(idProduto);
            await salvarOperacaoResgate(produto);
        } catch (error) {
            console.error('Erro ao resgatar produto:', error);
            // Aqui você pode adicionar qualquer tratamento de erro adicional, se necessário
        }
    });
    
    carregarDadosProdutos();

