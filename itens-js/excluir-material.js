import renderSidebar from "../components/sidebar.js";
import renderProfile from "../components/profile.js";
import renderFormItem from "../components/formItem.js";
import renderMenu from "../components/menuEvents.js";
import { exibirLista } from "./exibir-lista.js";
import { inicializar } from "../usuarios-js/login.js";

async function excluirMaterial(){

  const isLogado = sessionStorage.getItem('token') !== null;

  if(isLogado){

    let codigo = document.getElementById('id-codigo').value;
  
    if(codigo === '' || codigo === null){
      alert('Para excluir um ítem é necessário informar o código do ítem!');
      return;
    }

    const req = await fetch(`https://backendcomautenticacao.onrender.com/api/item/${codigo}`,{
         method: "DELETE",
         headers:{"Content-Type": "application/json",
                  'Authorization': `Bearer ${sessionStorage.getItem('token')}`
         },
      });

    const res = await req.json();
    console.log('resposta: '+res.result);
    console.log('resposta: '+res.error);

    exibirMensagem(res);

  }
  else{
      if(confirm('Para execultar a operação é necessário estar logado!\nClick em Ok para ser direcionadapara a tela de login.'))
          window.location.href = '../index.html';
  }
}

function exibirMensagem(res){
  document.getElementById('id-codigo').value  = '';

  let msg = document.getElementById('id-msg');
  msg.innerHTML = res.result==1?'Ítem excluído com sucesso!':'Item não encontrado na base de dados!';
  msg.style.maxWidth = '500px';
  msg.style.textAlign = 'center';
  msg.style.color = 'red';
  msg.style.backgroundColor = 'yellow';
  msg.style.fontWeight = 'bold';
  msg.style.padding = '10px';
  msg.style.margin = '20px auto';
  msg.style.borderRadius = '5px';
  setTimeout(()=>{
      document.getElementById('id-msg').innerHTML = '';
      msg.style.backgroundColor = '';
  }, 5000);
}

document.addEventListener('DOMContentLoaded', () => {
  renderSidebar();
  renderProfile();
  renderFormItem();
  renderMenu();

  const isLogado = sessionStorage.getItem('token') !== null;
    
      if(isLogado){
          let msgBoasVindas = document.getElementById('msg-boas-vindas');
          const nomeUsuario = sessionStorage.getItem('nome') || 'Usuário';
          msgBoasVindas.textContent = `Bem vindo, ${nomeUsuario}!`;
          console.log('msgBoasVindas: ',msgBoasVindas);
          console.log('nomeUsuario: ',nomeUsuario);
      }
    
      sessionStorage.setItem('rotaOrigem', window.location.href);

      const elementos = document.querySelectorAll('.ocultar');
      elementos.forEach(elemento => {
        elemento.style.display = 'none';
      });

      const tituloForm = document.getElementById('titulo-form');
      tituloForm.textContent = 'Excluir Material';
    
      const btnConsultar = document.getElementById('id-input-enviar');
      btnConsultar.value = 'Excluir';
        
      btnConsultar.addEventListener('click', () => {excluirMaterial()});
    
      const btnInicializar = document.getElementById('user-profile');
      if(btnInicializar){
          btnInicializar.addEventListener('click', () => {inicializar(); });
      }
});