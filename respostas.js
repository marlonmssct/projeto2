// ==========================================================================
// ARQUIVO: respostas.js
// PAINEL ADM DE RESPOSTAS RECEBIDAS
// ==========================================================================

let listaRespostasGeral = [];

function carregarSelectFormulariosParaRespostas() {
  const select = document.getElementById("select-form-respostas");
  if (!select) return;

  fetch(`${API_URL}/formularios`)
    .then(resp => resp.json())
    .then(formularios => {
      let html = `<option value="">-- Selecione um formulário --</option>`;
      formularios.forEach(f => {
        html += `<option value="${f.id}">${f.titulo} (${f.status})</option>`;
      });
      select.innerHTML = html;
    });
}

function carregarRespostasDoFormulario(formularioId) {
  const tabela = document.getElementById("tabela-respostas");
  if (!tabela) return;

  if (!formularioId) {
    tabela.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">Selecione um formulário acima para visualizar as respostas enviadas.</td></tr>`;
    return;
  }

  fetch(`${API_URL}/respostas`)
    .then(resp => resp.json())
    .then(respostas => {
      listaRespostasGeral = respostas;
      const respostasFiltradas = respostas.filter(r => String(r.formularioId) === String(formularioId));
      renderizarTabelaRespostas(respostasFiltradas);
    });
}

function renderizarTabelaRespostas(respostas) {
  const tabela = document.getElementById("tabela-respostas");
  if (!tabela) return;

  tabela.innerHTML = "";

  if (!respostas || respostas.length === 0) {
    tabela.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">Nenhuma resposta registrada para este formulário até o momento.</td></tr>`;
    return;
  }

  respostas.forEach(resposta => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td><strong>#${resposta.id}</strong></td>
      <td><strong>${resposta.nome}</strong></td>
      <td>${resposta.email}</td>
      <td>${formatarData(resposta.enviadoEm)}</td>
      <td class="text-right">
        <button class="btn btn-primary btn-sm" onclick="visualizarDetalhesResposta('${resposta.id}')">
          👁️ Ver Respostas Dadas
        </button>
      </td>
    `;

    tabela.appendChild(tr);
  });
}

function visualizarDetalhesResposta(respostaId) {
  const resposta = listaRespostasGeral.find(r => String(r.id) === String(respostaId));
  if (!resposta) return;

  fetch(`${API_URL}/perguntas`)
    .then(resp => resp.json())
    .then(perguntas => {
      const container = document.getElementById("conteudo-detalhes-resposta");
      if (!container) return;

      let html = `
        <div style="background-color: var(--primary-light); padding: 16px; border-radius: var(--radius-sm); margin-bottom: 20px; border: 1px solid var(--primary-border);">
          <p style="margin-bottom: 4px;">👤 <strong>Respondente:</strong> ${resposta.nome}</p>
          <p style="margin-bottom: 4px;">✉️ <strong>E-mail:</strong> ${resposta.email}</p>
          <p style="margin: 0;">📅 <strong>Data de Envio:</strong> ${formatarData(resposta.enviadoEm)}</p>
        </div>

        <h4 style="margin-bottom: 12px;">Respostas Fornecidas:</h4>
      `;

      if (resposta.respostas && resposta.respostas.length > 0) {
        resposta.respostas.forEach(item => {
          const pergunta = perguntas.find(p => String(p.id) === String(item.perguntaId));
          const enunciado = pergunta ? pergunta.enunciado : `Pergunta #${item.perguntaId}`;

          let valorFormatado = item.valor;
          if (Array.isArray(item.valor)) {
            valorFormatado = item.valor.join(", ");
          }

          html += `
            <div class="resposta-item-box">
              <p style="font-size: 14px; font-weight: 600; color: var(--text-main); margin-bottom: 4px;">❓ ${enunciado}</p>
              <p style="font-size: 14px; color: var(--primary-hover); font-weight: 500; margin: 0;">💬 ${valorFormatado}</p>
            </div>
          `;
        });
      } else {
        html += `<p style="color: var(--text-muted);">Nenhuma resposta gravada neste envio.</p>`;
      }

      container.innerHTML = html;
      abrirModal("modal-resposta-detalhes");
    });
}
