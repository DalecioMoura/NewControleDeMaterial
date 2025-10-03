import renderSidebar from "../components/sidebar.js";
import renderProfile from "../components/profile.js";
import renderMenu from "../components/menuEvents.js";
import { renderFormUsers } from "../components/formUsuario.js";
import { exibirUsuarios } from "../components/exibir-usuarios.js";
import { inicializar } from "./login.js";

let habilitaExcluir = false;
let id = '';

function excluirUsuario(){

    const islogado = sessionStorage.getItem('token') !== null;

    if(!islogado){
        if(confirm('Para execultar a operação é necessário estar logado!\nClick em Ok para ser direcionadapara a tela de login.'))
            window.location.href = '../index.html';
        return;
    }

    let matricula = document.getElementById('id-matricula').value;
    let filtro = {"filtro":"matricula", "valor":matricula};

    if(matricula){
        console.log('matricula: '+ matricula);
        if(!habilitaExcluir){
            buscarUsuario(filtro);
        }else
            excluir();  
    }
    else
        console.log('digite algo válido!');
}

async function buscarUsuario(filtro){

    let filtroJson = JSON.stringify(filtro);
    const urlParams = new URLSearchParams(filtro);
    console.log('filtroJson: ',filtroJson);
    console.log('urlParams: ',urlParams.toString());
    
    const token = sessionStorage.getItem('token');
    
    const req = await fetch(`https://backendcomautenticacao.onrender.com/api/usuario?${urlParams.toString()}`,{
        method: 'GET',
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if(req.status === 401){
        alert('Sua sessão expirou! Faça o login novamente.');
        sessionStorage.clear();
        window.location.href = '../index.html';
        return;
    }

    const res = await req.json();

    let usuario = res.result[0];

    const ocultar = document.querySelectorAll('.ocultar');
    ocultar.forEach(elemento => {
        if(elemento.id !== 'tr-senha' && elemento.id !== 'tr-confirma-senha')
            elemento.style.display = '';

    });

    id = usuario.id;

    document.getElementById('id-matricula').value   = usuario.matricula;
    document.getElementById('id-nome').value        = usuario.nome;
    document.getElementById('id-setor').value       = usuario.setor;
    document.getElementById('id-email').value       = usuario.email;

    document.getElementById('id-input-enviar').value = 'Excluir';

    habilitaExcluir = true;
}

async function excluir(){

    const token = sessionStorage.getItem('token');

    if(!token){
        alert('Sessão expirada! Faça o login novamente.');
        sessionStorage.clear();
        window.location.href = '../index.html';
        return;
    }
 
    if(id){
        const req = await fetch(`https://backendcomautenticacao.onrender.com/api/usuario/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        if(req.status === 401){
            alert('Sua sessão expirou! Faça o login novamente.');
            sessionStorage.clear();
            window.location.href = '../index.html';
            return;
        }
      
        reset();

        const res = await req.json()

    }
    else{
        console.log("Não foi possível execultar a operação!")
    }
    
    habilitaExcluir = false;  
}

function reset(){

    document.getElementById('id-matricula').value   = '';
    document.getElementById('id-nome').value        = '';
    document.getElementById('id-setor').value       = '';
    document.getElementById('id-email').value       = '';
    
    const ocultar = document.querySelectorAll('.ocultar');
    ocultar.forEach(elemento => {
        elemento.style.display = 'none';
    });
    
    document.getElementById('id-input-enviar').value    = 'Buscar';

    let msg = document.getElementById('id-msg');
    msg.innerHTML = 'Usuário excluído com sucesso!'
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

    const ocultar = document.querySelectorAll('.ocultar');
    ocultar.forEach(elemento => {
        elemento.style.display = 'none';
    });
        
    const tituloForm = document.getElementById('titulo-form-user');
    tituloForm.textContent = 'Excluir Usuário';
        
    const btnCadastrar = document.getElementById('id-input-enviar');
    btnCadastrar.value = 'Buscar';
    btnCadastrar.addEventListener('click', excluirUsuario);
        
    const btnInicializar = document.getElementById('user-profile');
    if(btnInicializar){
        btnInicializar.addEventListener('click', inicializar);
    }
});