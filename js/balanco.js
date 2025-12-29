const painel = document.getElementById("painel");

// LISTAR BALANÇO 100% AUTOMÁTICO
window.listarBalanco = function () {
  painel.innerHTML = "";

  let total = 0;

  // RECEITAS
  painel.innerHTML += "<h2>Receitas</h2>";
  if (window.receitas.length === 0) {
    painel.innerHTML += "<p>Sem receitas cadastradas</p>";
  } else {
    window.receitas.forEach((r) => {
      total += r.valor;
      painel.innerHTML += `<p>${r.descricao} - R$ ${r.valor.toFixed(2)}</p>`;
    });
  }

  // DESPESAS
  painel.innerHTML += "<h2>Despesas</h2>";
  if (window.despesas.length === 0) {
    painel.innerHTML += "<p>Sem despesas cadastradas</p>";
  } else {
    window.despesas.forEach((d) => {
      total -= d.valor;
      painel.innerHTML += `<p>${d.descricao} - R$ ${d.valor.toFixed(2)}</p>`;
    });
  }

  painel.innerHTML += `<h3> Sobrou: R$ ${total.toFixed(2)}</h3>`;
};

// 🔥 Atualização automática
// Sempre que receitas ou despesas mudarem, o balanço será recalculado
function atualizarBalanco() {
  if (painel.innerHTML.includes("Receitas") || painel.innerHTML.includes("Despesas")) {
    listarBalanco();
  }
}

// Adiciona listeners para atualização automática
// Verifica mudanças no array global a cada 500ms
setInterval(atualizarBalanco, 500);
