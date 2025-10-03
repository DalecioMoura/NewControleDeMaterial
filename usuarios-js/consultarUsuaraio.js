import renderSidebar from "../components/sidebar.js";
import renderProfile from "../components/profile.js";
import { renderFormUsers } from "../components/formUsuario.js";
import renderMenu from "../components/menuEvents.js";
import { exibirUsuarios } from "../components/exibir-usuarios.js";
import { inicializar } from "./login.js";

function consultarUsuarios(){

    const token = sessionStorage.getItem('token');
    console.log('token: ',token);

    let isFiltro    = false;
    let nomeAux     = document.getElementById('id-nome').value.toLowerCase().split(" ");
    let nome        = '';

        if(nomeAux != ''){
            nome = nomeAux.map((trataNome)=>{return trataNome[0].toUpperCase() + trataNome.substring(1)}).join(" ");
        }
    
    let dados = {
        "matricula" : document.getElementById('id-matricula').value.toUpperCase(),
        "nome"      : nome,
        "setor"     : document.getElementById('id-setor').value.toUpperCase(),
        "email"     : document.getElementById('id-email').value.toLowerCase()
    };
    
    let filtro      = {"filtro":'', "valor":''};

    for(let i in dados){
        if(dados[i] !== '' && dados[i] !== null){
            filtro.filtro   = i;
            filtro.valor    = dados[i];
            isFiltro        = true;
            break;
            
        }
    }

    if(isFiltro){
        comFiltro(filtro);
        isFiltro = false;
    }
    else
        semFiltro();

    limparDados();
}

async function semFiltro(){

    const req = await fetch(`https://backendcomautenticacao.onrender.com/api/usuarios`, {
        method: 'GET',
        headers:{"Content-Type": "application/json",
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
        

    });
    const res = await req.json();

    exibirUsuarios(res.result, "Nova Consulta");  
}

async function comFiltro(filtro){

    const urlParams = new URLSearchParams(filtro);
    
    const req = await fetch(`https://backendcomautenticacao.onrender.com/api/usuario?${urlParams.toString()}`,{
        method: 'GET',
        headers:{"Content-Type": "application/json",
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    });
    const res = await req.json();

    console.log('resposta: '+res.result);
    exibirUsuarios(res.result, "Nova Consulta");
}

function limparDados(){
    document.getElementById('id-matricula').value   = '';
    document.getElementById('id-nome').value        = '';
    document.getElementById('id-setor').value       = '';
    document.getElementById('id-email').value       = '';
}

document.addEventListener('DOMContentLoaded', () => {
    renderSidebar();
    renderProfile();
    renderFormUsers();
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
    
    const campoSenha = document.getElementById('tr-senha');
    campoSenha.style.display = 'none';
    const campoConfirmaSenha = document.getElementById('tr-confirma-senha');
    campoConfirmaSenha.style.display = 'none';
    
    const tituloForm = document.getElementById('titulo-form-user');
    tituloForm.textContent = 'Consultar Usuário';
    
    const btnCadastrar = document.getElementById('id-input-enviar');
    btnCadastrar.value = 'Enviar';
    btnCadastrar.addEventListener('click', () => {consultarUsuarios();});
    
    const btnInicializar = document.getElementById('user-profile');
    if(btnInicializar){
        btnInicializar.addEventListener('click', () => {inicializar();});
    }
});