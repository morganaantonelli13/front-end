// ========================================
// PROJETO 2 — CALCULADORA SIMPLES
// ========================================

// Selecionar todos os elementos
let num1Input   = document.getElementById("num1");
let num2Input   = document.getElementById("num2");
let operacao    = document.getElementById("operacao");
let btnCalc     = document.getElementById("btn-calcular");
let btnLimpar   = document.getElementById("btn-limpar");
let resultado   = document.getElementById("resultado");
let listaHTML   = document.getElementById("historico");

// Array que guarda o histórico de cálculos.
// Cada item é um objeto: { operacao: "5 + 3", resultado: 8 }
let listaHistorico = [];

// ----------------------------------------
// FUNÇÃO: percorre o listaHistorico e recria
// os elementos <li> dentro do <ul id="historico">
// ----------------------------------------
function exibirHistorico() {
    // Limpa a lista antes de recriá-la
    listaHTML.innerHTML = "";

    // for...of percorre cada item do array
    for (let item of listaHistorico) {
        let li = document.createElement("li");
        li.textContent = `${item.operacao} = ${item.resultado}`;
        listaHTML.appendChild(li);
    }
}

// ----------------------------------------
// FUNÇÃO: adiciona um novo cálculo ao histórico
// ----------------------------------------
function adicionarAoHistorico(textoOperacao, valorResultado) {
    // unshift() insere no início do array (mais recente primeiro)
    listaHistorico.unshift({ operacao: textoOperacao, resultado: valorResultado });

    // Se passar de 10 itens, remove o último (o mais antigo) com pop()
    if (listaHistorico.length > 10) {
        listaHistorico.pop();
    }

    exibirHistorico();
}

btnCalc.addEventListener("click", function() {

    // parseFloat converte o texto do input em número decimal.
    // Sem parseFloat, "5" + "3" = "53" (concatenação de texto!)
    let n1 = parseFloat(num1Input.value);
    let n2 = parseFloat(num2Input.value);

    // isNaN = "is Not a Number" — verifica se o valor é inválido
    if (isNaN(n1) || isNaN(n2)) {
        resultado.textContent = "Por favor, digite números válidos!";
        resultado.classList.remove("sucesso");
        resultado.classList.add("erro");
        return;  // Interrompe a função aqui
    }

    let res;  // Variável que guardará o resultado

    // switch verifica qual operação foi selecionada
    switch (operacao.value) {
        case "+":
            res = n1 + n2;
            break;
        case "-":
            res = n1 - n2;
            break;
        case "*":
            res = n1 * n2;
            break;
        case "/":
            // Validação extra: não pode dividir por zero!
            if (n2 === 0) {
                resultado.textContent = "Erro: divisão por zero!";
                resultado.classList.remove("sucesso");
                resultado.classList.add("erro");
                return;
            }
            res = n1 / n2;
            break;
        case "%":
            // % é o operador de resto da divisão (módulo)
            if (n2 === 0) {
                resultado.textContent = "Erro: divisão por zero!";
                resultado.classList.remove("sucesso");
                resultado.classList.add("erro");
                return;
            }
            res = n1 % n2;
            break;
        case "**":
            // ** é o operador de potência (n1 elevado a n2)
            res = n1 ** n2;
            break;
    }

    // Monta o texto da operação, ex: "5 + 3"
    let textoOperacao = `${n1} ${operacao.value} ${n2}`;

    // Exibe o resultado formatado
    resultado.textContent = `${textoOperacao} = ${res}`;
    resultado.classList.remove("erro");
    resultado.classList.add("sucesso");

    // Guarda esse cálculo no histórico
    adicionarAoHistorico(textoOperacao, res);
});

// ----------------------------------------
// BOTÃO LIMPAR
// ----------------------------------------
btnLimpar.addEventListener("click", function() {
    // a) Limpa os campos de entrada
    num1Input.value = "";
    num2Input.value = "";

    // b) Limpa o resultado
    resultado.textContent = "Resultado aparecerá aqui";
    resultado.classList.remove("sucesso", "erro");

    // c) Esvazia o array de histórico
    listaHistorico = [];

    // d) Limpa a <ul> do histórico
    listaHTML.innerHTML = "";
});