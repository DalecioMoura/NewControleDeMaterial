import renderSidebar from "./components/sidebar.js";
import renderProfile from "./components/profile.js";
import renderDashboard from "./components/dashboard.js";
import renderMenu from "./components/menuEvents.js";
import renderLogin from "./components/formLogin.js";
import {fazerLogin, inicializar} from "./usuarios-js/login.js";

document.addEventListener('DOMContentLoaded', ()=>{
    renderSidebar();
    renderProfile();
    renderDashboard();
    renderLogin();
    renderMenu();

    sessionStorage.setItem('rotaIndex', window.location.href);
    console.log('rotaIndex: ',sessionStorage.getItem('rotaIndex'));
    console.log('rotaOrigem: ',sessionStorage.getItem('rotaOrigem'));
    const isLogado = sessionStorage.getItem('logado') === 'true';
    if(isLogado){
        let msgBoasVindas = document.getElementById('msg-boas-vindas');
        const nomeUsuario = sessionStorage.getItem('nome') || 'Usuário';
        msgBoasVindas.textContent = `Bem vindo, ${nomeUsuario}!`;
        console.log('msgBoasVindas: ',msgBoasVindas);
        console.log('nomeUsuario: ',nomeUsuario);
    }

    const dashboard = document.getElementById('dashboard');
    const loginForm = document.getElementById('index-section1');

    const mostrarFormLogin = sessionStorage.getItem('mostarFormLogin') === 'true';
    if(mostrarFormLogin){//(sessionStorage.getItem('rotaIndex') !== sessionStorage.getItem('rotaAtual')){  
        dashboard.style.display = 'none';    
        loginForm.style.display = 'Block';
    }else{
        dashboard.style.display = 'block';
        loginForm.style.display = 'none';
    }
    
    const btnInicializar = document.getElementById('user-profile');
    if(btnInicializar){
        btnInicializar.addEventListener('click', () => {
            
            inicializar();
            dashboard.style.display = 'none';
            loginForm.style.display = 'block';
        });
    }

    const btnFazerLogin = document.getElementById('input-btn-login');
    if(btnFazerLogin){
        btnFazerLogin.addEventListener('click', () => {fazerLogin(); });
    }

    const homPage = document.getElementById('home-page');
    if(homPage){
        homPage.addEventListener('click', () => {
            sessionStorage.setItem('mostarFormLogin', 'false');
            window.location.href = '../index.html';
        });
    }

    const ultimasRetiradasSessionStorage = sessionStorage.getItem('itens');
    const ultimasRetiradas = document.querySelectorAll('.ultimas-retiradas');
    console.log(ultimasRetiradasSessionStorage);
    if(ultimasRetiradasSessionStorage != '' && ultimasRetiradasSessionStorage != null){
        ultimasRetiradasSessionStorage.forEach((item, index) => {
            ultimasRetiradas[index].textContent = item;
        });
    }
    else{
        ultimasRetiradas.forEach(item => {
            item.style.display = 'none';
        })
    }
    
});


