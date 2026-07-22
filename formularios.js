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
  fetch(`${API_URL}/formularios`)
    .then(resp => resp.json())
    .then(dados => {
      listaFormularios = dados;
      renderizarCardsFormularios(dados);
    })
    .catch(() => {
      const grid = document.getElementById("grid-formularios");
      if (grid) {
        grid.innerHTML = `<p style="color: red;">Erro ao carregar os formulários da API.</p>`;
      }
    });
}

function renderizarCardsFormularios(formularios) {
  const grid = document.getElementById("grid-formularios");
  if (!grid) return;

  grid.innerHTML = "";

  if (!formularios || formularios.length === 0) {
    grid.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1;">Nenhum formulário cadastrado até o momento.</p>`;
    return;
  }

  formularios.forEach(form => {
    const card = document.createElement("div");
    card.classList.add("form-card");

    let classeBadge = "badge-rascunho";
    if (form.status === "publicado") classeBadge = "badge-publicado";
    else if (form.status === "encerrado") classeBadge = "badge-encerrado";

    const qtdPerguntas = form.perguntas ? form.perguntas.length : 0;

    card.innerHTML = `
      <div>
        <div class="form-card-header">
          <span class="form-card-title">${form.titulo}</span>
          <span class="badge ${classeBadge}">${form.status}</span>
        </div>
        <p class="form-card-desc">${form.descricao || "Sem descrição."}</p>
        <div class="form-card-meta">
          <span>❓ <strong>${qtdPerguntas}</strong> pergunta(s)</span>
          <span>📅 Início: ${formatarData(form.dataInicio)}</span>
          <span>🏁 Fim: ${formatarData(form.dataFim)}</span>
        </div>
      </div>
      <div class="form-card-actions">
        <button class="btn btn-light btn-sm" onclick="prepararEdicaoFormulario('${form.id}')">✏️ Editar</button>
        <button class="btn btn-danger btn-sm" onclick="excluirFormulario('${form.id}')">🗑️ Excluir</button>
      </div>
    `;

    grid.appendChild(card);
  });
}

function carregarChecklistPerguntasParaModal(idsSelecionados = []) {
  const container = document.getElementById("container-selecao-perguntas");
  if (!container) return;

  container.innerHTML = "";

  if (!listaPerguntas || listaPerguntas.length === 0) {
    container.innerHTML = `<p style="font-size: 13px; color: var(--text-muted);">Nenhuma pergunta disponível. Cadastre perguntas na aba 'Banco de Perguntas' antes de criar um formulário.</p>`;
    return;
  }

  listaPerguntas.forEach(pergunta => {
    const estaMarcada = idsSelecionados.map(String).includes(String(pergunta.id));

    const label = document.createElement("label");
    label.classList.add("checkbox-container");

    label.innerHTML = `
      <input type="checkbox" class="chk-pergunta-item" value="${pergunta.id}" ${estaMarcada ? "checked" : ""}>
      <span><strong>#${pergunta.id}</strong> - ${pergunta.enunciado} (${pergunta.tipo})</span>
    `;

    container.appendChild(label);
  });
}

function abrirModalFormulario() {
  document.getElementById("form-formulario").reset();
  document.getElementById("formulario-id").value = "";
  document.getElementById("modal-formulario-titulo").textContent = "Novo Formulário";

  fetch(`${API_URL}/perguntas`)
    .then(resp => resp.json())
    .then(perguntas => {
      listaPerguntas = perguntas;
      carregarChecklistPerguntasParaModal();
      abrirModal("modal-formulario");
    });
}

function salvarFormulario(e) {
  e.preventDefault();

  const id = document.getElementById("formulario-id").value;
  const titulo = document.getElementById("formulario-titulo-input").value.trim();
  const descricao = document.getElementById("formulario-descricao").value.trim();
  const status = document.getElementById("formulario-status").value;
  const dataInicio = document.getElementById("formulario-datainicio").value;
  const dataFim = document.getElementById("formulario-datafim").value;

  const checkboxes = document.querySelectorAll(".chk-pergunta-item:checked");
  const perguntasSelecionadas = Array.from(checkboxes).map(chk => chk.value);

  if (!titulo) {
    mostrarToast("O título do formulário é obrigatório.", "warning");
    return;
  }

  if (perguntasSelecionadas.length === 0) {
    mostrarToast("Selecione pelo menos 1 pergunta para compor o formulário.", "warning");
    return;
  }

  const objetoFormulario = {
    titulo: titulo,
    descricao: descricao,
    perguntas: perguntasSelecionadas,
    status: status,
    dataInicio: dataInicio ? new Date(dataInicio).toISOString() : null,
    dataFim: dataFim ? new Date(dataFim).toISOString() : null,
    criadoEm: new Date().toISOString()
  };

  if (id) {
    objetoFormulario.id = id;
    fetch(`${API_URL}/formularios/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objetoFormulario)
    })
      .then(() => {
        mostrarToast("Formulário atualizado com sucesso!", "success");
        fecharModal("modal-formulario");
        carregarFormularios();
      });
  } else {
    fetch(`${API_URL}/formularios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objetoFormulario)
    })
      .then(() => {
        mostrarToast("Formulário criado com sucesso!", "success");
        fecharModal("modal-formulario");
        carregarFormularios();
      });
  }
}

function prepararEdicaoFormulario(id) {
  const form = listaFormularios.find(f => String(f.id) === String(id));
  if (!form) return;

  fetch(`${API_URL}/perguntas`)
    .then(resp => resp.json())
    .then(perguntas => {
      listaPerguntas = perguntas;

      document.getElementById("formulario-id").value = form.id;
      document.getElementById("formulario-titulo-input").value = form.titulo;
      document.getElementById("formulario-descricao").value = form.descricao || "";
      document.getElementById("formulario-status").value = form.status;
      document.getElementById("formulario-datainicio").value = form.dataInicio ? form.dataInicio.substring(0, 16) : "";
      document.getElementById("formulario-datafim").value = form.dataFim ? form.dataFim.substring(0, 16) : "";
      document.getElementById("modal-formulario-titulo").textContent = "Editar Formulário";

      carregarChecklistPerguntasParaModal(form.perguntas || []);
      abrirModal("modal-formulario");
    });
}

function excluirFormulario(id) {
  fetch(`${API_URL}/respostas`)
    .then(resp => resp.json())
    .then(respostas => {
      const temRespostas = respostas.some(r => String(r.formularioId) === String(id));

      if (temRespostas) {
        if (confirm("Este formulário possui respostas vinculadas e não pode ser excluído permanentemente.\nDeseja alterar o status para 'Encerrado'?")) {
          fetch(`${API_URL}/formularios/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "encerrado" })
          })
            .then(() => {
              mostrarToast("Formulário encerrado com sucesso!", "success");
              carregarFormularios();
            });
        }
        return;
      }

      if (confirm("Tem certeza que deseja excluir permanentemente este formulário?")) {
        fetch(`${API_URL}/formularios/${id}`, { method: "DELETE" })
          .then(() => {
            mostrarToast("Formulário excluído com sucesso!", "success");
            carregarFormularios();
          });
      }
    });
}
