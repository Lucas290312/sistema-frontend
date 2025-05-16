window.onload = function(e) {

    var btnCadastrar = document.getElementById("btnCadastrar");

    var txtNome = document.getElementById("txtNome");

    var txtSobrenome = document.getElementById("txtSobrenome");

    var txtTelefone = document.getElementById("txtTelefone");

    var slcGenero = document.getElementById("slcGenero");

    var txtEmail = document.getElementById("txtEmail");

    var txtSenha = document.getElementById("txtSenha");

    txtNome.focus();

    btnCadastrar.onclick = function(e) {

        e.preventDefault();

        var nome = txtNome.value;

        var sobrenome = txtSobrenome.value;

        var email = txtEmail.value;

        var telefone = txtTelefone.value;

        var genero = slcGenero.value;

        var senha = txtSenha.value;

        if(nome == "") {

            exibirMsgErro("Campo nome obrigatório");

        }else if(sobrenome == "") {

            exibirMsgErro("Campo sobrenome obrigatório");

        }else if(email == "") {

            exibirMsgErro("Campo email obrigatório");

        }else if(telefone == "") {

            exibirMsgErro("Campo telefone obrigatório");

        }else if(senha == "") {

            exibirMsgErro("Campo senha obrigatório");

        }else {

            cadastrar(nome, sobrenome, telefone, genero, email, senha);

        }

    }

    function exibirMsgErro(mensagem) {

        var spnErro = document.getElementById("spnErro");

        spnErro.innerText = mensagem;

        spnErro.style.display = "block";

        setTimeout(function() {

            spnErro.style.display = "none";

        }, 5000);

    }

    function cadastrar(nome, sobrenome, telefone, genero, email, senha) {

        var data = JSON.stringify({
            "nome": nome,
            "sobrenome": sobrenome,
            "telefone": telefone,
            "genero": genero,
            "email": email,
            "senha": senha
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                var result = JSON.parse(this.respondeText);

                if (result.sucesso) {

                    localStorage.setItem("usuarioGuid", result.usuarioGuid);
                    window.location.href = "home.html";

                }
                else {

                    exibirMsgErro(result.mensagem);

                }
                
            }
        });

        xhr.open("POST", "https://localhost:44334/api/usuario/cadastro");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);

    }

}