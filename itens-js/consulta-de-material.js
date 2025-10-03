
import renderSidebar from "../components/sidebar.js";
import renderProfile from "../components/profile.js";
import renderFormItem from "../components/formItem.js";
import {exibirLista} from "./exibir-lista.js";
import renderMenu from "../components/menuEvents.js";
import {inicializar} from "../usuarios-js/login.js";


function consultarMaterial(){

    const token = sessionStorage.getItem('token');
    console.log('token: ',token);

    let isFiltro    = false;
    let tipoAux     = document.getElementById('id-tipo').value.toLowerCase().split(" ");
    let tipo        = '';

        if(tipoAux != ''){
            tipo = tipoAux.map((trataTipo)=>{return trataTipo[0].toUpperCase() + trataTipo.substring(1)}).join(" ");
        }

    let dados = {
        "codigo"        : document.getElementById('id-codigo').value,
        "tipo"          : tipo,//document.getElementById('id-tipo').value,
        "localizacao"   : document.getElementById('id-local').value,
        "modelo"        : document.getElementById('id-modelo').value.toUpperCase(),
        "fabricante"    : document.getElementById('id-fabricante').value.toUpperCase()
        }
    let filtro = {"filtro":'', "valor":''};

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
    limpar();
 }

 async function comFiltro(dado){

    const urlParams = new URLSearchParams(dado);
    
    const req = await fetch(`https://backendcomautenticacao.onrender.com/api/item?${urlParams.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}` 
        }       
    });//{JSON.stringify(dado)}`);
    const res = await req.json();

    exibirLista(res.result, 'Nova Pesquisa');
    }

 async function semFiltro(){
    console.log('sem filtro');
    const req = await fetch(`https://backendcomautenticacao.onrender.com/api/itens`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}` 
        }
               
    });
    const res = await req.json();
    console.log('res: ',res);
    exibirLista(res.result, 'Nova Pesquisa');
 }

 function limpar(){
    document.getElementById('id-codigo').value      = '';
    document.getElementById('id-tipo').value        = '';
    document.getElementById('id-local').value       = '';
    document.getElementById('id-modelo').value      = '';
    document.getElementById('id-fabricante').value  = '';
 }

 // Este código será executado assim que a página carregar
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
    tituloForm.textContent = 'Consulta de Material';

    const nSerie = document.getElementById('tr-serie');
    nSerie.style.display = 'none';

    const descricao = document.getElementById('tr-descricao');
    descricao.style.display = 'none';

    const btnConsultar = document.getElementById('id-input-enviar');
    btnConsultar.value = 'Consultar';
    
    btnConsultar.addEventListener('click', () => {consultarMaterial()});

    const btnInicializar = document.getElementById('user-profile');
    if(btnInicializar){
        btnInicializar.addEventListener('click', () => {inicializar(); });
    }
});


