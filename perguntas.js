// ==========================================================================
// ARQUIVO: perguntas.js
// BANCO DE PERGUNTAS - EXERCÍCIOS PASSO A PASSO
// ==========================================================================

// Variável global para guardar a lista de perguntas
let listaPerguntas = [];

/**
 * EXERCÍCIO 1: Função carregarPerguntas()
 * Deve buscar as perguntas no json-server (GET /perguntas) e colocar na tabela.
 * 
 * Como fazer:
 * 1. Usar fetch(`${API_URL}/perguntas`)
 * 2. No primeiro .then(resp => resp.json())
 * 3. No segundo .then(dados => { ... }):
 *    - Guardar dados na variável global `listaPerguntas`
 *    - Chamar renderizarTabelaPerguntas(dados)
 */
function carregarPerguntas() {
  // TODO: Escreva o seu código aqui!
}

/**
 * EXERCÍCIO 2: Função renderizarTabelaPerguntas(perguntas)
 * Desenha as linhas da tabela de perguntas no HTML.
 * 
 * Como fazer:
 * 1. Pegar a tabela pelo id: const tabela = document.getElementById("tabela-perguntas");
 * 2. Limpar a tabela: tabela.innerHTML = "";
 * 3. Percorrer o array de perguntas com .forEach(pergunta => { ... }):
 *    - Criar uma linha: const linha = document.createElement("tr");
 *    - Definir linha.innerHTML com as colunas (id, enunciado, tipo, obrigatoria, botões Editar e Excluir)
 *    - Colocar na tabela: tabela.appendChild(linha);
 */
function renderizarTabelaPerguntas(perguntas) {
  // TODO: Escreva o seu código aqui!
}

/**
 * EXERCÍCIO 3: Função abrirModalPergunta()
 * Prepara e abre a janela para criar uma nova pergunta.
 * 
 * Como fazer:
 * 1. Limpar o formulário: document.getElementById("form-pergunta").reset();
 * 2. Limpar o ID oculto: document.getElementById("pergunta-id").value = "";
 * 3. Mudar o título: document.getElementById("modal-pergunta-titulo").textContent = "Nova Pergunta";
 * 4. Chamar abrirModal("modal-pergunta");
 */
function abrirModalPergunta() {
  // TODO: Escreva o seu código aqui!
}

/**
 * EXERCÍCIO 4: Função atualizarOpcoesTipoPergunta(tipo)
 * Mostra ou esconde o campo de alternativas dependendo do tipo selecionado no <select>.
 * 
 * Regra:
 * - Se tipo for "texto_curto" ou "texto_longo": esconder a div de alternativas (#secao-alternativas).
 * - Se for "multipla_escolha" ou "checkbox": mostrar a div de alternativas.
 */
function atualizarOpcoesTipoPergunta(tipo) {
  // TODO: Escreva o seu código aqui!
}

/**
 * EXERCÍCIO 5: Função adicionarCampoAlternativa(valorInicial = "")
 * Cria um novo input de texto dentro do container de alternativas (#container-lista-alternativas).
 */
function adicionarCampoAlternativa(valorInicial = "") {
  // TODO: Escreva o seu código aqui!
}

/**
 * EXERCÍCIO 6: Função salvarPergunta(e)
 * Disparada quando o formulário de pergunta é enviado (submit).
 * 
 * Regras e Etapas:
 * 1. e.preventDefault();
 * 2. Pegar os valores de enunciado, tipo, obrigatoria.
 * 3. Validação: se enunciado estiver vazio, usar alert("Preencha o enunciado!");
 * 4. Se for múltipla escolha ou checkbox, pegar os valores dos inputs de alternativa.
 *    - Múltipla escolha: precisa ter no mínimo 2 alternativas.
 *    - Checkbox: precisa ter no mínimo 3 alternativas.
 * 5. Montar o objeto `pergunta`.
 * 6. Se tiver id: fazer fetch (PUT) na URL `${API_URL}/perguntas/${id}`.
 * 7. Se não tiver id: fazer fetch (POST) na URL `${API_URL}/perguntas`.
 * 8. No .then(): fechar o modal e chamar carregarPerguntas().
 */
function salvarPergunta(e) {
  // TODO: Escreva o seu código aqui!
}

/**
 * EXERCÍCIO 7: Função prepararEdicaoPergunta(id)
 * Busca a pergunta no array `listaPerguntas` pelo ID e preenche o formulário.
 */
function prepararEdicaoPergunta(id) {
  // TODO: Escreva o seu código aqui!
}

/**
 * EXERCÍCIO 8: Função excluirPergunta(id)
 * Exclui a pergunta usando fetch com method: "DELETE".
 * 
 * Regra de Negócio:
 * - Pedir confirmação com confirm("Deseja excluir?") antes de deletar!
 */
function excluirPergunta(id) {
  // TODO: Escreva o seu código aqui!
}
