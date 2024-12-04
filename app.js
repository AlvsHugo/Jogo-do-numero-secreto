let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número de 1 a 10');
}

exibirMensagemInicial();

function verificarChute(){ //habilita o botão chute
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você acertou o número secreto em ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); //habilita o botão novo jogo
    }   else {
            if (chute > numeroSecreto) {
                exibirTextoNaTela('p', 'O número secreto é menor');
            }   else {
                exibirTextoNaTela('p', 'O número secreto é maior');
            }
            tentativas++ // soma as tentativas
            limparCampo();
        }
}

function gerarNumeroAleatorio() {
   let numeroEscolhido =  parseInt(Math.random() * numeroLimite + 1); //gera um número aleatorio
   let quantidadeDeNumerosNaLista = listaDeNumerosSorteados.length; //n sorteados = qunatidade n da lista

   if (quantidadeDeNumerosNaLista == numeroLimite ) {
    listaDeNumerosSorteados = []; // zera contagem da lista
   }

   if(listaDeNumerosSorteados.includes(numeroEscolhido)) { // verifica se já está na lista 
    return gerarNumeroAleatorio(); // se sim, repete a função
   } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log (listaDeNumerosSorteados);
    return numeroEscolhido; 
   }
}

function limparCampo() { // ao apertar chute deixa o input em branco
    chute = document.querySelector('input'); 
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true); // desabilita o botão novo jogo
}

