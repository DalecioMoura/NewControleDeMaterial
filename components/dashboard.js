const htmlComponentDashboard = `
                                    <main class="dashboard" id="main-page">
                                        <div class="content-header">
                                            <h1>Dashboard</h1>
                                        </div>
                                        <div class="cards-container">
                                            <div class="card">
                                                <h3>Últimas Retiradas</h3>
                                                <ul>
                                                    <li class="ultimas-retiradas"><i class="fas fa-caret-right"></i><span class="li-retirada"></span><!--Notebook de PED--></li>
                                                    <li class="ultimas-retiradas"><i class="fas fa-caret-right"></i><span class="li-retirada"></span><!--Caixa de Teste Omicron--></li>
                                                    <li class="ultimas-retiradas"><i class="fas fa-caret-right"></i><span class="li-retirada"></span><!--Caixa de teste Double--></li>
                                                    <li class="ultimas-retiradas"><i class="fas fa-caret-right"></i><span class="li-retirada"></span><!--Notebook de TAD--></li>
                                                    <li class="ultimas-retiradas"><i class="fas fa-caret-right"></i><span class="li-retirada"></span><!--Relé de Proteção 7SA--></li>
                                                </ul>
                                            </div>
                                            <div class="card alert">
                                                <h3>Material em Baixo Estoque</h3>
                                                <ul>
                                                    <li><i class="fas fa-exclamation-triangle"></i>Terminal Pré-isolado 2,5mm²</li>
                                                    <li><i class="fas fa-exclamation-triangle"></i>Abraçadeira de nilon</li>
                                                    <li><i class="fas fa-exclamation-triangle"></i>Fio 2,5 mm²</li>
                                                </ul>
                                            </div>
                                            <div class="card access-rapid">
                                                <h3>Acesso Rápido</h3>
                                                <a href="../itens-js/consultar-material.html" class="quick-link-btn" data-page="cadastrar-material">Consultar Material</a>
                                                <a href="../itens-js/retirar-material.html" class="quick-link-btn" data-page="cadastrar-material">Retirar Material</a>
                                                <a href="../itens-js/editar-material.html" class="quick-link-btn" data-page="cadastrar-material">Devolver Material</a>
                                            </div>  
                                        </div>
                                    </main>
                                `;

const renderDashboard = () => {
    const fragmentoDashboard = document.createRange().createContextualFragment(htmlComponentDashboard);
    const containerDashboard = document.getElementById('dashboard');
    containerDashboard.appendChild(fragmentoDashboard);
}
export default renderDashboard;