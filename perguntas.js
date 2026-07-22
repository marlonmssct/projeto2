// ==========================================================================
// ARQUIVO: perguntas.js
// BANCO DE PERGUNTAS REUTILIZÁVEIS - GUIA DE IMPLEMENTAÇÃO
// ==========================================================================

// Variável global para armazenar as perguntas vindas da API
let listaPerguntas = [];

/**
 * TAREFA 1: Função carregarPerguntas()
 * Busca todas as perguntas cadastradas na rota GET /perguntas.
 * 
 * Passo a passo:
 * 1. Chamar fetchAPI("/perguntas").
 * 2. No .then(dados), guardar os dados na variável global `listaPerguntas`.
 * 3. Chamar a função renderizarTabelaPerguntas(listaPerguntas).
 * 4. Tratar erro no .catch exibindo uma mensagem na tabela caso o servidor esteja fora do ar.
 */
function carregarPerguntas() {
  // TODO: Escreva a sua lógica aqui!
}

/**
 * TAREFA 2: Função renderizarTabelaPerguntas(perguntas)
 * Preenche o elemento <tbody> da tabela (#tabela-perguntas) com cada pergunta.
 * 
 * Passo a passo:
 * 1. Pegar o elemento <tbody> com document.getElementById("tabela-perguntas").
 * 2. Limpar o innerHTML da tabela.
 * 3. Se o array estiver vazio, mostrar uma mensagem "Nenhuma pergunta cadastrada".
 * 4. Percorrer o array de perguntas usando .forEach(pergunta => { ... }):
 *    a. Criar um elemento <tr> com document.createElement("tr").
 *    b. Formatar o tipo da pergunta (ex: "multipla_escolha" -> "Múltipla Escolha").
 *    c. Montar o innerHTML da linha com ID, enunciado, tipo, se é obrigatória, alternativas e botões "Editar" e "Excluir".
 *    d. Adicionar a linha na tabela com tabela.appendChild(tr).
 */
function renderizarTabelaPerguntas(perguntas) {
  // TODO: Escreva a sua lógica aqui!
}

/**
 * TAREFA 3: Função abrirModalPergunta()
 * Reseta o formulário de cadastro de pergunta e exibe o modal na tela.
 * 
 * Passo a passo:
 * 1. Limpar o formulário (#form-pergunta) com .reset().
 * 2. Limpar o valor do campo oculto #pergunta-id.
 * 3. Mudar o título do modal (#modal-pergunta-titulo) para "Nova Pergunta".
 * 4. Chamar atualizarOpcoesTipoPergunta() com o tipo padrão do select.
 * 5. Chamar abrirModal("modal-pergunta").
 */
function abrirModalPergunta() {
  // TODO: Escreva a sua lógica aqui!
}

/**
 * TAREFA 4: Função atualizarOpcoesTipoPergunta(tipo)
 * Mostra ou esconde o campo de alternativas dependendo do tipo selecionado.
 * 
 * Regras:
 * - "texto_curto" e "texto_longo": esconder a seção de alternativas (.classList.add("hidden")).
 * - "multipla_escolha": mostrar a seção, indicando que precisa ter entre 2 e 10 alternativas.
 * - "checkbox": mostrar a seção, indicando que precisa ter entre 3 e 15 alternativas.
 */
function atualizarOpcoesTipoPergunta(tipo) {
  // TODO: Escreva a sua lógica aqui!
}

/**
 * TAREFA 5: Função adicionarCampoAlternativa(valorInicial = "")
 * Cria dinamicamente um novo input de texto dentro do container de alternativas.
 * 
 * Passo a passo:
 * 1. Pegar o container #container-lista-alternativas.
 * 2. Criar uma div com a classe 'item-alternativa'.
 * 3. Montar o innerHTML com um <input class="input-alternativa"> e um botão de excluir (X) que faz this.parentElement.remove().
 * 4. Adicionar a div ao container.
 */
function adicionarCampoAlternativa(valorInicial = "") {
  // TODO: Escreva a sua lógica aqui!
}

/**
 * TAREFA 6: Função salvarPergunta(evento)
 * Disparada no submit do formulário #form-pergunta.
 * 
 * Regras de Negócio e Validações a fazer:
 * 1. Executar evento.preventDefault().
 * 2. Pegar os valores de #pergunta-id, #pergunta-enunciado, #pergunta-tipo e #pergunta-obrigatoria.
 * 3. Validar: o enunciado NÃO pode ser vazio!
 * 4. Se o tipo for "multipla_escolha" ou "checkbox":
 *    - Pegar todos os inputs .input-alternativa.
 *    - Filtrar valores não vazios.
 *    - Validar tamanho: multipla_escolha deve ter entre 2 e 10; checkbox deve ter entre 3 e 15.
 *    - Validar duplicidade: alternativas não podem ser repetidas!
 * 5. Montar o objeto com os dados da pergunta.
 * 6. Se existir ID: fazer fetchAPI com método PUT na rota /perguntas/:id.
 * 7. Se NÃO existir ID: fazer fetchAPI com método POST na rota /perguntas.
 * 8. Ao finalizar, mostrarToast("Salvo com sucesso!"), fechar o modal e chamar carregarPerguntas().
 */
function salvarPergunta(evento) {
  // TODO: Escreva a sua lógica aqui!
}

/**
 * TAREFA 7: Função prepararEdicaoPergunta(id)
 * Busca a pergunta pelo ID e preenche o formulário para edição.
 * 
 * Passo a passo:
 * 1. Encontrar a pergunta no array `listaPerguntas` com .find(p => String(p.id) === String(id)).
 * 2. Preencher os campos #pergunta-id, #pergunta-enunciado, #pergunta-tipo e #pergunta-obrigatoria.
 * 3. Mudar o título do modal para "Editar Pergunta".
 * 4. Atualizar as alternativas chamando atualizarOpcoesTipoPergunta().
 * 5. Preencher as alternativas existentes chamando adicionarCampoAlternativa(alt) para cada uma.
 * 6. Chamar abrirModal("modal-pergunta").
 */
function prepararEdicaoPergunta(id) {
  // TODO: Escreva a sua lógica aqui!
}

/**
 * TAREFA 8: Função excluirPergunta(id)
 * Apaga a pergunta do banco de dados (DELETE), respeitando a Regra de Negócio 7.
 * 
 * Regra de Negócio 7 (Soft Delete/Trava):
 * - Uma pergunta que JÁ possui respostas vinculadas em algum formulário NÃO pode ser excluída fisicamente!
 * 
 * Passo a passo:
 * 1. Buscar as respostas na rota GET /respostas.
 * 2. Verificar com .some() se a pergunta com o id fornecido já foi respondida.
 * 3. Se já foi respondida: exibir mostrarToast("Esta pergunta possui respostas vinculadas e não pode ser excluída.", "error").
 * 4. Se NÃO foi respondida: pedir confirmação com confirm() e fazer fetchAPI com método DELETE na rota /perguntas/:id.
 * 5. Recarregar a lista de perguntas.
 */
function excluirPergunta(id) {
  // TODO: Escreva a sua lógica aqui!
}
