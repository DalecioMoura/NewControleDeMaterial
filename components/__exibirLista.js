
 function exibirLista(lista, msg){

        let textElement = ['#:', 'Código:', 'Tipo:', 'Localização:', 'Nº serie:', 
                            'Modelo:', 'Fabricante:', 'Descrição:', 'Status:'];
    
        let sectioExibirLista = document.getElementById("section-exibir-lista");
        sectioExibirLista.style.display = 'inline-block';
    
        let divPrincipal = document.createElement('div');
        divPrincipal.setAttribute('id', 'exibir-lista-div-principal');
    
        let divButton = document.createElement('div');
        divButton.setAttribute('id', 'div-button');
    
        let btn = document.createElement('button');
        btn.setAttribute('id', 'btn-nova-pesquisa');
        //btn.setAttribute('onclick', 'resetEstado()')
        btn.appendChild(document.createTextNode(msg));
        btn.addEventListener('click', ()=>{resetEstado()});

    
        let titulo = document.createElement('h2');
        titulo.appendChild(document.createTextNode('Lista de Material'));
        divButton.appendChild(btn);
    
        let divCabecalho = document.createElement('div'); 
        divCabecalho.setAttribute('class', 'cabecalho');
        
        divPrincipal.appendChild(divButton);
        divPrincipal.appendChild(titulo);
        divPrincipal.appendChild(divCabecalho);
        
        for(i in textElement){
            let divColuna = document.createElement('div');
            if(textElement[i] === '#:')
                divColuna.setAttribute('id', 'id-col');
            divColuna.setAttribute('class', 'col');
            divColuna.appendChild(document.createTextNode(textElement[i]));
            divCabecalho.appendChild(divColuna);
        }
        for(j in lista){
            let divLinhas = document.createElement('div');
            divLinhas.setAttribute('class', 'linhas');
            for(i in lista[j]){
                let divLinha = document.createElement('div');
                divLinha.setAttribute('class', 'linha');
                if(i === 'st'){
                    let arr = lista[j][i];
                    for(let x in arr){
                        let st = document.createElement('div');
                        st.appendChild(document.createTextNode(arr[x]));
                        divLinha.appendChild(st);
                    }
                    
                }else
                    divLinha.appendChild(document.createTextNode(lista[j][i]));
                divLinhas.appendChild(divLinha);
            }
            divPrincipal.appendChild(divLinhas);
        }
        sectioExibirLista.appendChild(divPrincipal);
    
        document.getElementById('section-form').style.display = 'none';
    }
    
function resetEstado(){
        document.getElementById('section-form').style.display='block';
        document.getElementById('section-exibir-lista').style.display='none';
        let divPrincipal = document.getElementById('exibir-lista-div-principal');
        divPrincipal.remove();
    }

    export default {exibirLista, resetEstado };


    