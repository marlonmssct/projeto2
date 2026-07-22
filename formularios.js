// ==========================================================================
// ARQUIVO: formularios.js
// GESTÃO DE FORMULÁRIOS - EXERCÍCIOS PASSO A PASSO
// ==========================================================================

// Variável global para guardar a lista de formulários
let listaFormularios = [];

/**
 * EXERCÍCIO 1: Função carregarFormularios()
 * Busca os formulários no json-server (GET /formularios) e desenha os cards na tela.
 */
function carregarFormularios() {
  // TODO: Escreva o seu código aqui!
}

/**
 * EXERCÍCIO 2: Função renderizarCardsFormularios(formularios)
 * Constrói os cards visuais no container #grid-formularios.
 */
function renderizarCardsFormularios(formularios) {
  // TODO: Escreva o seu código aqui!
}

/**
 * EXERCÍCIO 3: Função carregarChecklistPerguntasParaModal(idsSelecionados = [])
 * Preenche a lista de perguntas com checkboxes dentro do modal de formulário (#container-selecao-perguntas).
 */
function carregarChecklistPerguntasParaModal(idsSelecionados = []) {
  // TODO: Escreva o seu código aqui!
}

/**
 * EXERCÍCIO 4: Função abrirModalFormulario()
 * Reseta o formulário e abre a janela para criar um novo formulário.
 */
function abrirModalFormulario() {
  // TODO: Escreva o seu código aqui!
}

/**
 * EXERCÍCIO 5: Função salvarFormulario(e)
 * Disparada no submit do formulário de criação/edição.
 * 
 * Regra:
 * - Deve validar se o título foi preenchido.
 * - Deve verificar se pelo menos 1 pergunta foi selecionada nos checkboxes.
 * - Salvar via POST (novo) ou PUT (editar).
 */
function salvarFormulario(e) {
  // TODO: Escreva o seu código aqui!
}

/**
 * EXERCÍCIO 6: Função prepararEdicaoFormulario(id)
 * Preenche os campos do formulário no modal com os dados do formulário selecionado.
 */
function prepararEdicaoFormulario(id) {
  // TODO: Escreva o seu código aqui!
}

/**
 * EXERCÍCIO 7: Função excluirFormulario(id)
 * Apaga o formulário com confirm() e fetch (DELETE).
 */
function excluirFormulario(id) {
  // TODO: Escreva o seu código aqui!
}
