

const htmlComponentProfile = `
                                <header class="topbar">
                                    <div id="user-profile" class="user-profile">
                                        <span id="msg-boas-vindas">login</span>
                                        <i class="fas fa-user-circle" id="login-logout"></i>

                                        <div class="dropdown-menu hidden" id="user-dropdown">
                                            <div class="dropdown-header">
                                                <span id="user-name-display">Olá, Usuário!</span>
                                            </div>
                                            <div id="dropdown-perfil" class="dropdown-perfil">
                                                <span class="dropdown-item">Perfil</span>   
                                            </div>
                                            <button id="logout-button" class="dropdown-item">Sair (Logout)</button>

                                            <div id="user-details" class="dropdown-details perfil-detalhes">
                                                <h3>Dados do Usuário</h3>
                                                <lable class="input-label" id="label-nome-usuario" for="nome-usuario">Nome: <input type="text" id="nome-usuario" value="Dalecio dos Santos Moura" readonly></lable>
                                                <lable class="input-label" id="label-mat-usuario" for="matricula-usuario">Matrícula: <input type="text" id="matricula-usuario" value="253641" readonly></lable>
                                                <lable class="input-label" id="label-setor-usuario" for="setror-usuario">Setor: <input type="text" id="setor-usuario" value="OOTFD.C" readonly></lable>
                                                <lable class="input-label" id="label-email-usuario" for="email-usuario">E-mail: <input type="text" id="email-usuario" value="dalecios@elet.com" readonly></lable>
                                                <button id="btn-ok">Ok</button>
                                            </div>
                                        </div>
                                    </div>
                                </header>
                            `;

// Nova função para adicionar a lógica
const setupProfileInteractions = () => {
    const isLogado = sessionStorage.getItem('token') !== null
    // 1. Pega o ícone que será clicado
    const icon = document.getElementById('login-logout'); 
    
    // 2. Pega o menu suspenso para alternar a visibilidade
    const dropdown = document.getElementById('user-dropdown');

    const btnLogout = document.getElementById('logout-button');

    const dropdownMenu = document.getElementById('user-dropdown');
    dropdownMenu.addEventListener('click', (event) => {
        event.stopPropagation(); // Impede que o clique feche o dropdown
    });
    
    // 3. Verifica se os elementos existem (para evitar erros)
    if (icon && dropdown) {
        // Adiciona o ouvinte de evento (listener) ao ícone
        icon.addEventListener('click', (event) => {
            // Previne o comportamento padrão (se fosse um link, por exemplo)
            event.stopPropagation(); 
            
            // Alterna a classe 'hidden' (Mostra ou Esconde a caixa)
            dropdown.classList.toggle('hidden');
            if(!isLogado){
                btnLogout.textContent = 'Login';
            }
        });

        // Opcional: Esconder o dropdown se o usuário clicar em qualquer outro lugar
        document.addEventListener('click', (event) => {
            // Verifica se o clique não foi dentro do perfil ou do dropdown
            if (!dropdown.contains(event.target) && !icon.contains(event.target)) {
                dropdown.classList.add('hidden');
            }
        });

        // Opcional: Adicionar lógica ao botão de logout
        btnLogout.addEventListener('click', () => {
            if(isLogado){
                confirm('Deseja realmente sair?') ? (sessionStorage.clear()) : null;
                window.location.href = '../index.html';
            }
            else{
                sessionStorage.setItem('mostarFormLogin', 'true');
                window.location.href = '../index.html';
            }
        });

        // Opcional: Adicionar lógica ao botão de detalhes do usuário
        
        const perfil = document.getElementById('dropdown-perfil');
        const userDetails = document.getElementById('user-details');
        const btnOk = document.getElementById('btn-ok');
        const nomeUsuario = document.getElementById('nome-usuario');
        const matriculUsuario = document.getElementById('matricula-usuario');
        const setorUsuario = document.getElementById('setor-usuario');
        const emailUsuario = document.getElementById('email-usuario');

        if(isLogado){
            if (perfil && userDetails) {
                perfil.addEventListener('click', (event) => {
                    event.stopPropagation();
                    userDetails.classList.toggle('perfil-detalhes');
                    btnLogout.classList.toggle('hidden');
                    nomeUsuario.value = sessionStorage.getItem('nome').toLocaleUpperCase();
                    matriculUsuario.value = sessionStorage.getItem('matricula');
                    setorUsuario.value = sessionStorage.getItem('setor').toLocaleUpperCase();
                    emailUsuario.value = sessionStorage.getItem('email').toLocaleLowerCase();
                });

                btnOk.addEventListener('click', (event) => {
                    event.stopPropagation();
                    userDetails.classList.toggle('perfil-detalhes');
                    btnLogout.classList.remove('hidden');
                    nomeUsuario.value = '';
                    matriculUsuario.value = '';
                    setorUsuario.value = '';
                    emailUsuario.value = '';
                }); 
            }    
        }    
    }
};

const renderProfile = () => {
    const fragmentoProfile = document.createRange().createContextualFragment(htmlComponentProfile);
    const containerProfile = document.getElementById('profile');
    containerProfile.appendChild(fragmentoProfile);

    // CHAMA A NOVA FUNÇÃO APÓS INSERIR O HTML NO DOM
    setupProfileInteractions();
}
export default renderProfile;



