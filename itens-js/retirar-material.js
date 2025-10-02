import renderSidebar from "../components/sidebar.js";
import renderProfile from "../components/profile.js";
import renderFormItem from "../components/formItem.js";
import { exibirLista } from "./exibir-lista.js";
import renderMenu from "../components/menuEvents.js";
import { inicializar } from "../usuarios-js/login.js";
async function retirarMaterial(){

    const isLogado = sessionStorage.getItem('token') !== null;

    if(isLogado){

        let codigo = document.getElementById('id-codigo').value;
        let destino = document.getElementById('id-tipo').value.toUpperCase();
        let data = new Date().toLocaleDateString();

        let dados = {
            "st":"Indisponível",
            "nome":sessionStorage.getItem('nome'),
            "matricula":sessionStorage.getItem('matricula'),
            "destino":destino,
            "data":data
        };

        console.log('dados: ',dados);

        let dadosJSON = JSON.stringify({"status":dados});
       
        console.log('dados: ',dadosJSON);

        const req = await fetch(`http://localhost:3000/api/item/${codigo}`,{//(`https://apicontroledematerial.onrender.com/api/item/${codigo}`,{
            method: "PATCH",
            headers:{"Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            },
            body:dadosJSON
        });

        const res = await req.json();
        
        console.log('res: ',res);

        exibirLista(res.result, 'Retirar outro ítem');

        exibirMensagem(res.error);
    }
    else{
        if(confirm('Para execultar a operação é necessário estar logado!\nClick em Ok para ser direcionadapara a tela de login.'))
            window.location.href = '../index.html';
    }   
}

function exibirMensagem(mensagem){
    document.getElementById('id-codigo').value  = '';
    document.getElementById('id-tipo').value = '';

    let msg = document.getElementById('id-msg');
    msg.innerHTML = mensagem!=''?mensagem:'Retirada de material registrada com sucesso!'
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
    tituloForm.textContent = 'Retirada de Material';

    const lDestino = document.getElementById('th-tipo-destino');
    lDestino.textContent = 'Destino:';
    const iDestino = document.getElementById('id-tipo');
    iDestino.placeholder = 'Informe o destino';

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
    btnConsultar.value = 'Retirar';
    
    btnConsultar.addEventListener('click', () => {retirarMaterial()});

    const btnInicializar = document.getElementById('user-profile');
    if(btnInicializar){
        btnInicializar.addEventListener('click', () => {inicializar(); });
    }

});