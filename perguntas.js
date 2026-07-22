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
  fetch(`${API_URL}/perguntas`)
    .then(resp => resp.json())
    .then(dados => {
      listaPerguntas = dados;
      renderizarTabelaPerguntas(dados);
    })
    .catch(() => {
      const tabela = document.getElementById("tabela-perguntas");
      if (tabela) {
        tabela.innerHTML = `<tr><td colspan="7" style="color: red; text-align: center;">Erro ao carregar dados. Verifique se o servidor está rodando.</td></tr>`;
      }
    });
}

function renderizarTabelaPerguntas(perguntas) {
  const tabela = document.getElementById("tabela-perguntas");
  if (!tabela) return;

  tabela.innerHTML = "";

  if (!perguntas || perguntas.length === 0) {
    tabela.innerHTML = `<tr><td colspan="7" style="text-align: center;">Nenhuma pergunta cadastrada até o momento.</td></tr>`;
    return;
  }

  perguntas.forEach(pergunta => {
    let tipoFormatado = pergunta.tipo;
    if (pergunta.tipo === "multipla_escolha") tipoFormatado = "Múltipla Escolha";
    else if (pergunta.tipo === "checkbox") tipoFormatado = "Checkbox";
    else if (pergunta.tipo === "texto_curto") tipoFormatado = "Texto Curto";
    else if (pergunta.tipo === "texto_longo") tipoFormatado = "Texto Longo";

    let textoAlternativas = "-";
    if (pergunta.alternativas && pergunta.alternativas.length > 0) {
      textoAlternativas = pergunta.alternativas.join(", ");
    }

    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td><strong>#${pergunta.id}</strong></td>
      <td>${pergunta.enunciado}</td>
      <td><span class="badge badge-tipo">${tipoFormatado}</span></td>
      <td>${pergunta.obrigatoria ? "✔️ Sim" : "❌ Não"}</td>
      <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${textoAlternativas}</td>
      <td>${formatarData(pergunta.criadaEm)}</td>
      <td class="text-right">
        <button class="btn btn-light btn-sm" onclick="prepararEdicaoPergunta('${pergunta.id}')">✏️ Editar</button>
        <button class="btn btn-danger btn-sm" onclick="excluirPergunta('${pergunta.id}')">🗑️ Excluir</button>
      </td>
    `;
    tabela.appendChild(linha);
  });
}

function abrirModalPergunta() {
  document.getElementById("form-pergunta").reset();
  document.getElementById("pergunta-id").value = "";
  document.getElementById("modal-pergunta-titulo").textContent = "Nova Pergunta";
  atualizarOpcoesTipoPergunta(document.getElementById("pergunta-tipo").value);
  abrirModal("modal-pergunta");
}

function atualizarOpcoesTipoPergunta(tipo) {
  const secaoAlternativas = document.getElementById("secao-alternativas");
  const dica = document.getElementById("alternativas-dica");
  if (!secaoAlternativas) return;

  if (tipo === "texto_curto" || tipo === "texto_longo") {
    secaoAlternativas.classList.add("hidden");
    document.getElementById("container-lista-alternativas").innerHTML = "";
    return;
  }

  secaoAlternativas.classList.remove("hidden");

  if (tipo === "multipla_escolha") {
    dica.textContent = "Requer entre 2 e 10 alternativas";
  } else if (tipo === "checkbox") {
    dica.textContent = "Requer entre 3 e 15 alternativas";
  }

  const container = document.getElementById("container-lista-alternativas");
  if (container.children.length === 0) {
    const qtdInicial = tipo === "checkbox" ? 3 : 2;
    for (let i = 0; i < qtdInicial; i++) {
      adicionarCampoAlternativa();
    }
  }
}

function adicionarCampoAlternativa(valorInicial = "") {
  const container = document.getElementById("container-lista-alternativas");
  if (!container) return;

  const div = document.createElement("div");
  div.classList.add("item-alternativa");

  div.innerHTML = `
    <input type="text" class="input-alternativa" value="${valorInicial}" placeholder="Digite a opção..." required>
    <button type="button" class="btn btn-danger btn-sm" onclick="this.parentElement.remove()">✕</button>
  `;

  container.appendChild(div);
}

function salvarPergunta(e) {
  e.preventDefault();

  const id = document.getElementById("pergunta-id").value;
  const enunciado = document.getElementById("pergunta-enunciado").value.trim();
  const tipo = document.getElementById("pergunta-tipo").value;
  const obrigatoria = document.getElementById("pergunta-obrigatoria").checked;

  if (!enunciado) {
    mostrarToast("Preencha o enunciado da pergunta!", "warning");
    return;
  }

  let alternativas = [];
  if (tipo === "multipla_escolha" || tipo === "checkbox") {
    const inputs = document.querySelectorAll(".input-alternativa");
    inputs.forEach(input => {
      const val = input.value.trim();
      if (val) alternativas.push(val);
    });

    if (tipo === "multipla_escolha" && (alternativas.length < 2 || alternativas.length > 10)) {
      mostrarToast("Múltipla escolha deve ter entre 2 e 10 alternativas.", "warning");
      return;
    }

    if (tipo === "checkbox" && (alternativas.length < 3 || alternativas.length > 15)) {
      mostrarToast("Checkbox deve ter entre 3 e 15 alternativas.", "warning");
      return;
    }
  }

  const pergunta = {
    enunciado: enunciado,
    tipo: tipo,
    obrigatoria: obrigatoria,
    criadaEm: new Date().toISOString()
  };

  if (tipo === "multipla_escolha" || tipo === "checkbox") {
    pergunta.alternativas = alternativas;
  }

  if (id) {
    pergunta.id = id;
    fetch(`${API_URL}/perguntas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pergunta)
    })
      .then(() => {
        mostrarToast("Pergunta atualizada com sucesso!", "success");
        fecharModal("modal-pergunta");
        carregarPerguntas();
      })
      .catch(() => mostrarToast("Erro ao atualizar pergunta.", "error"));
  } else {
    fetch(`${API_URL}/perguntas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pergunta)
    })
      .then(() => {
        mostrarToast("Pergunta salva com sucesso!", "success");
        fecharModal("modal-pergunta");
        carregarPerguntas();
      })
      .catch(() => mostrarToast("Erro ao salvar pergunta.", "error"));
  }
}

function prepararEdicaoPergunta(id) {
  const pergunta = listaPerguntas.find(p => String(p.id) === String(id));
  if (!pergunta) return;

  document.getElementById("pergunta-id").value = pergunta.id;
  document.getElementById("pergunta-enunciado").value = pergunta.enunciado;
  document.getElementById("pergunta-tipo").value = pergunta.tipo;
  document.getElementById("pergunta-obrigatoria").checked = pergunta.obrigatoria;
  document.getElementById("modal-pergunta-titulo").textContent = "Editar Pergunta";

  atualizarOpcoesTipoPergunta(pergunta.tipo);

  const container = document.getElementById("container-lista-alternativas");
  if (container) {
    container.innerHTML = "";
    if (pergunta.alternativas && pergunta.alternativas.length > 0) {
      pergunta.alternativas.forEach(alt => {
        adicionarCampoAlternativa(alt);
      });
    }
  }

  abrirModal("modal-pergunta");
}

function excluirPergunta(id) {
  fetch(`${API_URL}/respostas`)
    .then(resp => resp.json())
    .then(respostas => {
      const jaRespondida = respostas.some(r =>
        r.respostas && r.respostas.some(item => String(item.perguntaId) === String(id))
      );

      if (jaRespondida) {
        mostrarToast("Esta pergunta possui respostas vinculadas e não pode ser excluída.", "error");
        return;
      }

      if (confirm("Tem certeza que deseja excluir esta pergunta?")) {
        fetch(`${API_URL}/perguntas/${id}`, { method: "DELETE" })
          .then(() => {
            mostrarToast("Pergunta excluída com sucesso!", "success");
            carregarPerguntas();
          })
          .catch(() => mostrarToast("Erro ao excluir pergunta.", "error"));
      }
    })
    .catch(() => {
      if (confirm("Tem certeza que deseja excluir esta pergunta?")) {
        fetch(`${API_URL}/perguntas/${id}`, { method: "DELETE" })
          .then(() => {
            mostrarToast("Pergunta excluída com sucesso!", "success");
            carregarPerguntas();
          });
      }
    });
}

// Carrega as perguntas automaticamente ao abrir a página
carregarPerguntas();
