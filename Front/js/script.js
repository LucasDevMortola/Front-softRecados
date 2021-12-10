let alertTamSe = document.querySelector("#alerTamSenha");
let alertverifica = document.querySelector("#alertVerifica");
let alertUsuario = document.querySelector("#alertUsuario")
// Validação tela de login

//Apontar para os elementos necessarios
let usuario = document.querySelector("#f_username");
let senha = document.querySelector("#f_senha");
let Enter = document.querySelector("#btn-entrar");

//Eventos usuario
mudaCorTam(usuario);
verificaTamanho(usuario)
verificaTamanho(senha);
verificaBtn(Enter, usuario, senha);

//Funções
function mudaCorTam(usuario) {
  usuario.addEventListener("keyup", (event) => {
    if (usuario.value.length < 6) {
      usuario.style.color = "#d9534f";
    } else {
      usuario.style.color = "#5cb85c";
    }
  });
}

function verificaTamanho(campo) {
  campo.addEventListener("blur", (event) => {
    if (campo.value.length < 6) {
      alertTamSe.style.display = "block";
      setTimeout(function(){
        alertTamSe.style.display = "none";
      },1000)
      
    }
  });
}

function verificaBtn(btn, usuario, senha1) {

  btn.addEventListener("click", (event) => {
    if (usuario.value.length < 6 || senha1.value.length < 6) {
      console.log("Evento não aconteceu");
      alertverifica.style.display = "block";
      setTimeout(function(){
        alertverifica.style.display = "none";
      },1000)

      event.preventDefault();
    } else {
      let nome = JSON.parse(localStorage.getItem(usuario.value));

      if (nome != null && nome.senha != null) {
        Enter.setAttribute("href", "/Front/pages/recados.html");
      } else {
        alertUsuario.style.display = "block";
        setTimeout(function(){
          alertUsuario.style.display = "none";
        },1000)
        event.preventDefault();
      }
    }
  });
}
