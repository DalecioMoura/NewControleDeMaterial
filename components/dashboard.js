const htmlComponentDashboard = `
                                    <main class="dashboard" id="main-page">
                                        <div class="content-header">
                                            <h1>Dashboard</h1>
                                        </div>
                                        <div class="cards-container">
                                            <div class="card">
                                                <h3>Últimas Retiradas</h3>
                                                <ul>
                                                    <li><i class="fas fa-caret-right"></i>Notebook de PED</li>
                                                    <li><i class="fas fa-caret-right"></i>Caixa de Teste Omicron</li>
                                                    <li><i class="fas fa-caret-right"></i>Caixa de teste Double</li>
                                                    <li><i class="fas fa-caret-right"></i>Notebook de TAD</li>
                                                    <li><i class="fas fa-caret-right"></i>Relé de Proteção 7SA</li>
                                                </ul>
                                            </div>
                                            <div class="card alert">
                                                <h3>Material em Baixo Estoque</h3>
                                                <ul>
                                                    <li><i class="fas fa-exclamation-triangle"></i>Relé de Proteção 7SA</li>
                                                    <li><i class="fas fa-exclamation-triangle"></i>Caixa de Teste Omicron</li>
                                                    <li><i class="fas fa-exclamation-triangle"></i>Fio 2,5 mm²</li>
                                                </ul>
                                            </div>
                                            <div class="card access-rapid">
                                                <h3>Acesso Rápido</h3>
                                                <a href="" class="quick-link-btn" data-page="cadastrar-material">Cadastrar Material</a>
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