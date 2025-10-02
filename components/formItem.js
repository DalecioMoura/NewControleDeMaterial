const htmlComponentFormItem = `
                                
                                    <div id="div-principal"> 
                                        <div id="div-form">
                                            <h1 id="titulo-form">Material</h1>
                                            <form>
                                                <table>
                                                    <tr id="tr-codigo">
                                                        <th class="th-col1">Código:</th>
                                                        <td class="td-col2"><input id="id-codigo" type="text" value="" placeholder="Informe o código do material"></td>
                                                    </tr>
                                                    <tr id="tr-tipo" class="ocultar">
                                                        <th id="th-tipo-destino" class="th-col1">Tipo:</th>
                                                        <td class="td-col2"><input id="id-tipo" type="text" placeholder="Informe o tipo do material"></td>
                                                    </tr>
                                                    <tr id="tr-local"  class="ocultar">
                                                        <th class="th-col1">Localização:</th>
                                                        <td class="td-col2"><input id="id-local" type="text" placeholder="Informe a localização do objeto"></td>
                                                    </tr>
                                                    <tr id="tr-serie"  class="ocultar">
                                                        <th class="th-col1">Nº de Série:</th>
                                                        <td class="td-col2"><input id="id-serie" type="text" placeholder="Informe o número de série do objeto"></td>
                                                    </tr>
                                                    <tr id="tr-modelo"  class="ocultar">
                                                        <th class="th-col1">Modelo:</th>
                                                        <td class="td-col2"><input id="id-modelo" type="text" placeholder="Informe o modelo do objeto"></td>
                                                    </tr>
                                                    <tr id="tr-fabricante"  class="ocultar">
                                                        <th class="th-col1">Fabricante:</th>
                                                        <td class="td-col2"><input id="id-fabricante" type="text" placeholder="Informe o Fabricante do objeto"></td>
                                                    </tr>
                                                    <tr id="tr-descricao"  class="ocultar">
                                                        <th id="th-description" class="th-col1">Descrição:</th>
                                                        <td class="td-col2"><textarea name="" id="id-descricao" cols="" rows="" placeholder="Faça uma breve descrição do objeto"></textarea></td>
                                                    </tr>
                                                    <tr id="tr-enviar">
                                                        <th></th>
                                                        <td><input id="id-input-enviar" type="button" value="Enviar"></td>
                                                    </tr>
                                                </table>
                                            </form>
                                        
                                        </div>
                                    </div>
                                
                            `;

const renderFormItem = () => {
    const fragmentoFormItem = document.createRange().createContextualFragment(htmlComponentFormItem);
    const containerFormItem = document.getElementById('section-form');
    containerFormItem.appendChild(fragmentoFormItem);
}

export default renderFormItem;


