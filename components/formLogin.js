const htmlComponentLogin = `
                                <div id="index-section-div2">  
                                    <div id="index-div-form">
                                        <h3>Faça login aqui</h3>
                                        <form action="">
                                            <div>Informe sua matrícula ou o seu nome de usuário.</div>
                                            <table>
                                                <tr class="login-tr">
                                                    <th class="login-th">E-mail:</th>
                                                    <td class="login-td"><input id="id-email" class="login-input" type="email" placeholder="Informe sua matrícula"></td>
                                                </tr>
                                                <tr class="login-tr">
                                                    <th class="login-th">Senha:</th>
                                                    <td class="login-td"><input id="id-senha" class="login-input" type="password" placeholder="Digite o seu nome de usuário"></td>
                                                </tr>
                                                <tr>
                                                    <th></th>
                                                    <td><input id="input-btn-login" type="button" value="Entrar"></td>
                                                </tr>
                                            </table>
                                        </form>
                                    </div>
                                </div>
                            `;
const renderLogin = () => {
    const fragmentoLogin = document.createRange().createContextualFragment(htmlComponentLogin);
    const containerLogin = document.getElementById('index-section1');
    containerLogin.appendChild(fragmentoLogin);
}
export default renderLogin;