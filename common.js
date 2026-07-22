// ==========================================================================
// ARQUIVO: common.js
// FUNÇÕES UTILITÁRIAS, CONFIGURAÇÕES DA API E MANIPULAÇÃO DE INTERFACE
// ==========================================================================

// PASSO 1: Defina a URL base para comunicação com o json-server
// Exemplo: const API_URL = "http://localhost:3000";
const API_URL = "http://localhost:3000";

/**
 * PASSO 2: Função trocarAba(abaId)
 * Esta função deve alternar a exibição das seções da página.
 * 
 * Etapas a implementar:
 * 1. Selecionar todos os botões de abas (.nav-tab) e remover a classe 'active' de todos.
 * 2. Selecionar todos os painéis (.tab-panel) e remover a classe 'active' de todos.
 * 3. Selecionar o botão da aba clicada e adicionar a classe 'active'.
 * 4. Selecionar o painel correspondente ao abaId e adicionar a classe 'active'.
 * 5. Se abaId === "tab-perguntas", chamar a função carregarPerguntas().
 * 6. Se abaId === "tab-formularios", chamar a função carregarFormularios().
 * 7. Se abaId === "tab-responder", chamar carregarSelectFormulariosParaResponder().
 * 8. Se abaId === "tab-respostas", chamar carregarSelectFormulariosParaRespostas().
 */
function trocarAba(abaId) {
  // TODO: Escreva o seu código aqui!
}

/**
 * PASSO 3: Função mostrarToast(mensagem, tipo)
 * Exibe uma notificação visual (toast) na tela.
 * 
 * Etapas a implementar:
 * 1. Buscar o container de toasts (#toast-container).
 * 2. Criar um elemento <div> com as classes 'toast' e 'toast-' + tipo.
 * 3. Definir o textContent do toast com a mensagem recebida.
 * 4. Adicionar o toast ao container com appendChild.
 * 5. Usar setTimeout para remover o toast após 3.5 segundos.
 */
function mostrarToast(mensagem, tipo = "success") {
  // TODO: Escreva o seu código aqui!
}

/**
 * PASSO 4: Funções para controle de modais
 * abrirModal(modalId) -> Remove a classe 'hidden' do elemento com ID modalId.
 * fecharModal(modalId) -> Adiciona a classe 'hidden' ao elemento com ID modalId.
 */
function abrirModal(modalId) {
  // TODO: Escreva o seu código aqui!
}

function fecharModal(modalId) {
  // TODO: Escreva o seu código aqui!
}

/**
 * PASSO 5: Função formatarData(dataIso)
 * Converte uma data em formato ISO (ex: "2026-07-01T10:00:00Z") para o padrão brasileiro "DD/MM/YYYY às HH:mm".
 * 
 * Dica:
 * - Use const data = new Date(dataIso);
 * - Extraia dia, mês (+1), ano, horas e minutos.
 * - Use .padStart(2, "0") para colocar o zero na frente se for menor que 10.
 */
function formatarData(dataIso) {
  // TODO: Escreva o seu código aqui!
}

/**
 * PASSO 6: Função auxiliar fetchAPI(endpoint, opcoes)
 * Executa requisições fetch para o endereço `${API_URL}${endpoint}`.
 * 
 * Etapas a implementar:
 * 1. Retornar fetch(`${API_URL}${endpoint}`, opcoes).
 * 2. No primeiro .then(resposta), verificar se resposta.ok é verdadeiro. Se não for, lançar erro.
 * 3. Retornar resposta.json().
 * 4. No .catch(erro), exibir no console o erro e mostrar um toast ("Não foi possível conectar à API.").
 */
function fetchAPI(endpoint, opcoes = {}) {
  // TODO: Escreva o seu código aqui!
}
