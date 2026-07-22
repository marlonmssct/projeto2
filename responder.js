// ==========================================================================
// ARQUIVO: responder.js
// PREENCHIMENTO PÚBLICO DE QUESTIONÁRIOS - EXERCÍCIOS PASSO A PASSO
// ==========================================================================

let formularioAtualResponder = null;
let perguntasFormularioAtual = [];

/**
 * EXERCÍCIO 1: Função carregarSelectFormulariosParaResponder()
 * Preenche o <select id="select-form-responder"> apenas com formulários com status 'publicado'.
 */
function carregarSelectFormulariosParaResponder() {
  // TODO: Escreva o seu código aqui!
}

/**
 * EXERCÍCIO 2: Função carregarFormularioParaResponder(formularioId)
 * Busca o formulário selecionado e suas perguntas e monta a tela de preenchimento.
 */
function carregarFormularioParaResponder(formularioId) {
  // TODO: Escreva o seu código aqui!
}

/**
 * EXERCÍCIO 3: Função renderizarFormularioPreenchimento(container, form, perguntas)
 * Monta os inputs de nome, e-mail e os campos de cada pergunta na tela.
 */
function renderizarFormularioPreenchimento(container, form, perguntas) {
  // TODO: Escreva o seu código aqui!
}

/**
 * EXERCÍCIO 4: Função enviarRespostaQuestionario(e)
 * Disparada no submit do formulário de resposta.
 * 
 * Regras:
 * 1. e.preventDefault();
 * 2. Pegar nome e e-mail.
 * 3. Validar se o e-mail já respondeu este formulário antes (GET /respostas).
 * 4. Verificar se todas as perguntas obrigatórias foram respondidas.
 * 5. Fazer fetch (POST) na rota /respostas salvando as respostas do usuário.
 */
function enviarRespostaQuestionario(e) {
  // TODO: Escreva o seu código aqui!
}
