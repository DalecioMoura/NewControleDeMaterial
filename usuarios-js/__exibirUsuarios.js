function exibirUsuarios(lista, msg){
    console.log(lista);
    let textElement = ['#','Matricula','Nome','apelido', 'Setor', 'E-mail', 'Usuario'];
    let sectionListarUsuarios = document.getElementById('section-exibir-usuarios');
    sectionListarUsuarios.style.display = 'inline-block';

    let divPrincipal = document.createElement('div');
    divPrincipal.setAttribute('id', 'exibir-usuarios-div-principal');

    let divButton = document.createElement('div');
    divButton.setAttribute('id', 'div-button');

    let btn = document.createElement('button');
    btn.setAttribute('id', 'btn-novo-evento');
    btn.setAttribute('onclick', 'resetarEstado()');
    btn.appendChild(document.createTextNode(msg));
    divButton.appendChild(btn);

    let titulo = document.createElement('h2');
    titulo.appendChild(document.createTextNode('Lista de Usuários'));

    let divCabecalho = document.createElement('div');
    divCabecalho.setAttribute('class', 'cabecalho');

    divPrincipal.appendChild(divButton);
    divPrincipal.appendChild(titulo);
    divPrincipal.appendChild(divCabecalho);

    for(i in textElement){
        let divColuna = document.createElement('div');
        if(textElement[i] === '#')
            divColuna.setAttribute('id', 'id-col');
        divColuna.setAttribute('class', 'col');
        divColuna.appendChild(document.createTextNode(textElement[i]));
        divCabecalho.appendChild(divColuna);
    }

    for(let i in lista){
        let divLinhas = document.createElement('div');
        divLinhas.setAttribute('class', 'linhas');

        for( let j in lista[i]){
            let divLinha = document.createElement('div');
            divLinha.setAttribute('class', 'linha');
            if(j === 'id')
                divLinha.setAttribute('id', 'id-linha');
            divLinha.appendChild(document.createTextNode(lista[i][j]));
            divLinhas.appendChild(divLinha);
        }
        divPrincipal.appendChild(divLinhas);
    }

    sectionListarUsuarios.appendChild(divPrincipal);

    document.getElementById('section-form').style.display = 'none';
}

function resetarEstado(){
    document.getElementById('section-form').style.display = 'block';
    document.getElementById('section-exibir-usuarios').style.display = 'none';
    let divPrincipal = document.getElementById('exibir-usuarios-div-principal');
    divPrincipal.remove();
}