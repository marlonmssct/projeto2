// ==========================================================================
// ARQUIVO: respostas.js
// PAINEL ADM DE RESPOSTAS RECEBIDAS - GUIA DE IMPLEMENTAÇÃO
// ==========================================================================

// Variável global para guardar todas as respostas carregadas da API
let listaRespostasGeral = [];

/**
 * TAREFA 1: Função carregarSelectFormulariosParaRespostas()
 * Preenche o menu <select id="select-form-respostas"> com a lista de formulários.
 * 
 * Passo a passo:
 * 1. Pegar o elemento #select-form-respostas.
 * 2. Buscar formulários na rota GET /formularios.
 * 3. Montar as opções <option value="${f.id}">${f.titulo}</option>.
 * 4. Inserir no innerHTML do select.
 */
function carregarSelectFormulariosParaRespostas() {
  // TODO: Escreva a sua lógica aqui!
}

/**
 * TAREFA 2: Função carregarRespostasDoFormulario(formularioId)
 * Disparada no onchange do filtro de formulários.
 * 
 * Passo a passo:
 * 1. Pegar o elemento <tbody> #tabela-respostas.
 * 2. Se nenhum formulário for selecionado, limpar a tabela e exibir mensagem.
 * 3. Buscar todas as respostas na rota GET /respostas.
 * 4. Guardar em `listaRespostasGeral`.
 * 5. Filtrar apenas as respostas cujo formularioId seja igual ao formularioId selecionado.
 * 6. Chamar renderizarTabelaRespostas(respostasFiltradas).
 */
function carregarRespostasDoFormulario(formularioId) {
  // TODO: Escreva a sua lógica aqui!
}

/**
 * TAREFA 3: Função renderizarTabelaRespostas(respostas)
 * Constrói as linhas da tabela exibindo nome, e-mail, data de envio e botão "Ver Respostas Dadas".
 * 
 * Passo a passo:
 * 1. Pegar a tabela #tabela-respostas.
 * 2. Limpar o innerHTML.
 * 3. Se o array estiver vazio, exibir mensagem "Nenhuma resposta registrada para este formulário".
 * 4. Percorrer o array de respostas:
 *    - Criar uma <tr>.
 *    - Montar o HTML com ID, Nome, E-mail, Data de Envio (formatarData) e botão "Ver Respostas Dadas" chamando visualizarDetalhesResposta(r.id).
 *    - Adicionar à tabela com appendChild.
 */
function renderizarTabelaRespostas(respostas) {
  // TODO: Escreva a sua lógica aqui!
}

/**
 * TAREFA 4: Função visualizarDetalhesResposta(respostaId)
 * Abre um modal (#modal-resposta-detalhes) exibindo cada pergunta e a resposta fornecida pelo participante.
 * 
 * Passo a passo:
 * 1. Encontrar o objeto da resposta em `listaRespostasGeral` pelo id.
 * 2. Buscar todas as perguntas na rota GET /perguntas.
 * 3. Pegar o container #conteudo-detalhes-resposta.
 * 4. Montar o cabeçalho com os dados do respondente (Nome, E-mail e Data de Envio).
 * 5. Percorrer o array `resposta.respostas`:
 *    - Localizar a pergunta correspondente para obter o enunciado.
 *    - Formatar o valor da resposta (se for array/checkbox, usar .join(", ")).
 *    - Exibir o enunciado e a resposta fornecida num card formatado.
 * 6. Inserir o HTML no container.
 * 7. Abrir o modal com abrirModal("modal-resposta-detalhes").
 */
function visualizarDetalhesResposta(respostaId) {
  // TODO: Escreva a sua lógica aqui!
}
