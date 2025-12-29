// Array em memória (vem do Firebase)
let receitas = [];

// LISTAR RECEITAS
async function listarReceitas() {
    const painel = document.getElementById("painel");

    painel.innerHTML = `
        <br> Descrição: <input id="inp_descricao">
        <br> Valor: <input id="inp_valor">
        <br> <button onclick="AdicionarReceita()">Adicionar</button>
    `;

    receitas = [];
    let total = 0;

    // Busca dados no Firebase
    const snapshot = await getDocs(collection(db, "receitas"));

    snapshot.forEach((docSnap) => {
        receitas.push({
            id: docSnap.id,
            ...docSnap.data()
        });
    });

    // Renderiza na tela
    for (let i = 0; i < receitas.length; i++) {
        total += receitas[i].valor;

        painel.innerHTML += `
            <p>
                <button class="btn-acao" onclick="carregarReceita(${i})">✏️</button>
                <button class="btn-acao excluir" onclick="excluirReceita(${i})">✖️</button>
                ${receitas[i].descricao} - R$ ${receitas[i].valor.toFixed(2)}
            </p>
        `;
    }

    painel.innerHTML += `<p><b>Total:</b> R$ ${total.toFixed(2)}</p>`;
}

// ADICIONAR RECEITA
async function AdicionarReceita() {
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

    await addDoc(collection(db, "receitas"), {
        descricao: descricao,
        valor: valor,
        criadoEm: new Date()
    });

    listarReceitas();
}

// CARREGAR RECEITA PARA EDIÇÃO
function carregarReceita(index) {
    painel.innerHTML = `
        <br> Descrição: <input id="inp_descricao" value="${receitas[index].descricao}">
        <br> Valor: <input id="inp_valor" value="${receitas[index].valor}">
        <br> <button onclick="AlterarReceita(${index})">Alterar</button>
    `;
}

// ALTERAR RECEITA
async function AlterarReceita(index) {
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

    await updateDoc(
        doc(db, "receitas", receitas[index].id),
        {
            descricao: descricao,
            valor: valor
        }
    );

    listarReceitas();
}

// EXCLUIR RECEITA
async function excluirReceita(index) {
    if (!confirm(`Você realmente deseja excluir "${receitas[index].descricao}"?`)) return;

    await deleteDoc(
        doc(db, "receitas", receitas[index].id)
    );

    listarReceitas();
}
