
 function exibirLista(lista, msg){

        let textElement = ['#:', 'Código:', 'Tipo:', 'Localização:', 'Nº serie:', 
                            'Modelo:', 'Fabricante:', 'Descrição:', 'Status:'];

        let textClass = ['col-id', 'col-codigo', 'col-tipo', 'col-local', 'col-serie', 
                            'col-modelo', 'col-fabricante', 'col-descricao', 'col-st'];
    
        //Tagg existente no HTML
        let sectioExibirLista = document.getElementById("section-exibir-lista");
        sectioExibirLista.style.display = 'inline-block';
    
            //Div principal que conterá todo o conteúdo
        let divPrincipal = document.createElement('div');
        divPrincipal.setAttribute('id', 'exibir-lista-div-principal');
            
        //Div que conterá o botão de nova pesquisa
        let divButton = document.createElement('div');
        divButton.setAttribute('id', 'div-button');
    
            //Botão de nova pesquisa
        let btn = document.createElement('button');
        btn.setAttribute('id', 'btn-nova-pesquisa');
        //btn.setAttribute('onclick', 'resetEstado()');
        btn.appendChild(document.createTextNode(msg));
    
        //Título da seção
        let titulo = document.createElement('h2');
        titulo.appendChild(document.createTextNode('Lista de Material'));
        divButton.appendChild(btn);
    
        //Div que conterá o cabeçalho da lista
        let divCabecalho = document.createElement('div'); 
        divCabecalho.setAttribute('class', 'cabecalho');
        let divLista = document.createElement('div'); 
        divLista.setAttribute('class', 'cabecalho');
        
        //Adicionando os elementos criados na div principal
        divPrincipal.appendChild(divButton);
        divPrincipal.appendChild(titulo);
        divPrincipal.appendChild(divCabecalho);
        
        //Criando o cabeçalho da lista
        for(let i in textElement){
            let divColuna = document.createElement('div');
            /*if(textElement[i] === '#:')
                divColuna.classList.add('col', 'col-id');*/
            divColuna.classList.add('col', textClass[i]);
            divColuna.appendChild(document.createTextNode(textElement[i]));
            divCabecalho.appendChild(divColuna);
        }

        //Criando as linhas da lista
        for(let j in lista){
            let divLinhas = document.createElement('div');
            divLinhas.setAttribute('class', 'lista');
            let cont = 0;
            for(let i in lista[j]){
                let divLinha = document.createElement('div');
                divLinha.classList.add('col', textClass[cont]);
                console.log('i: ',cont);
                console.log('textoClass: ',textClass[cont]);
                cont++;
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

        let btnNovaPesquisa = document.getElementById('btn-nova-pesquisa');
        btnNovaPesquisa.addEventListener('click', () => {resetEstado();});
    }
    
function resetEstado(){
        document.getElementById('section-form').style.display='block';
        document.getElementById('section-exibir-lista').style.display='none';
        let divPrincipal = document.getElementById('exibir-lista-div-principal');
        divPrincipal.remove();
    }


export {exibirLista};