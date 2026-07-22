// ==========================================================================
// ARQUIVO: common.js
// FUNÇÕES UTILITÁRIAS E CONFIGURAÇÕES BÁSICAS
// ==========================================================================

// URL base da nossa API REST fake (json-server)
const API_URL = "http://localhost:3000";

/**
 * PASSO 1: Função trocarAba(abaId)
 * Esta função alterna a aba visível na tela quando o usuário clica nos botões do menu.
 * 
 * Como pensar na lógica:
 * 1. Selecionar todos os botões com a classe '.nav-tab' e remover a classe 'active'.
 * 2. Selecionar todas as seções com a classe '.tab-panel' e remover a classe 'active' (para esconder).
 * 3. Procurar o botão clicado e a seção com o id 'abaId' e adicionar a classe 'active'.
 * 4. Usar 'if' para saber qual aba abriu e chamar a função de carregar os dados daquela tela.
 */


function trocarAba(abaId) {
  // 1. Pegamos todos os botões e todos os painéis
  const botoes = document.querySelectorAll(".nav-tab");
  const paineis = document.querySelectorAll(".tab-panel");

  // 2. Removemos a classe 'active' de cada um deles
  botoes.forEach(botao => botao.classList.remove("active"));
  paineis.forEach(painel => painel.classList.remove("active"));

  // 3. Pegamos a seção da aba clicada e adicionamos a classe 'active'
  const painelSelecionado = document.getElementById(abaId);
  if (painelSelecionado) {
    painelSelecionado.classList.add("active");
  }

  // 4. Verificamos qual aba foi aberta e chamamos a função correspondente
  if (abaId === "tab-perguntas") {
    carregarPerguntas();
  } else if (abaId === "tab-formularios") {
    carregarFormularios();
  } else if (abaId === "tab-responder") {
    carregarSelectFormulariosParaResponder();
  } else if (abaId === "tab-respostas") {
    carregarSelectFormulariosParaRespostas();
  }
}

/**
 * PASSO 2: Funções para abrir e fechar Modais (janelas flutuantes)
 */
function abrirModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("hidden");
  }
}

function fecharModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("hidden");
  }
}

/**
 * PASSO 3: Função formatarData(dataIso)
 * Recebe uma data em texto (ex: "2026-07-01T10:00:00.000Z") e transforma em "DD/MM/YYYY"
 */
function formatarData(dataIso) {
  if (!dataIso) return "-";
  const data = new Date(dataIso);
  if (isNaN(data.getTime())) return dataIso;

  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();

  return `${dia}/${mes}/${ano}`;
}

/**
 * PASSO 4: Função mostrarToast(mensagem, tipo)
 * Exibe uma notificação amigável na tela.
 */
function mostrarToast(mensagem, tipo = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.classList.add("toast", `toast-${tipo}`);
  toast.textContent = mensagem;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500);
}
