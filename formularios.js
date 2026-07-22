// ==========================================================================
// ARQUIVO: formularios.js
// GESTÃO E CRUD DE FORMULÁRIOS - GUIA DE IMPLEMENTAÇÃO
// ==========================================================================

// Variável global para armazenar os formulários carregados da API
let listaFormularios = [];

/**
 * TAREFA 1: Função carregarFormularios()
 * Busca todos os formulários cadastrados na rota GET /formularios.
 * 
 * Passo a passo:
 * 1. Chamar fetchAPI("/formularios").
 * 2. No .then(dados), salvar na variável global `listaFormularios`.
 * 3. Chamar renderizarCardsFormularios(listaFormularios).
 */
function carregarFormularios() {
  // TODO: Escreva a sua lógica aqui!
}

/**
 * TAREFA 2: Função renderizarCardsFormularios(formularios)
 * Constrói os cards visuais no container #grid-formularios.
 * 
 * Passo a passo:
 * 1. Pegar o elemento #grid-formularios.
 * 2. Limpar o innerHTML do container.
 * 3. Se estiver vazio, exibir mensagem "Nenhum formulário cadastrado".
 * 4. Percorrer o array de formulários:
 *    a. Criar uma div com a classe 'form-card'.
 *    b. Definir a cor do badge conforme o status ('rascunho', 'publicado' ou 'encerrado').
 *    c. Montar o HTML exibindo título, descrição, quantidade de perguntas associadas, datas de vigência e botões "Editar" e "Excluir".
 *    d. Adicionar o card ao grid com appendChild.
 */
function renderizarCardsFormularios(formularios) {
  // TODO: Escreva a sua lógica aqui!
}

/**
 * TAREFA 3: Função carregarChecklistPerguntasParaModal(idsSelecionados = [])
 * Renderiza a lista de perguntas com checkboxes dentro do modal de formulário.
 * 
 * Passo a passo:
 * 1. Pegar o container #container-selecao-perguntas.
 * 2. Limpar o innerHTML.
 * 3. Percorrer a lista global `listaPerguntas`:
 *    - Criar um elemento <label class="checkbox-container">.
 *    - Criar um <input type="checkbox" class="chk-pergunta-item" value="${pergunta.id}">.
 *    - Marcar como checked se o id da pergunta estiver no array `idsSelecionados`.
 *    - Adicionar ao container.
 */
function carregarChecklistPerguntasParaModal(idsSelecionados = []) {
  // TODO: Escreva a sua lógica aqui!
}

/**
 * TAREFA 4: Função abrirModalFormulario()
 * Reseta o formulário e abre o modal para criação de um novo formulário.
 * 
 * Passo a passo:
 * 1. Limpar o formulário #form-formulario com .reset().
 * 2. Limpar o campo oculto #formulario-id.
 * 3. Mudar o título do modal para "Novo Formulário".
 * 4. Buscar a lista atualizada de perguntas com fetchAPI("/perguntas").
 * 5. Chamar carregarChecklistPerguntasParaModal().
 * 6. Abrir o modal com abrirModal("modal-formulario").
 */
function abrirModalFormulario() {
  // TODO: Escreva a sua lógica aqui!
}

/**
 * TAREFA 5: Função salvarFormulario(evento)
 * Disparada no submit do formulário #form-formulario.
 * 
 * Regras de Negócio e Validações:
 * 1. Executar evento.preventDefault().
 * 2. Pegar valores dos campos: título, descrição, status, dataInicio, dataFim.
 * 3. Pegar todos os checkboxes de perguntas marcados (.chk-pergunta-item:checked) e obter seus valores em um array.
 * 4. Validar: O título é obrigatório!
 * 5. Validar Regra de Negócio 1: O formulário DEVE conter pelo menos 1 pergunta selecionada!
 * 6. Montar o objeto com os dados do formulário (formatar datas para ISO string se existirem).
 * 7. Se tiver ID: fetchAPI método PUT em /formularios/:id.
 * 8. Se NÃO tiver ID: fetchAPI método POST em /formularios.
 * 9. Notificar com toast, fechar o modal e chamar carregarFormularios().
 */
function salvarFormulario(evento) {
  // TODO: Escreva a sua lógica aqui!
}

/**
 * TAREFA 6: Função prepararEdicaoFormulario(id)
 * Busca o formulário pelo ID e preenche o modal para edição.
 * 
 * Passo a passo:
 * 1. Encontrar o formulário em `listaFormularios`.
 * 2. Buscar perguntas da API com fetchAPI("/perguntas").
 * 3. Preencher os campos do formulário no modal.
 * 4. Chamar carregarChecklistPerguntasParaModal(form.perguntas) passando o array de perguntas do formulário.
 * 5. Abrir o modal com abrirModal("modal-formulario").
 */
function prepararEdicaoFormulario(id) {
  // TODO: Escreva a sua lógica aqui!
}

/**
 * TAREFA 7: Função excluirFormulario(id)
 * Apaga o formulário (DELETE) respeitando a Regra de Negócio 7 (Soft Delete).
 * 
 * Regra de Negócio 7:
 * - Se o formulário JÁ tiver respostas registradas na rota /respostas, ele NÃO pode ser excluído fisicamente.
 * - Deve-se apenas alterar o status dele para "encerrado" (via PATCH).
 * 
 * Passo a passo:
 * 1. Buscar respostas na rota GET /respostas.
 * 2. Verificar se existe alguma resposta com formularioId === id.
 * 3. Se EXISTIR resposta: perguntar se deseja encerrar o formulário. Se sim, fazer fetchAPI com método PATCH em /formularios/:id enviando { status: "encerrado" }.
 * 4. Se NÃO existir resposta: pedir confirmação com confirm() e fazer fetchAPI com método DELETE em /formularios/:id.
 * 5. Recarregar os formulários com carregarFormularios().
 */
function excluirFormulario(id) {
  // TODO: Escreva a sua lógica aqui!
}
