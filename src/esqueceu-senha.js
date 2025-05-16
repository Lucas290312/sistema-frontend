window.onload = function (e) {

    var btnEsqueceuSenha = document.getElementById("btnEsqueceuSenha");

    var txtEmail = document.getElementById("txtEmail");

    txtEmail.focus();

    btnEsqueceuSenha.onclick = function (e) {

        e.preventDefault();

        var email = txtEmail.value;

        if (email == "") {

            exibirMsgErro("Campo E-mail obrigatorio");

        }else {

            descobrirSenha(email);

        }

    }

    function exibirMsgErro(mensagem) {

        var spnErro = document.getElementById("spnErro");

        spnErro.innerText = mensagem;

        spnErro.style.display = "block";

        setTimeout(function () {

            spnErro.style.display = "none";

        }, 5000);
        
    }

    function descobrirSenha(email) {

        var data = JSON.stringify({

            "email": "ludamico29@gmail.com"

        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                var result = JSON.parse(this.responseText);

                if (result.sucesso) {

                    alert("Recuperacao de senha realizado com sucesso");

                }
                else {

                    exibirMsgErro(result.mensagem);

                }

            }
        });

        xhr.open("POST", "https://localhost:44334/api/usuario/esqueceuSenha");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);

    }

}