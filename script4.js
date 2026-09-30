// ========================================
// PROJETO 4 — VALIDADOR DE FORMULÁRIO (WIZARD)
// ========================================

let form = document.getElementById("formulario");

// Guarda em qual etapa o usuário está agora (começa na 1)
let etapaAtual = 1;

// Campos da etapa 1
let inputNome  = document.getElementById("nome");
let inputIdade = document.getElementById("idade");
let msgNome    = document.getElementById("msg-nome");
let msgIdade   = document.getElementById("msg-idade");

// Campos da etapa 2
let inputEmail = document.getElementById("email");
let inputSenha = document.getElementById("senha");
let msgEmail   = document.getElementById("msg-email");
let msgSenha   = document.getElementById("msg-senha");

// Etapa 3
let resumoDiv = document.getElementById("resumo");

// Elementos gerais
let resFinal = document.getElementById("resultado-final");

// ----------------------------------------
// FUNÇÃO: esconde todas as etapas e mostra só a solicitada
// ----------------------------------------
function mostrarEtapa(numero) {
    // a) Esconde todas as etapas
    document.querySelectorAll(".etapa").forEach(function(etapa) {
        etapa.classList.remove("ativa");
    });

    // b) Mostra apenas a etapa pedida
    document.getElementById(`etapa-${numero}`).classList.add("ativa");

    etapaAtual = numero;
    atualizarBarraProgresso();
}

// ----------------------------------------
// FUNÇÃO: atualiza as cores da barra de progresso
// (verde = já passou, escuro = etapa atual, cinza = ainda não chegou)
// ----------------------------------------
function atualizarBarraProgresso() {
    document.querySelectorAll(".passo").forEach(function(passo, index) {
        let numeroDoPasso = index + 1;  // index começa em 0, etapas começam em 1

        passo.classList.remove("atual", "completo");

        if (numeroDoPasso === etapaAtual) {
            passo.classList.add("atual");
        } else if (numeroDoPasso < etapaAtual) {
            passo.classList.add("completo");
        }
    });
}

// ----------------------------------------
// VALIDAÇÃO DA ETAPA 1: nome (>= 3 caracteres) e idade (1 a 120)
// ----------------------------------------
function validarEtapa1() {
    let nome  = inputNome.value.trim();
    let idade = parseInt(inputIdade.value);
    let valido = true;

    // Nome
    if (nome.length < 3) {
        inputNome.className = "invalido";
        msgNome.textContent = "O nome deve ter pelo menos 3 caracteres.";
        msgNome.className = "mensagem erro";
        valido = false;
    } else {
        inputNome.className = "valido";
        msgNome.textContent = "Nome válido ✓";
        msgNome.className = "mensagem sucesso";
    }

    // Idade
    if (isNaN(idade) || idade < 1 || idade > 120) {
        inputIdade.className = "invalido";
        msgIdade.textContent = "Digite uma idade entre 1 e 120.";
        msgIdade.className = "mensagem erro";
        valido = false;
    } else {
        inputIdade.className = "valido";
        msgIdade.textContent = "Idade válida ✓";
        msgIdade.className = "mensagem sucesso";
    }

    return valido;
}

// ----------------------------------------
// VALIDAÇÃO DA ETAPA 2: e-mail (com @ e .) e senha (>= 6 caracteres)
// ----------------------------------------
function validarEtapa2() {
    let email = inputEmail.value.trim();
    let senha = inputSenha.value;
    let valido = true;

    // E-mail
    if (!email.includes("@") || !email.includes(".")) {
        inputEmail.className = "invalido";
        msgEmail.textContent = "E-mail inválido. Deve conter @ e ponto.";
        msgEmail.className = "mensagem erro";
        valido = false;
    } else {
        inputEmail.className = "valido";
        msgEmail.textContent = "E-mail válido ✓";
        msgEmail.className = "mensagem sucesso";
    }

    // Senha
    if (senha.length < 6) {
        inputSenha.className = "invalido";
        msgSenha.textContent = `A senha tem ${senha.length} caracteres. Mínimo: 6.`;
        msgSenha.className = "mensagem erro";
        valido = false;
    } else {
        inputSenha.className = "valido";
        msgSenha.textContent = "Senha válida ✓";
        msgSenha.className = "mensagem sucesso";
    }

    return valido;
}

// ----------------------------------------
// FUNÇÃO: monta o resumo da etapa 3 com innerHTML
// (a senha real NÃO é exibida, só uma sequência de pontos)
// ----------------------------------------
function preencherResumo() {
    resumoDiv.innerHTML = `
        <p><strong>Nome:</strong> ${inputNome.value.trim()}</p>
        <p><strong>Idade:</strong> ${inputIdade.value}</p>
        <p><strong>E-mail:</strong> ${inputEmail.value.trim()}</p>
        <p><strong>Senha:</strong> ••••••</p>
    `;
}

// ----------------------------------------
// NAVEGAÇÃO ENTRE ETAPAS
// ----------------------------------------

// Etapa 1 → Etapa 2 (só avança se validarEtapa1() for verdadeiro)
document.getElementById("btn-prox-1").addEventListener("click", function() {
    if (validarEtapa1()) {
        mostrarEtapa(2);
    }
});

// Etapa 2 → Etapa 1
document.getElementById("btn-volta-2").addEventListener("click", function() {
    mostrarEtapa(1);
});

// Etapa 2 → Etapa 3 (só avança se validarEtapa2() for verdadeiro)
document.getElementById("btn-prox-2").addEventListener("click", function() {
    if (validarEtapa2()) {
        preencherResumo();
        mostrarEtapa(3);
    }
});

// Etapa 3 → Etapa 2
document.getElementById("btn-volta-3").addEventListener("click", function() {
    mostrarEtapa(2);
});

// ----------------------------------------
// ATALHO DE TECLADO: Enter
// Sem isso, o navegador tentaria enviar o form direto ao apertar
// Enter em qualquer campo, pulando a validação das etapas 1 e 2.
// ----------------------------------------
form.addEventListener("keydown", function(evento) {
    if (evento.key === "Enter") {
        // Bloqueia sempre o comportamento padrão do navegador primeiro
        evento.preventDefault();

        if (etapaAtual === 1) {
            // Simula o clique no botão "Próximo" da etapa 1
            // (isso já passa por validarEtapa1() antes de avançar)
            document.getElementById("btn-prox-1").click();

        } else if (etapaAtual === 2) {
            document.getElementById("btn-prox-2").click();

        } else if (etapaAtual === 3) {
            // Na última etapa, Enter aciona o envio de verdade
            form.requestSubmit();
        }
    }
});

// ----------------------------------------
// ENVIO FINAL
// ----------------------------------------
form.addEventListener("submit", function(evento) {
    // preventDefault() IMPEDE o comportamento padrão do form
    // (que seria recarregar a página)
    evento.preventDefault();

    // Marca todos os passos da barra como concluídos (verde)
    document.querySelectorAll(".passo").forEach(function(passo) {
        passo.classList.remove("atual");
        passo.classList.add("completo");
    });

    // Esconde o formulário inteiro
    form.style.display = "none";

    // Exibe a mensagem de sucesso
    resFinal.textContent = "Cadastro realizado com sucesso!";
});