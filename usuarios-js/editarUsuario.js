import renderSidebar from "../components/sidebar.js";
import renderProfile from "../components/profile.js";
import renderMenu from "../components/menuEvents.js";
import { renderFormUsers } from "../components/formUsuario.js";
import { exibirUsuarios } from "../components/exibir-usuarios.js";
import { inicializar } from "./login.js";

let habilitaEditar = false;
let id = '';

function editarUsuario(){

    const isLogado = sessionStorage.getItem('token') !== null;

    if(isLogado){ 
        let filtro = {"filtro": 'matricula', "valor": document.getElementById('id-matricula').value};
        if(!habilitaEditar){
            if(filtro.valor){
                buscarDados(filtro);
            }
            else
                console.log('Digite os dados corretamente!')
        }
        else
            editarDados();
    }
    else{
        sessionStorage.setItem('rotaOrigem', window.location.href);
        if(confirm('Para execultar a operação é necessário estar logado!\nClick em Ok para ser direcionadapara a tela de login.')){   
            window.location.href = '../index.html';
        }          
    }  
}

async function buscarDados(filtro){
    
    let filtroJson = JSON.stringify(filtro);
    const urlParams = new URLSearchParams(filtro);
    console.log('filtroJson: ',filtroJson);
    console.log('urlParams: ',urlParams.toString());

    const req = await fetch(`https://backendcomautenticacao.onrender.com/api/usuario?${urlParams.toString()}`, {
        method: 'GET',
        headers:{"Content-Type": "application/json",
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    });
    const res = await req.json();
   
    console.log('res.result: ',res.result[0]);
    
    let usuario =res.result[0];

    if(res.result == ''){
        console.log('Dados não encontrados!');
        return;
    }

    id = usuario.id;
    
    const ocultar = document.querySelectorAll('.ocultar');
    ocultar.forEach(elemento => {
        if(elemento.id !== 'tr-senha' && elemento.id !== 'tr-confirma-senha')
            elemento.style.display = '';

    });
  
    document.getElementById('id-matricula').value = usuario.matricula;
    document.getElementById('id-nome').value = usuario.nome;
    document.getElementById('id-setor').value = usuario.setor;
    document.getElementById('id-email').value = usuario.email;

    let input = document.getElementById('id-input-enviar');
    input.value = 'Editar';

    habilitaEditar = true;
}

async function editarDados(){
    
    let nomeAux = document.getElementById('id-nome').value.toLowerCase().split(" ");
    let nome = nomeAux.map((trataNome)=>{return trataNome[0].toUpperCase() + trataNome.substring(1)}).join(" ");
    let apelido = nome.substring(0, nome.indexOf(' '));
    let email = document.getElementById('id-email').value;
    let usuario = email.substring(0, email.indexOf('@'));
    
    const dados = {
        "matricula":document.getElementById('id-matricula').value,
        "nome":nome,
        "apelido":apelido,
        "setor":document.getElementById('id-setor').value.toUpperCase(),
        "email":document.getElementById('id-email').value.toLowerCase(),
        "usuario":usuario.toLowerCase()
    };

    
    let dadosJson = JSON.stringify(dados);

    const req = await fetch(`https://backendcomautenticacao.onrender.com/api/usuario/${id}`,{
        method:'PUT',
        headers:{"Content-Type":'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
        body:dadosJson
    });

    const res = await req.json();
    
    habilitaEditar = false;
    
    exibirUsuarios(res.result, 'Editar outro usuário');

    exibirMensagem();

}

function exibirMensagem(){
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
    msg.innerHTML = 'Cadastro de usuário editado com sucesso!'
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
    tituloForm.textContent = 'Editar Usuário';
        
    const btnCadastrar = document.getElementById('id-input-enviar');
    btnCadastrar.value = 'Buscar';
    btnCadastrar.addEventListener('click', editarUsuario);
        
    const btnInicializar = document.getElementById('user-profile');
    if(btnInicializar){
        btnInicializar.addEventListener('click', inicializar);
    }
});