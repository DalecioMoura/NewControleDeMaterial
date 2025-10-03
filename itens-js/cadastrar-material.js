import renderSidebar from "../components/sidebar.js";
import renderProfile from "../components/profile.js";
import renderFormItem from "../components/formItem.js";
import {exibirLista} from "./exibir-lista.js";
import renderMenu from "../components/menuEvents.js";
import {inicializar} from "../usuarios-js/login.js";

async function cadastarMaterial(){

   const isLogado = sessionStorage.getItem('token') !== null;

   if(isLogado){

      let codigo = document.getElementById('id-codigo').value;
      let tipo = document.getElementById('id-tipo').value;
      let local = document.getElementById('id-local').value.toUpperCase();
      let serie = document.getElementById('id-serie').value.toUpperCase();
      let modelo = document.getElementById('id-modelo').value.toUpperCase();
      let fabricante = document.getElementById('id-fabricante').value.toUpperCase();
      let descricao = document.getElementById('id-descricao').value.toUpperCase();

      if(codigo.trim() == '' || tipo.trim() == '' || local.trim() == '' ){
            console.log('Por favor, preencha todos os campos obrigatórios!')
            return;
         }
      
      let tipoAux = tipo.toLowerCase().split(" ");
      tipo = tipoAux.map((trataTipo)=>{return trataTipo[0].toUpperCase() + trataTipo.substring(1)}).join(" ");

      const dados = {
         "codigo"       : codigo,
         "tipo"         : tipo,
         "localizacao"  : local,
         "n_serie"      : serie,
         "modelo"       : modelo,
         "fabricante"   : fabricante,
         "descricao"    : descricao,
         "status"       :{"st":"Disponível", "nome":"", "matricula":"", "destino":"", "data":""}
      }

      const urlParams = new URLSearchParams({"filtro":'codigo', "valor":dados.codigo});

      const req = await fetch(`https://apicontroledematerial.onrender.com/api/item?${urlParams.toString()}`, {//http://localhost:3000/
         method: 'GET',
         headers:{"Content-Type": "application/json",
                  "Authorization": `Bearer ${sessionStorage.getItem('token')}`
         }
   });
      const resBusca = await req.json();
      console.log('resBusca: ',resBusca);

      let isExistent = compara(resBusca.result, dados.codigo);

      if(isExistent)
         console.log('Item já cadastrado!.\nDigite um código diferente.');
      else{
         let dadosJSON = JSON.stringify(dados);

         const req = await fetch('https://apicontroledematerial.onrender.com/api/item',{//http://localhost:3000/
            method: "POST",
            headers:{"Content-Type": "application/json",
                     "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            },
            body:dadosJSON
         });

         const resCadastro = await req.json();

         console.log('resCadastro: ',resCadastro.result[0]);

         exibirLista(resCadastro.result, 'Cadastrar outro ítem');

         document.getElementById('id-codigo').value      = '';
         document.getElementById('id-tipo').value        = '';
         document.getElementById('id-local').value       = '';
         document.getElementById('id-serie').value       = '';
         document.getElementById('id-modelo').value      = '';
         document.getElementById('id-fabricante').value  = '';
         document.getElementById('id-descricao').value   = '';
      }
   }
   else{
       if(confirm('Para execultar a operação é necessário estar logado!\nClick em Ok para ser direcionadapara a tela de login.'))
           window.location.href = '../index.html';
   }
}

function compara(resResult, dadosCodigo){
   let resultado = false
   for(let i in resResult){
      console.log('Banco: '+resResult[i].codigo)
      console.log('Digitado: '+dadosCodigo)
      if(resResult[i].codigo == dadosCodigo){
         resultado = true;
         break;
      }    
   }
   return resultado;
}

document.addEventListener('DOMContentLoaded', () => {
      renderSidebar();
      renderProfile();
      renderFormItem();
      renderMenu();

      let isLogado = sessionStorage.getItem('logado') === 'true';

      if(isLogado){
          let msgBoasVindas = document.getElementById('msg-boas-vindas'); 
            const nomeUsuario = sessionStorage.getItem('nome') || 'Usuário';
            msgBoasVindas.textContent = `Bem vindo, ${nomeUsuario}!`;
            console.log('msgBoasVindas: ',msgBoasVindas);
            console.log('nomeUsuario: ',nomeUsuario);
      }

      sessionStorage.setItem('rotaOrigem', window.location.href);

      const tituloForm = document.getElementById('titulo-form');
      tituloForm.textContent = 'Cadastro de Material';

      const btnCadastrar = document.getElementById('id-input-enviar');
      btnCadastrar.value = 'Cadastrar';

      btnCadastrar.addEventListener('click', cadastarMaterial);

      const btnInicializar = document.getElementById('user-profile');
    if(btnInicializar){
        btnInicializar.addEventListener('click', () => {inicializar(); });
    }
});



