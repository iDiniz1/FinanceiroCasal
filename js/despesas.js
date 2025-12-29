let despesas = JSON.parse(localStorage.getItem('despesas')) || [];
/* Se caso falhar (despesas não existir) usamos o || para retornar o array vazio */
 /* converte string para objeto */
/* localStorage.getItem('despesas') */
/* implementação de dados do proprio site */ 
/* Só armazena string fazer conversão. Quando uma opção armazena varias informações agrupamos tudo dentro de 1 objeto */
/* La la embaixo vamos fazer salvar o array */
function listarDespesas(){
    painel.innerHTML = 
        `<br> Descrição: <input id="inp_descricao">
         <br> Valor: <input id="inp_valor">
         <br> <button onclick="AdicionarDespesas()">Adicionar</button>`;
    let total = 0;

    for (let i = 0; i <despesas.length; i++) {
    total += despesas[i].valor;
    painel.innerHTML +=  
        `<p> 
            <button class="btn-acao" onClick="carregarDespesas(${i})">🖋️</button>
            <button class="btn-acao excluir" onClick="excluirDespesas(${i})">✖️</button>
            ${despesas[i].descricao} -
             R$ ${despesas[i].valor.toFixed(2)} 
         </p>`;
    }
    painel.innerHTML += `<p><b>Total:</b> R$ ${total.toFixed(2)}</p>`

}
function AdicionarDespesas(){

      let descricao    = inp_descricao.value;
      let valor   = Number(inp_valor.value);
      
      if (descricao == '') {
        alert('Descrição invalida.');
      } else if 
      (valor <= 0 || isNaN(valor)) { 
        alert ('Valor inválido.');
      }  else {
        despesas.push( {descricao, valor});
        /* aqui */ 
        localStorage.setItem('despesas', JSON.stringify(despesas)); /* AGORA FIZEMOS O PROCESSO INVERSO ESTAMOS CONVERTENDO O OBJETO EM UMA STRING PQ O SALVAR SÓ ACEITA STRING */
        listarDespesas();
      }
}

function carregarDespesas(index){
painel.innerHTML = 
        `<br> Descrição: <input id="inp_descricao" value="${despesas[index].descricao}">
         <br> Valor: <input id="inp_valor" value="${despesas[index].valor}">
         <br> <button onclick="AlterarDespesas(${index})">Alterar</button>`;
}
    
function AlterarDespesas(index){

      let descricao    = inp_descricao.value;
      let valor   = Number(inp_valor.value);
    
      
      if (descricao == '') {
        alert('Descrição invalida.');
      } else if 
      (valor <= 0 || isNaN(valor)) { 
        alert ('Valor inválido.');
      } else {
        despesas[index] = {descricao, valor};
        /* aqui */ 
        localStorage.setItem('despesas', JSON.stringify(despesas)); /* AGORA FIZEMOS O PROCESSO INVERSO ESTAMOS CONVERTENDO O OBJETO EM UMA STRING PQ O SALVAR SÓ ACEITA STRING */
        listarDespesas();
      }
    }
 function excluirDespesas(index){
    if (confirm(`Você realmente deseja excluir "${despesas[index].descricao}"?`)) {
        despesas.splice(index, 1);
        localStorage.setItem('despesas', JSON.stringify(despesas)); /* AGORA FIZEMOS O PROCESSO INVERSO ESTAMOS CONVERTENDO O OBJETO EM UMA STRING PQ O SALVAR SÓ ACEITA STRING */
        listarDespesas();
    }
 }
/* ISNAN é quando o valor não é um numero */                     
/* TOFIXED aparece duas casas valor decimal */


/* PRO CONSOLE 
localStorage.clear() - limpa tudo
removeItem() - limpa item por item
*/