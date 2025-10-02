
const renderMenu = () => {
    
    //Lógica para abrir e fechar o submenur
    const hasSubmenuLinks = document.querySelectorAll('.has-submenu > a');
    
    hasSubmenuLinks.forEach(link => {
        link.addEventListener('click', (e)=>{
            e.preventDefault();
            const parent = link.parentElement;
           
            //Fecha outros submenus abertos
            document.querySelectorAll('.has-submenu.open').forEach(item => {
                if(item !== parent){
                    item.classList.remove('open');
                }
            });

            //Altera a classe 'open' no item clicado
            parent.classList.toggle('open');
        });
    });

    //Lógica para recolher e expandir a sidebar
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    menuToggle.addEventListener('click', ()=> {
        sidebar.classList.toggle('closed');
    });

    //Remove a classe 'active' de todos os links, exceto o clicado
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            //Verifica se o clique não foi em um link submenu
            const isSubmenuLink = e.target.closest('.submenu');
            //Se for um link de menu principal, remove o 'active' de todos os outros
            if(!isSubmenuLink){
                navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
            } 
        });
    });


}


export default renderMenu;

