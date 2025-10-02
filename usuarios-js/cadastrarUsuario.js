import renderSidebar from "../components/sidebar.js";
import renderProfile from "../components/profile.js";
import renderMenu from "../components/menuEvents.js";
import { exibirUsuarios } from "../components/exibir-usuarios.js";
import { inicializar } from "./login.js";
import { renderFormUsers } from "../components/formUsuario.js";

async function cadastrarUsuario(){

    if(true){
        
        let dados       = pegaForm();
        let dadosJson   = JSON.stringify(dados);

        console.log(dados);
        console.log(dadosJson);

        const req = await fetch('http://localhost:3000/api/register',{ //https://apicontroledematerial.onrender.com/api/usuario
            method: 'POST',
            headers:{"Content-Type": "application/json"},
            body: dadosJson
        });

        const res = await req.json();
        console.log('RESPOSTA: ' + res);
        
        console.log('RESPOSTA result: ' + res.result);

        console.log('RESPOSTA JSON: ' + JSON.stringify(res));

        exibirUsuarios(res.result,'Cadastrar outro usuário');
        exibirMensagem();
    }
    else{
        if(confirm('Para execultar a operação é necessário estar logado!\nClick em Ok para ser direcionadapara a tela de login.'))
            window.location.href = '../index.html';
    }
}

function pegaForm(){

    let matricula   = document.getElementById('id-matricula').value;
    let nomeAux = document.getElementById('id-nome').value.toLowerCase().split(" ");
    let nome    = nomeAux.map((trataNome)=>{return trataNome[0].toUpperCase() + trataNome.substring(1)}).join(" ");
    let setor   = document.getElementById('id-setor').value.toUpperCase();
    let email   = document.getElementById('id-email').value.toLowerCase();
    let apelido = nome.substring(0, nome.indexOf(' '));
    let usuario = email.substring(0, email.indexOf('@'));
    let senha   = document.getElementById('id-senha').value;
    let confirmaSenha = document.getElementById('id-confirma-senha').value;
    if(matricula === '' || nome === '' || setor === '' || email === '' || senha === '' || confirmaSenha === ''){
        alert('Para cadastrar o usuário é necessário preencher todos os campos!');
        return;
    }
    if(senha !== confirmaSenha){
        alert('A senha e a confirmação de senha não conferem. Por favor, verifique!');
        return;
    }
    
    let dados = {
        "matricula" : matricula,
        "nome"      : nome,
        "apelido"   : apelido,
        "setor"     : setor,
        "email"     : email,
        "usuario"   : usuario,
        "senha"     : senha
    };

    return dados;
}

function exibirMensagem(){
    document.getElementById('id-matricula').value   = '';
    document.getElementById('id-nome').value        = '';
    document.getElementById('id-setor').value       = '';
    document.getElementById('id-email').value       = '';

    let msg                     = document.getElementById('id-msg');
    msg.innerHTML               = 'Usuário cadastrado com sucesso!'
    msg.style.maxWidth          = '500px';
    msg.style.textAlign         = 'center';
    msg.style.color             = 'red';
    msg.style.backgroundColor   = 'yellow';
    msg.style.fontWeight        = 'bold';
    msg.style.padding           = '10px';
    msg.style.margin            = '20px auto';
    msg.style.borderRadius      = '5px';
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
    
    const tituloForm = document.getElementById('titulo-form-user');
    tituloForm.textContent = 'Cadastrar Usuário';

    const btnCadastrar = document.getElementById('id-input-enviar');
    btnCadastrar.value = 'Cadastrar';
    btnCadastrar.addEventListener('click', () => {cadastrarUsuario();});

    const btnInicializar = document.getElementById('user-profile');
    if(btnInicializar){
        btnInicializar.addEventListener('click', () => {inicializar();});
    }    
});