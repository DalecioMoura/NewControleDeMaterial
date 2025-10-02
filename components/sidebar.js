
const htmlComponentSidebar = `
                                <div class="sidebar-header">
                                    <h2 class="logo">OOTFD.C</h2>
                                    <button class="menu-toggle"><i class="fas fa-bars"></i></button>
                                </div>
                                <ul class="nav-links">
                                    <li>
                                        <a href="../index.html" class="active" id="home-page"><i class="fas fa-home"></i><span>Página Inicial</span></a>
                                    </li>
                                    <li>
                                        <div class="nav-item has-submenu">
                                            <a href=""><i class="fas fa-box"></i><span>Controle de Material</span><i class="fas fa-chevron-down arrow"></i></a>
                                            <ul class="submenu">
                                                <li><a href="../itens-js/consultar-material.html" data-page="consultar-material"><i class="fas fa-search"></i><span>Consultar Material</span></a></li>
                                                <li><a href="../itens-js/cadastrar-material.html" data-page="cadastrar-material"><i class="fas fa-plus"></i><span>Cadastrar Material</span></a></li>
                                                <li><a href="../itens-js/editar-material.html" data-page="editar-material"><i class="fas fa-edit"></i><span>Editar Material</span></a></li>
                                                <li><a href="../itens-js/retirar-material.html" data-page="retirar-material"><i class="fas fa-arrow-up"></i><span>Retirar Material</span></a></li>
                                                <li><a href="../itens-js/devolver-material.html" data-page="devolver-material"><i class="fas fa-arrow-down"></i><span>Devolver Material</span></a></li>
                                                <li><a href="../itens-js/excluir-material.html" data-page="excluir-material"><i class="fas fa-trash-alt"></i><span>Excluir Material</span></a></li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="nav-item has-submenu">
                                            <a href=""><i class="fas fa-users"></i><span>Gestão de Usuários</span><i class="fas fa-chevron-down arrow"></i></a>
                                            <ul class="submenu">
                                                <li><a href="../usuarios-js/consultar-usuario.html" data-page="consultar-usuario"><i class="fas fa-search"></i><span>Consultar Usuário</span></a></li>
                                                <li><a href="../usuarios-js/cadastrar-usuario.html" data-page="cadastrar-usuario"><i class="fas fa-user-plus"></i><span>Cadastrar usuário</span></a></li>
                                                <li><a href="../usuarios-js/editar-usuario.html" data-page="editar-usuario"><i class="fas fa-user-edit"></i><span>Editar Usuário</span></a></li>
                                                <li><a href="../usuarios-js/excluir-usuario.html" data-page="excluir-usuario"><i class="fas fa-user-minus"></i><span>Excluir Usuário</span></a></li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <a href=""><i class="fas fa-file-alt"></i><span>Relatórios</span></a>
                                    </li>
                                </ul>
                            `;

const renderSidebar = () => {
    const fragmentoSidebar = document.createRange().createContextualFragment(htmlComponentSidebar);
    const containerSidebar = document.querySelector('.sidebar');
    containerSidebar.appendChild(fragmentoSidebar);
}

export default renderSidebar;