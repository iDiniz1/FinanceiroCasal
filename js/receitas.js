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
const receitasRef = collection(db, "receitas");

// 🔥 ARRAY GLOBAL REAL
window.receitas = [];

// 🔥 ESCUTA EM TEMPO REAL
onSnapshot(receitasRef, (snapshot) => {
  window.receitas = snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data()
  }));

  // só redesenha se o usuário estiver na aba receitas
  if (painel.innerHTML.includes("Adicionar")) {
    listarReceitas();
  }
});

// LISTAR RECEITAS
window.listarReceitas = function () {
  painel.innerHTML = `
    <br>Descrição: <input id="inp_descricao">
    <br>Valor: <input id="inp_valor">
    <br><button onclick="AdicionarReceita()">Adicionar</button>
  `;

  let total = 0;

  window.receitas.forEach((r, i) => {
    total += r.valor;

    painel.innerHTML += `
      <p>
        <button class="btn-acao" onclick="carregarReceita(${i})">✏️</button>
        <button class="btn-acao excluir" onclick="excluirReceita(${i})">✖️</button>
        ${r.descricao} - R$ ${r.valor.toFixed(2)}
      </p>
    `;
  });

  painel.innerHTML += `<p><b>Total:</b> R$ ${total.toFixed(2)}</p>`;
};

// ADICIONAR
window.AdicionarReceita = async function () {
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

  await addDoc(receitasRef, {
    descricao,
    valor,
    criadoEm: new Date()
  });
};

// CARREGAR PARA EDIÇÃO
window.carregarReceita = function (index) {
  painel.innerHTML = `
    <br>Descrição: <input id="inp_descricao" value="${window.receitas[index].descricao}">
    <br>Valor: <input id="inp_valor" value="${window.receitas[index].valor}">
    <br><button onclick="AlterarReceita(${index})">Alterar</button>
  `;
};

// ALTERAR
window.AlterarReceita = async function (index) {
  const descricao = document.getElementById("inp_descricao").value;
  const valor = Number(document.getElementById("inp_valor").value);

  if (descricao === "" || valor <= 0 || isNaN(valor)) {
    alert("Dados inválidos.");
    return;
  }

  await updateDoc(
    doc(db, "receitas", window.receitas[index].id),
    { descricao, valor }
  );
};

// EXCLUIR
window.excluirReceita = async function (index) {
  if (!confirm(`Excluir "${window.receitas[index].descricao}"?`)) return;

  await deleteDoc(
    doc(db, "receitas", window.receitas[index].id)
  );
};
