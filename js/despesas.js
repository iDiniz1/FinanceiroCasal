// Array em memória (vem do Firebase)
let despesas = [];

// LISTAR DESPESAS
async function listarDespesas() {
    const painel = document.getElementById("painel");

    painel.innerHTML = `
        <br> Descrição: <input id="inp_descricao">
        <br> Valor: <input id="inp_valor">
        <br> <button onclick="AdicionarDespesas()">Adicionar</button>
    `;

    despesas = [];
    let total = 0;

    // Importa funções do Firestore
    const { getDocs } = await import(
        "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js"
    );

    // Busca dados no Firebase
    const snapshot = await getDocs(collection(db, "despesas"));

    snapshot.forEach((doc) => {
        despesas.push({
            id: doc.id,
            ...doc.data()
        });
    });

    // Renderiza na tela
    for (let i = 0; i < despesas.length; i++) {
        total += despesas[i].valor;

        painel.innerHTML += `
            <p>
                <button class="btn-acao" onclick="carregarDespesas(${i})">🖋️</button>
                <button class="btn-acao excluir" onclick="excluirDespesas(${i})">✖️</button>
                ${despesas[i].descricao} - R$ ${despesas[i].valor.toFixed(2)}
            </p>
        `;
    }

    painel.innerHTML += `<p><b>Total:</b> R$ ${total.toFixed(2)}</p>`;
}

// ADICIONAR DESPESA
async function AdicionarDespesas() {
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

    await addDoc(collection(db, "despesas"), {
        descricao: descricao,
        valor: valor,
        criadoEm: new Date()
    });

    listarDespesas();
}

// CARREGAR PARA EDIÇÃO
function carregarDespesas(index) {
    painel.innerHTML = `
        <br> Descrição: <input id="inp_descricao" value="${despesas[index].descricao}">
        <br> Valor: <input id="inp_valor" value="${despesas[index].valor}">
        <br> <button onclick="AlterarDespesas(${index})">Alterar</button>
    `;
}

// ALTERAR DESPESA
async function AlterarDespesas(index) {
    let descricao = inp_descricao.value;
    let valor = Number(inp_valor.value);

    if (descricao === "") {
        alert("Descrição inválida.");
        return;
    }

    if (valor <= 0 || isNaN(valor)) {
        alert("Valor inválido.");
        return;
    }

    const { doc, updateDoc } = await import(
        "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js"
    );

    await updateDoc(
        doc(db, "despesas", despesas[index].id),
        { descricao, valor }
    );

    listarDespesas();
}

// EXCLUIR DESPESA
async function excluirDespesas(index) {
    if (!confirm(`Deseja excluir "${despesas[index].descricao}"?`)) return;

    const { doc, deleteDoc } = await import(
        "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js"
    );

    await deleteDoc(doc(db, "despesas", despesas[index].id));

    listarDespesas();
}
