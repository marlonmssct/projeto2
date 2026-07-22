// ==========================================================================
// ARQUIVO: responder.js
// PREENCHIMENTO PÚBLICO DE QUESTIONÁRIOS NA HOME
// ==========================================================================

let formularioAtualResponder = null;
let perguntasFormularioAtual = [];
let listaQuestionariosHome = [];

function carregarSelectFormulariosParaResponder() {
  fetch(`${API_URL}/formularios`)
    .then(resp => resp.json())
    .then(formularios => {
      // Filtra apenas formulários com status === 'publicado'
      listaQuestionariosHome = formularios.filter(f => f.status === "publicado");
      renderizarCardsQuestionariosHome(listaQuestionariosHome);
    })
    .catch(() => {
      const grid = document.getElementById("grid-questionarios-home");
      if (grid) {
        grid.innerHTML = `<p style="color: var(--danger-color); grid-column: 1/-1;">Erro ao carregar questionários. Verifique se o json-server está rodando.</p>`;
      }
    });
}

function renderizarCardsQuestionariosHome(questionarios) {
  const grid = document.getElementById("grid-questionarios-home");
  if (!grid) return;

  grid.innerHTML = "";

  if (!questionarios || questionarios.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; background: white; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
        <p style="font-size: 16px; color: var(--text-muted);">Nenhum questionário publicado encontrado.</p>
      </div>
    `;
    return;
  }

  questionarios.forEach(form => {
    const card = document.createElement("div");
    card.classList.add("form-card");

    const qtdPerguntas = form.perguntas ? form.perguntas.length : 0;

    card.innerHTML = `
      <div>
        <div class="form-card-header">
          <span class="form-card-title">${form.titulo}</span>
          <span class="badge badge-publicado">Publicado</span>
        </div>
        <p class="form-card-desc">${form.descricao || "Sem descrição informada."}</p>
        <div class="form-card-meta">
          <span>❓ <strong>${qtdPerguntas}</strong> pergunta(s)</span>
          <span>📅 Início: ${formatarData(form.dataInicio)}</span>
          <span>🏁 Fim: ${formatarData(form.dataFim)}</span>
        </div>
      </div>
      <div class="form-card-actions" style="margin-top: 16px;">
        <button class="btn btn-primary" style="width: 100%; justify-content: center;" onclick="carregarFormularioParaResponder('${form.id}')">
          ✍️ Responder Questionário
        </button>
      </div>
    `;

    grid.appendChild(card);
  });
}

function filtrarQuestionariosHome(termo) {
  const termoFormatado = termo.toLowerCase().trim();
  const filtrados = listaQuestionariosHome.filter(form => {
    const tituloMatch = form.titulo && form.titulo.toLowerCase().includes(termoFormatado);
    const descMatch = form.descricao && form.descricao.toLowerCase().includes(termoFormatado);
    return tituloMatch || descMatch;
  });
  renderizarCardsQuestionariosHome(filtrados);
}

function voltarParaListaQuestionarios() {
  document.getElementById("container-responder-form").classList.add("hidden");
  document.getElementById("container-responder-form").innerHTML = "";

  const grid = document.getElementById("grid-questionarios-home");
  const busca = document.getElementById("card-busca-home");

  if (grid) grid.classList.remove("hidden");
  if (busca) busca.classList.remove("hidden");
}

function carregarFormularioParaResponder(formularioId) {
  const container = document.getElementById("container-responder-form");
  const grid = document.getElementById("grid-questionarios-home");
  const busca = document.getElementById("card-busca-home");

  if (!container) return;

  if (!formularioId) {
    voltarParaListaQuestionarios();
    return;
  }

  fetch(`${API_URL}/formularios/${formularioId}`)
    .then(resp => resp.json())
    .then(form => {
      formularioAtualResponder = form;

      const agora = new Date();
      if (form.dataInicio && new Date(form.dataInicio) > agora) {
        mostrarToast("Este formulário ainda não está aberto para respostas.", "warning");
        return;
      }
      if (form.dataFim && new Date(form.dataFim) < agora) {
        mostrarToast("Este formulário já encontra-se encerrado.", "warning");
        return;
      }

      fetch(`${API_URL}/perguntas`)
        .then(resp => resp.json())
        .then(perguntas => {
          perguntasFormularioAtual = perguntas.filter(p => 
            form.perguntas && form.perguntas.map(String).includes(String(p.id))
          );

          if (grid) grid.classList.add("hidden");
          if (busca) busca.classList.add("hidden");

          renderizarFormularioPreenchimento(container, form, perguntasFormularioAtual);
        });
    });
}

function renderizarFormularioPreenchimento(container, form, perguntas) {
  container.classList.remove("hidden");

  let html = `
    <div style="margin-bottom: 20px;">
      <button type="button" class="btn btn-light btn-sm" onclick="voltarParaListaQuestionarios()">
        ← Voltar para lista de questionários
      </button>
    </div>

    <div class="responder-header">
      <h3>${form.titulo}</h3>
      <p style="color: var(--text-muted);">${form.descricao || "Preencha os campos abaixo com atenção."}</p>
    </div>

    <form id="form-submeter-resposta" onsubmit="enviarRespostaQuestionario(event)">
      <div class="card-pergunta-responder">
        <h4>Identificação do Respondente</h4>
        <div class="form-row">
          <div class="form-group flex-1">
            <label for="resp-nome">Seu Nome Completo *</label>
            <input type="text" id="resp-nome" placeholder="Digite seu nome..." required minlength="2">
          </div>
          <div class="form-group flex-1">
            <label for="resp-email">Seu E-mail *</label>
            <input type="email" id="resp-email" placeholder="exemplo@email.com" required>
          </div>
        </div>
      </div>
  `;

  perguntas.forEach((pergunta, index) => {
    const marcarObrigatoria = pergunta.obrigatoria ? `<span class="obrigatoria-mark">*</span>` : "";

    html += `
      <div class="card-pergunta-responder">
        <h4>${index + 1}. ${pergunta.enunciado} ${marcarObrigatoria}</h4>
    `;

    if (pergunta.tipo === "texto_curto") {
      html += `
        <div class="form-group">
          <input type="text" class="campo-resposta-valor" data-id="${pergunta.id}" maxlength="200" placeholder="Sua resposta (até 200 caracteres)..." ${pergunta.obrigatoria ? "required" : ""}>
        </div>
      `;
    } else if (pergunta.tipo === "texto_longo") {
      html += `
        <div class="form-group">
          <textarea class="campo-resposta-valor" data-id="${pergunta.id}" rows="3" placeholder="Sua resposta em detalhes..." ${pergunta.obrigatoria ? "required" : ""}></textarea>
        </div>
      `;
    } else if (pergunta.tipo === "multipla_escolha") {
      html += `<div class="form-group">`;
      pergunta.alternativas.forEach(alt => {
        html += `
          <label class="checkbox-container" style="margin-bottom: 6px;">
            <input type="radio" name="rad-pergunta-${pergunta.id}" value="${alt}">
            <span>${alt}</span>
          </label>
        `;
      });
      html += `</div>`;
    } else if (pergunta.tipo === "checkbox") {
      html += `<div class="form-group">`;
      pergunta.alternativas.forEach(alt => {
        html += `
          <label class="checkbox-container" style="margin-bottom: 6px;">
            <input type="checkbox" name="chk-pergunta-${pergunta.id}" value="${alt}">
            <span>${alt}</span>
          </label>
        `;
      });
      html += `</div>`;
    }

    html += `</div>`;
  });

  html += `
      <div class="text-right" style="margin-top: 20px;">
        <button type="submit" class="btn btn-primary" style="padding: 12px 24px; font-size: 16px;">
          ✉️ Enviar Resposta
        </button>
      </div>
    </form>
  `;

  container.innerHTML = html;
}

function enviarRespostaQuestionario(e) {
  e.preventDefault();

  const nome = document.getElementById("resp-nome").value.trim();
  const email = document.getElementById("resp-email").value.trim().toLowerCase();

  if (nome.length < 2) {
    mostrarToast("O nome deve conter pelo menos 2 caracteres.", "warning");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    mostrarToast("Informe um e-mail em formato válido.", "warning");
    return;
  }

  fetch(`${API_URL}/respostas`)
    .then(resp => resp.json())
    .then(respostasExistentes => {
      const jaRespondeu = respostasExistentes.some(r => 
        String(r.formularioId) === String(formularioAtualResponder.id) &&
        r.email.trim().toLowerCase() === email
      );

      if (jaRespondeu) {
        mostrarToast("O e-mail informado já enviou uma resposta para este formulário.", "error");
        return;
      }

      const respostasColetadas = [];
      let formularioValido = true;

      for (let pergunta of perguntasFormularioAtual) {
        let valor = null;

        if (pergunta.tipo === "texto_curto" || pergunta.tipo === "texto_longo") {
          const input = document.querySelector(`.campo-resposta-valor[data-id="${pergunta.id}"]`);
          if (input) valor = input.value.trim();
        } else if (pergunta.tipo === "multipla_escolha") {
          const radioSelecionado = document.querySelector(`input[name="rad-pergunta-${pergunta.id}"]:checked`);
          if (radioSelecionado) valor = radioSelecionado.value;
        } else if (pergunta.tipo === "checkbox") {
          const chksSelecionados = document.querySelectorAll(`input[name="chk-pergunta-${pergunta.id}"]:checked`);
          valor = Array.from(chksSelecionados).map(c => c.value);
        }

        if (pergunta.obrigatoria) {
          if (!valor || (Array.isArray(valor) && valor.length === 0)) {
            mostrarToast(`A pergunta "${pergunta.enunciado}" é obrigatória.`, "warning");
            formularioValido = false;
            break;
          }
        }

        if (valor !== null && valor !== "" && (!Array.isArray(valor) || valor.length > 0)) {
          respostasColetadas.push({
            perguntaId: String(pergunta.id),
            valor: valor
          });
        }
      }

      if (!formularioValido) return;

      const objetoRespostaFinal = {
        formularioId: String(formularioAtualResponder.id),
        nome: nome,
        email: email,
        respostas: respostasColetadas,
        enviadoEm: new Date().toISOString()
      };

      fetch(`${API_URL}/respostas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objetoRespostaFinal)
      })
      .then(() => {
        mostrarToast("Sua resposta foi enviada com sucesso! Obrigado.", "success");
        voltarParaListaQuestionarios();
      });
    });
}
