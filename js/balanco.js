function listarBalanco(){
    painel.innerHTML = '';
         
    let total = 0;
    painel.innerHTML += '<h2>Receitas</h2>'; /* receitas */
    for (let i = 0; i <receitas.length; i++) {
    total += receitas[i].valor;
    painel.innerHTML +=  
        `<p>  
            ${receitas[i].descricao} -
             R$ ${receitas[i].valor.toFixed(2)} 
         </p>`;
    }

    painel.innerHTML += '<h2>Despesas</h2>'; /* despesas */
    for (let i = 0; i <despesas.length; i++) {
    total -= despesas[i].valor;
    painel.innerHTML +=  
        `<p> 
            ${despesas[i].descricao} -
             R$ ${despesas[i].valor.toFixed(2)} 
         </p>`;
    }
    painel.innerHTML += `<p><b>Total:</b> R$ ${total.toFixed(2)}</p>`

}