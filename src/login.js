window.onload = function(e) {

    var btnEntrar = document.getElementById("btnEntrar");

    var txtEmail = document.getElementById("txtEmail");

    var txtSenha = document.getElementById("txtSenha");

    txtEmail.focus();

    btnEntrar.onclick = function(e) {

        e.preventDefault();

        var email = txtEmail.value;

        var senha = txtSenha.value;

        if(email == "") {

            exibirMsgErro("Campo E-mail obrigatório");

        }else if(senha == "") {

            exibirMsgErro("Campo Senha obrigatório");

        }else {

            realizarLogin(email, senha);

        }

    }

    function exibirMsgErro(mensagem) {

        var spnErro = document.getElementById("spnErro");

        spnErro.innerText = mensagem;

        spnErro.style.display = "block";

        setTimeout (function () {

            spnErro.style.display = "none";

        }, 5000);

    }

    function realizarLogin(email, senha) {

        var data = JSON.stringify({

            "email": email,
            "senha": senha

        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                var loginResult = JSON.parse(this.responseText);

                if (loginResult.sucesso) {

                    localStorage.setItem("usuarioGuid", loginResult.usuarioGuid);

                    alert("Login realizado com sucesso");

                    window.location.href = "home.html";

                }
                else {

                    exibirMsgErro(loginResult.msg);

                }
                
            }
        });

        xhr.open("POST", "https://localhost:44334/api/usuario/login");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);

    }

}