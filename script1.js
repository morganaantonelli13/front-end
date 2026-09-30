// ========================================
// PROJETO 1 — SAUDAÇÃO PERSONALIZADA
// ========================================

// Passo 1: Selecionar os elementos da página pelo ID
let campoNome     = document.getElementById("campo-nome");
let seletorIdioma = document.getElementById("seletor-idioma");
let botao         = document.getElementById("btn-saudar");
let resultado     = document.getElementById("resultado");

// ----------------------------------------
// FUNÇÃO: retorna os textos do idioma escolhido
// Usa switch/case para tratar cada idioma, como pedido.
// ----------------------------------------
function obterTextos(idioma) {
    let textos;

    switch (idioma) {
        case "en":
            textos = {
                manha: "Good morning",
                tarde: "Good afternoon",
                noite: "Good evening",
                boasVindas: "Welcome to the JavaScript class!",
                erro: "Please enter your name!"
            };
            break;

        case "es":
            textos = {
                manha: "Buenos días",
                tarde: "Buenas tardes",
                noite: "Buenas noches",
                boasVindas: "¡Bienvenido(a) a la clase de JavaScript!",
                erro: "¡Por favor, escribe tu nombre!"
            };
            break;

        case "zh":
            textos = {
                manha: "早上好",
                tarde: "下午好",
                noite: "晚上好",
                boasVindas: "欢迎来到JavaScript课!",
                erro: "请输入你的名字!"
            };
            break;

        case "pt":
        default:
            textos = {
                manha: "Bom dia",
                tarde: "Boa tarde",
                noite: "Boa noite",
                boasVindas: "Bem-vindo(a) à aula de JavaScript!",
                erro: "Por favor, digite seu nome!"
            };
            break;
    }

    return textos;
}

// ----------------------------------------
// FUNÇÃO: escolhe "manha", "tarde" ou "noite"
// de acordo com a hora atual do computador
// ----------------------------------------
function obterPeriodoDoDia() {
    let hora = new Date().getHours();

    if (hora >= 5 && hora <= 11) {
        return "manha";
    } else if (hora >= 12 && hora <= 17) {
        return "tarde";
    } else {
        return "noite";
    }
}

// ----------------------------------------
// FUNÇÃO PRINCIPAL: monta a saudação e mostra na tela
// ----------------------------------------
function saudar() {
    // Passo 1: Pegar o idioma escolhido e o nome digitado
    let idioma = seletorIdioma.value;
    let nome   = campoNome.value.trim();
    let textos = obterTextos(idioma);

    // Passo 2: Validação — campo vazio vira erro
    if (nome === "") {
        resultado.textContent = textos.erro;

        // Troca as classes visuais: tira "sucesso", coloca "erro"
        resultado.classList.remove("sucesso");
        resultado.classList.add("erro");
        campoNome.classList.remove("sucesso");
        campoNome.classList.add("erro");

    } else {
        // Passo 3: Descobre se é manhã, tarde ou noite
        let periodo   = obterPeriodoDoDia();
        let saudacao  = textos[periodo];

        // Passo 4: Exibe a saudação completa
        resultado.textContent = `${saudacao}, ${nome}! ${textos.boasVindas}`;

        // Troca as classes visuais: tira "erro", coloca "sucesso"
        resultado.classList.remove("erro");
        resultado.classList.add("sucesso");
        campoNome.classList.remove("erro");
        campoNome.classList.add("sucesso");
    }
}

// Passo 5: Clique no botão aciona a função saudar()
botao.addEventListener("click", saudar);

// Passo 6: Atalho de teclado — pressionar Enter no campo
//          de nome também aciona a função saudar()
campoNome.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        saudar();
    }
});