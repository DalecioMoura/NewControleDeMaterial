import renderSidebar from "../components/sidebar.js";
import renderProfile from "../components/profile.js";
import renderFormItem from "../components/formItem.js";
import renderMenu from "../components/menuEvents.js";
import { exibirLista } from "../components/exibir-relatorios.js";
import { inicializar } from "../usuarios-js/login.js";


async function buscarHistorico(){

    const isLogado = sessionStorage.getItem('token') !== null;
    if(isLogado){

        let codigo = document.getElementById('id-codigo').value;
        console.log('codigo: ', codigo);

        const urlParams = new URLSearchParams({codigo:codigo});
        console.log('urlparams ', urlParams);

        const req = await fetch(`https://backendcomautenticacao.onrender.com/api/historico?${urlParams.toString()}`,{
            method: 'GET',
            headers:{'Content-Type': 'application/json',
                    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        const res = await req.json();
        console.log('res: ',res);

        exibirLista(res.result, 'Nova Pesquisa');

        exibirMensagem(res.error);
    }
    else{
        if(confirm('Para execultar a operação é necessário estar logado!\nClick em Ok para ser direcionadapara a tela de login.'))
            window.location.href = '../index.html';
    }
    
}

function exibirMensagem(mensagem){
    document.getElementById('id-codigo').value  = '';

    let msg = document.getElementById('id-msg');
    msg.innerHTML = mensagem!=''?mensagem:'Devolução de material registrada com sucesso!'
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
    
        const tituloForm = document.getElementById('titulo-form');
        tituloForm.textContent = 'Histórico de Material';
    
        const tipo = document.getElementById('tr-tipo');
        tipo.style.display = 'none';
    
        const local = document.getElementById('tr-local');
        local.style.display = 'none';
    
        const nSerie = document.getElementById('tr-serie');
        nSerie.style.display = 'none';
    
        const modelo = document.getElementById('tr-modelo');
        modelo.style.display = 'none';
    
        const fabricante = document.getElementById('tr-fabricante');
        fabricante.style.display = 'none';
    
        const descricao = document.getElementById('tr-descricao');
        descricao.style.display = 'none';
    
        const btnConsultar = document.getElementById('id-input-enviar');
        btnConsultar.value = 'Buscar';
        
        btnConsultar.addEventListener('click', () => {buscarHistorico()});
    
        const btnInicializar = document.getElementById('user-profile');
        if(btnInicializar){
            btnInicializar.addEventListener('click', () => {inicializar(); });
        }

});