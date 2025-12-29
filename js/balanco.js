async function listarBalanco() {
    const painel = document.getElementById("painel");
    painel.innerHTML = "";

    let total = 0;

    /* ===== RECEITAS ===== */
    painel.innerHTML += "<h2>Receitas</h2>";

    const receitasSnapshot = await getDocs(collection(db, "receitas"));

    receitasSnapshot.forEach((docSnap) => {
        const receita = docSnap.data();
        total += receita.valor;

        painel.innerHTML += `
            <p>
                ${receita.descricao} -
                R$ ${receita.valor.toFixed(2)}
            </p>
        `;
    });

    /* ===== DESPESAS ===== */
    painel.innerHTML += "<h2>Despesas</h2>";

    const despesasSnapshot = await getDocs(collection(db, "despesas"));

    despesasSnapshot.forEach((docSnap) => {
        const despesa = docSnap.data();
        total -= despesa.valor;

        painel.innerHTML += `
            <p>
                ${despesa.descricao} -
                R$ ${despesa.valor.toFixed(2)}
            </p>
        `;
    });

    /* ===== TOTAL ===== */
    painel.innerHTML += `
        <p>
            <b>Total:</b>
            R$ ${total.toFixed(2)}
        </p>
    `;
}
