import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const painel = document.getElementById("painel");
const despesasRef = collection(db, "despesas");

// 🔥 ARRAY GLOBAL REAL
window.despesas = [];

// 🔥 ESCUTA EM TEMPO REAL
onSnapshot(despesasRef, (snapshot) => {
  window.despesas = snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data()
  }));

  // só redesenha se o usuário estiver na aba despesas
  if (painel.innerHTML.includes("Adicionar")) {
    listarDespesas();
  }
});

// LISTAR DESPESAS
window.listarDespesas = function () {
  painel.innerHTML = `
    <br>Descrição: <input id="inp_descricao">
    <br>Valor: <input id="inp_valor">
    <br><button onclick="AdicionarDespesas()">Adicionar</button>
  `;

  let total = 0;

  window.despesas.forEach((d, i) => {
    total += d.valor;

    painel.innerHTML += `
      <p>
        <button class="btn-acao" onclick="carregarDespesas(${i})">✏️</button>
        <button class="btn-acao excluir" onclick="excluirDespesas(${i})">✖️</button>
        ${d.descricao} - R$ ${d.valor.toFixed(2)}
      </p>
    `;
  });

  painel.innerHTML += `<p><b>Total:</b> R$ ${total.toFixed(2)}</p>`;
};

// ADICIONAR DESPESA
window.AdicionarDespesas = async function () {
  const descricao = document.getElementById("inp_descricao").value;
  const valor = Number(document.getElementById("inp_valor").value);

  if (descricao === "") {
    alert("Descrição inválida.");
    return;
  }

  if (valor <= 0 || isNaN(valor)) {
    alert("Valor inválido.");
    return;
  }

  await addDoc(despesasRef, {
    descricao,
    valor,
    criadoEm: new Date()
  });
};

// CARREGAR PARA EDIÇÃO
window.carregarDespesas = function (index) {
  painel.innerHTML = `
    <br>Descrição: <input id="inp_descricao" value="${window.despesas[index].descricao}">
    <br>Valor: <input id="inp_valor" value="${window.despesas[index].valor}">
    <br><button onclick="AlterarDespesas(${index})">Alterar</button>
  `;
};

// ALTERAR DESPESA
window.AlterarDespesas = async function (index) {
  const descricao = document.getElementById("inp_descricao").value;
  const valor = Number(document.getElementById("inp_valor").value);

  if (descricao === "" || valor <= 0 || isNaN(valor)) {
    alert("Dados inválidos.");
    return;
  }

  await updateDoc(
    doc(db, "despesas", window.despesas[index].id),
    { descricao, valor }
  );
};

// EXCLUIR DESPESA
window.excluirDespesas = async function (index) {
  if (!confirm(`Excluir "${window.despesas[index].descricao}"?`)) return;

  await deleteDoc(
    doc(db, "despesas", window.despesas[index].id)
  );
};
