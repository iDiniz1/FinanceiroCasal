let receitas = JSON.parse(localStorage.getItem('receitas')) || [];
/* Se caso falhar (receitas não existir) usamos o || para retornar o array vazio */
 /* converte string para objeto */
/* localStorage.getItem('receitas') */
/* implementação de dados do proprio site */ 
/* Só armazena string fazer conversão. Quando uma opção armazena varias informações agrupamos tudo dentro de 1 objeto */
/* La la embaixo vamos fazer salvar o array */
function listarReceitas(){
    painel.innerHTML = 
        `<br> Descrição: <input id="inp_descricao">
         <br> Valor: <input id="inp_valor">
         <br> <button onclick="AdicionarTarefa()">Adicionar</button>`;
    let total = 0;

    for (let i = 0; i <receitas.length; i++) {
    total += receitas[i].valor;
    painel.innerHTML +=  
        `<p> 
            <button class="btn-acao" onclick="carregarReceita(${i})">✏️</button>
            <button class="btn-acao excluir" onclick="excluirReceita(${i})">✖️</button>
            ${receitas[i].descricao} -
             R$ ${receitas[i].valor.toFixed(2)} 
         </p>`;
    }
    painel.innerHTML += `<p><b>Total:</b> R$ ${total.toFixed(2)}</p>`

}
function AdicionarTarefa(){

      let descricao    = inp_descricao.value;
      let valor   = Number(inp_valor.value);
      
      if (descricao == '') {
        alert('Descrição invalida.');
      } else if 
      (valor <= 0 || isNaN(valor)) { 
        alert ('Valor inválido.');
      } 
       else {
        receitas.push( {descricao, valor});
        /* aqui */ 
        localStorage.setItem('receitas', JSON.stringify(receitas)); /* AGORA FIZEMOS O PROCESSO INVERSO ESTAMOS CONVERTENDO O OBJETO EM UMA STRING PQ O SALVAR SÓ ACEITA STRING */
        listarReceitas();
      }
    }


function carregarReceita(index){
painel.innerHTML = 
        `<br> Descrição: <input id="inp_descricao" value="${receitas[index].descricao}">
         <br> Valor: <input id="inp_valor" value="${receitas[index].valor}">
         <br> <button onclick="AlterarReceita(${index})">Alterar</button>`;
}
    
function AlterarReceita(index){

      let descricao    = inp_descricao.value;
      let valor   = Number(inp_valor.value);
      
      if (descricao == '') {
        alert('Descrição invalida.');
      } else if 
      (valor <= 0 || isNaN(valor)) { 
        alert ('Valor inválido.');
      }  else {
        receitas[index] = {descricao, valor};
        /* aqui */ 
        localStorage.setItem('receitas', JSON.stringify(receitas)); /* AGORA FIZEMOS O PROCESSO INVERSO ESTAMOS CONVERTENDO O OBJETO EM UMA STRING PQ O SALVAR SÓ ACEITA STRING */
        listarReceitas();
      }
    }
 function excluirReceita(index){
    if (confirm(`Você realmente deseja excluir "${receitas[index].descricao}"?`)) {
        receitas.splice(index, 1);
        localStorage.setItem('receitas', JSON.stringify(receitas)); /* AGORA FIZEMOS O PROCESSO INVERSO ESTAMOS CONVERTENDO O OBJETO EM UMA STRING PQ O SALVAR SÓ ACEITA STRING */
        listarReceitas();
    }
 }
/* ISNAN é quando o valor não é um numero */                     
/* TOFIXED aparece duas casas valor decimal */


/* PRO CONSOLE 
localStorage.clear() - limpa tudo
removeItem() - limpa item por item
*/