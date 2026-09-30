// ========================================
// PROJETO 3 — CONTADOR INTERATIVO
// ========================================

// Variável GLOBAL: acessível por todas as funções
let contador = 0;

// Limites do contador — não podem ser ultrapassados
const MIN = -50;
const MAX = 50;

// Selecionar elementos
let display      = document.getElementById("numero");
let barraInterna = document.getElementById("barra-interna");
let campoPasso   = document.getElementById("campo-passo");
let logDiv       = document.getElementById("log");
let btnMenos     = document.getElementById("btn-menos");
let btnReset     = document.getElementById("btn-reset");
let btnMais      = document.getElementById("btn-mais");

// FUNÇÃO auxiliar: atualiza o número exibido e a cor
function atualizarDisplay() {
    display.textContent = contador;

    // Muda a cor baseado no valor
    if (contador > 0) {
        display.style.color = "#27ae60";   // Verde para positivo
    } else if (contador < 0) {
        display.style.color = "#e74c3c";   // Vermelho para negativo
    } else {
        display.style.color = "#2c3e50";   // Cinza para zero
    }
}

// FUNÇÃO auxiliar: recalcula a barra de progresso
function atualizarBarra() {
    // Converte o intervalo [MIN, MAX] para uma porcentagem de 0 a 100
    let porcentagem = ((contador - MIN) / (MAX - MIN)) * 100;
    barraInterna.style.width = `${porcentagem}%`;

    // Cor da barra: verde para positivo, vermelha para negativo
    if (contador == 0) {
        barraInterna.style.backgroundColor = "#2c3e50";
    } else if (contador > 0) {
         barraInterna.style.backgroundColor = "#27ae60";
    } else {
        barraInterna.style.backgroundColor = "#e74c3c";
    }
}

// FUNÇÃO auxiliar: pulso — cresce e volta ao normal
function animarPulso() {
    display.classList.add("pulso");

    // Remove a classe depois de 150ms, voltando o número ao tamanho normal
    setTimeout(function() {
        display.classList.remove("pulso");
    }, 150);
}

// FUNÇÃO auxiliar: adiciona uma linha no log com horário
function registrarLog(acao) {
    let horario = new Date().toLocaleTimeString("pt-BR");
    let linha = document.createElement("div");
    linha.textContent = `[${horario}] ${acao} → ${contador}`;

    // prepend() insere no topo (mais recente primeiro)
    logDiv.prepend(linha);

    // Limita a 20 registros: remove o último filho quando passar disso
    if (logDiv.children.length > 20) {
        logDiv.removeChild(logDiv.lastChild);
    }
}

// FUNÇÃO auxiliar: lê o campo de passo e converte para número
function obterPasso() {
    let passo = parseInt(campoPasso.value);

    // Se o campo estiver vazio ou inválido, usa 1 como padrão
    if (isNaN(passo) || passo < 1) {
        passo = 1;
    }
    return passo;
}

// EVENTO: Botão +
btnMais.addEventListener("click", function() {
    let passo = obterPasso();
    let novoValor = contador + passo;

    // Só aplica se não ultrapassar o máximo
    if (novoValor <= MAX) {
        contador = novoValor;
        atualizarDisplay();
        atualizarBarra();
        animarPulso();
        registrarLog(`+${passo}`);
    }
});

// EVENTO: Botão −
btnMenos.addEventListener("click", function() {
    let passo = obterPasso();
    let novoValor = contador - passo;

    // Só aplica se não ultrapassar o mínimo
    if (novoValor >= MIN) {
        contador = novoValor;
        atualizarDisplay();
        atualizarBarra();
        animarPulso();
        registrarLog(`-${passo}`);
    }
});

// EVENTO: Botão Reset
btnReset.addEventListener("click", function() {
    contador = 0;         // Volta para zero
    atualizarDisplay();
    atualizarBarra();
    animarPulso();
    registrarLog("Reset");
});

// Inicializa a barra na posição correta assim que a página carrega
atualizarBarra();