
function inicializar(){

    const isLogado = sessionStorage.getItem('token') !== null;

    sessionStorage.setItem('rotaOrigem', window.location.href);
    console.log('rotaOrigem: ',sessionStorage.getItem('rotaOrigem'));

    if(isLogado){
        if(confirm("Deseja Sair?")){
            sessionStorage.clear();
            alert('Você saiu do sistema!');            
            sessionStorage.setItem('mostarFormLogin', 'false');
            window.location.href = '../index.html';
        }
    }
    else{
        console.log('Redirecionando para a página de login...');
        sessionStorage.setItem('mostarFormLogin', 'true');
        window.location.href = '../index.html';
    } 
}

async function fazerLogin(){
    let email   = document.getElementById('id-email').value;
    let senha   = document.getElementById('id-senha').value;

    console.log('email: ',email);
    console.log('senha: ',senha);

    if(!email || !senha){
        alert('Por favor, preencha todos os campos!');
        return;
    }

    console.log('Dados enviados: ',{email, senha});

    try {
        const req = await fetch(`https://backendcomautenticacao.onrender.com/api/login`,{
            method: 'POST',
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({email, senha})
        });

        const res = await req.json();

        if(req.status != 200){
            throw {status: req.status, message: res.message}; //throw new Error(res.message || 'Erro ao fazer login. Tente novamente.');
        }

        const usuarioLogado = res[0];
        const token = res[1];

        console.log('usuarioLogado: ',usuarioLogado);
        console.log('token: ',token);

        sessionStorage.setItem('logado', true);
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('matricula', usuarioLogado.matricula);
        sessionStorage.setItem('nome', usuarioLogado.nome);
        sessionStorage.setItem('apelido', usuarioLogado.apelido);
        sessionStorage.setItem('setor', usuarioLogado.setor);
        sessionStorage.setItem('usuario', usuarioLogado.usuario);
        sessionStorage.setItem('email', usuarioLogado.email);

        alert('Login efetuado com sucesso!');

        console.log('res: ',res);
        console.log('dados do usuário: ',res[0]);
        console.log('token: ',res[1]);

    } catch (error) {
        console.log('Algo deu errado: ',error);
        alert('Erro ao fazer login: '+error.message);
        return;
    }

    document.getElementById('id-email').value   = '';
    document.getElementById('id-senha').value     = '';

    sessionStorage.setItem('mostarFormLogin', 'false');

    window.location.href = sessionStorage.getItem('rotaOrigem') || window.location.href;

}

export {fazerLogin, inicializar};


