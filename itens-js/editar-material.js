import renderSidebar from "../components/sidebar.js";
import renderProfile from "../components/profile.js";
import renderFormItem from "../components/formItem.js";
import renderMenu from "../components/menuEvents.js";
import { exibirLista } from "./exibir-lista.js";
import { inicializar } from "../usuarios-js/login.js";

let habilitaEditar  = false;
let id              = '';

function editarMaterial(){

    let isLogado = sessionStorage.getItem('token') !== null;

    console.log('isLogado: ',isLogado);
    console.log('token: ',sessionStorage.getItem('token'));

    if(isLogado){

        if(!habilitaEditar){
            buscarDadosParaEdicao();
        }
        else{
            enviarDadosEditados();
        }
    }
    else{
        if(confirm('Para execultar a operação é necessário estar logado!\nClick em Ok para ser direcionadapara a tela de login.')){
            sessionStorage.setItem('rotaIndex', window.location.href);
            console.log('rotaIndex: ',sessionStorage.getItem('rotaIndex'));
            console.log('window.location.href: ',window.location.href);
            window.location.href = '../index.html';
        }
    }  
}

async function buscarDadosParaEdicao(){

    let codigo  = document.querySelector('#id-codigo').value;
    let dado    = {"filtro":"codigo","valor":codigo};

    const paramUrl = new URLSearchParams(dado);
     
    if(codigo === '' || codigo === null){
        alert('Para buscar o ítem para edição é necessário informar o código!');
        return;
    }

    const req   = await fetch(`https://backendcomautenticacao.onrender.com/api/item?${paramUrl.toString()}`, {
        method: 'GET',
        headers:{"Content-Type": "application/jason",
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    });
    const res   = await req.json();
    
    let elementos        = document.querySelectorAll('.ocultar');
    elementos.forEach(elemento => {
        elemento.style.display = '';
    });

    id = res.result[0].id;
    document.getElementById('id-codigo').value      = res.result[0].codigo;
    document.getElementById('id-tipo').value        = res.result[0].tipo;
    document.getElementById('id-local').value       = res.result[0].localizacao;
    document.getElementById('id-serie').value       = res.result[0].n_serie;
    document.getElementById('id-modelo').value      = res.result[0].modelo;
    document.getElementById('id-fabricante').value  = res.result[0].fabricante;
    document.getElementById('id-descricao').value   = res.result[0].descricao;

    let input       = document.querySelector('#id-input-enviar');
    input.value     = 'Editar';
    habilitaEditar  = true;
}

async function enviarDadosEditados(){

    let tipoAux = document.getElementById('id-tipo').value.toLowerCase().split(" ");
    let tipo    = '';

    if(tipoAux != ''){
        tipo = tipoAux.map((trataTipo)=>{return trataTipo[0].toUpperCase() + trataTipo.substring(1)}).join(" ");
    }
    
    const dados = {
        "codigo"        : document.getElementById('id-codigo').value,
        "tipo"          : tipo,//document.getElementById('id-tipo').value,
        "localizacao"   : document.getElementById('id-local').value,
        "n_serie"       : document.getElementById('id-serie').value,
        "modelo"        : document.getElementById('id-modelo').value.toUpperCase(),
        "fabricante"    : document.getElementById('id-fabricante').value.toUpperCase(),
        "descricao"     : document.getElementById('id-descricao').value
        };

    let dadosJSON = JSON.stringify(dados);

    const req = await fetch(`https://backendcomautenticacao.onrender.com/api/item/${id}`,{
       method: "PUT",
       headers:{"Content-Type": "application/json",
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
       },
       body:dadosJSON
    });

    const res       = await req.json();    
    habilitaEditar  = false;

    exibirLista(res.result, "Editar outro ítem");

    exibirMensagem();
}

function exibirMensagem(){

    document.getElementById('id-codigo').value      = '';
    document.getElementById('id-tipo').value        = '';
    document.getElementById('id-local').value       = '';
    document.getElementById('id-serie').value       = '';
    document.getElementById('id-modelo').value      = '';
    document.getElementById('id-fabricante').value  = '';
    document.getElementById('id-descricao').value   = '';

    let elementos        = document.querySelectorAll('.ocultar');
    elementos.forEach(elemento => {
        elemento.style.display = 'none';
    });

    let input       = document.querySelector('#id-input-enviar');
    input.value     = 'Buscar';

    let msg = document.getElementById('id-msg');
    msg.innerHTML = 'Item editado com sucesso!'
    msg.style.maxWidth = '500px';
    msg.style.textAlign = 'center';
    msg.style.color = 'red';
    msg.style.backgroundColor = 'yellow';
    msg.style.fontWeight = 'bold';
    msg.style.padding = '10px';
    msg.style.margin = '5px auto';
    msg.style.marginBottom = '100px';
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

    
    let elementos        = document.querySelectorAll('.ocultar');
    elementos.forEach(elemento => {
        elemento.style.display = 'none';
    });

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
      tituloForm.textContent = 'Editar Material';

      const btn = document.getElementById('id-input-enviar');
      btn.value = 'Buscar';

      const btnCadastar = document.getElementById('id-input-enviar');
      btnCadastar.addEventListener('click', editarMaterial);

      const btnInicializar = document.getElementById('user-profile');
    if(btnInicializar){
        btnInicializar.addEventListener('click', () => {inicializar(); });
    }       
});
