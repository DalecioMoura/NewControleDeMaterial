const htmlComponentFormUsers =  `
                                    <div id="div-principal">
                                        <div id="div-form">
                                            <h3 id="titulo-form-user">Cadastrar Usuário</h3>
                                            <form>
                                                <table>
                                                    <tr>
                                                        <th class="th-col1">Matricula:</th>
                                                        <td class="td-col2"><input id="id-matricula" type="number" placeholder="Informe a matrícula"></td>
                                                    </tr>
                                                    <tr class="ocultar">
                                                        <th class="th-col1">Nome:</th>
                                                        <td class="td-col2"><input id="id-nome" type="text" placeholder="Informe o seu nome completo"></td>
                                                    </tr>
                                                    <tr class="ocultar">
                                                        <th class="th-col1">Setor:</th>
                                                        <td class="td-col2"><input id="id-setor" type="text" placeholder="Informe o seu setor"></td>
                                                    </tr>
                                                    <tr class="ocultar">
                                                        <th class="th-col1">E-mail:</th>
                                                        <td class="td-col2"><input id="id-email" type="text" placeholder="Informe o seu email"></td>
                                                    </tr>
                                                    <tr class="ocultar" id="tr-senha">
                                                        <th class="th-col1">Senha:</th>
                                                        <td class="td-col2"><input id="id-senha" type="password" placeholder="Crie uma senha"></td>
                                                    </tr>
                                                    <tr class="ocultar" id="tr-confirma-senha">
                                                        <th class="th-col1">Confirmar senha:</th>
                                                        <td class="td-col2"><input id="id-confirma-senha" type="password" placeholder="Confirme a senha"></td>
                                                    </tr>
                                                    <tr>
                                                        <th></th>
                                                        <td><input id="id-input-enviar" type="button" value="Enviar"></td>
                                                    </tr>
                                                </table>
                                                
                                            </form>         
                                        </div>
                                    </div>
                                `;

export const renderFormUsers = () => {
    const fragmentFormUsers = document.createRange().createContextualFragment(htmlComponentFormUsers);
    const containerFormUsers = document.getElementById('section-form');
    containerFormUsers.appendChild(fragmentFormUsers);
}

