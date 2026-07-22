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


function toggleMenuGerenciamento(e) {
  if (e) e.stopPropagation();
  const dropdown = document.getElementById("dropdown-gerenciamento");
  if (dropdown) {
    dropdown.classList.toggle("open");
  }
}

// Fecha o menu suspenso de Gerenciamento ao clicar em qualquer lugar fora dele
document.addEventListener("click", (e) => {
  const dropdown = document.getElementById("dropdown-gerenciamento");
  if (dropdown && !dropdown.contains(e.target)) {
    dropdown.classList.remove("open");
  }
});

function trocarAba(abaId) {
  // Fecha o menu de gerenciamento se estiver aberto
  const dropdown = document.getElementById("dropdown-gerenciamento");
  if (dropdown) {
    dropdown.classList.remove("open");
  }

  // 1. Pegamos todos os botões da barra e itens do dropdown
  const botoes = document.querySelectorAll(".nav-tab, .dropdown-item");
  const paineis = document.querySelectorAll(".tab-panel");

  // 2. Removemos a classe 'active' de todos
  botoes.forEach(botao => botao.classList.remove("active"));
  paineis.forEach(painel => painel.classList.remove("active"));

  // Destacamos o item selecionado
  const itemClicado = document.querySelector(`[data-tab="${abaId}"]`);
  if (itemClicado) {
    itemClicado.classList.add("active");
  }

  // Se a aba for uma das telas de gestão, destacamos o botão principal "Gerenciamento"
  const btnGerenciamento = document.getElementById("btn-gerenciamento");
  if (btnGerenciamento) {
    if (abaId === "tab-perguntas" || abaId === "tab-formularios" || abaId === "tab-respostas") {
      btnGerenciamento.classList.add("active");
    }
  }

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
