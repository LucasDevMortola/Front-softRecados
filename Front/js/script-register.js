//Apontar para os elementos
let newUser = document.querySelector("#f_usernameRegister");
let newSenha = document.querySelector("#f_senhaRegister");
let newSenha2 = document.querySelector("#f_senhaRegister2");
let registerBtn = document.querySelector("#btnCad");
let Alertatamanho = document.querySelector("#alertTam");
let divformulario = document.querySelector("#dv-form");
let alertTamSenha = document.querySelector("#alerTamSenha");
let alertCompaSenha = document.querySelector("#alertSenhas");
//Eventos usuario
mudaCorTam(newUser);
verificaTamanho(newUser);

//Eventos Senha
verificaTamSenha(newSenha);
verificaSenha2(newSenha2);

//Eventos btnCadastrar
verificaBtn(registerBtn,newUser,newSenha,newSenha2)
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
        Alertatamanho.style.display = "block";
        setTimeout(function(){
          Alertatamanho.style.display = "none";
        },2000)
      }
    });
  }

  function verificaTamSenha(campo) {
    campo.addEventListener("blur", (event) => {
      if (campo.value.length < 6) {
        alertTamSenha.style.display = "block";
        setTimeout(function(){
          alertTamSenha.style.display = "none";
        },2000)
      }
    });
  }

  function verificaSenha2(campo) {
    campo.addEventListener("blur", (event) => {
      if (campo.value != newSenha.value) {
        alertCompaSenha.style.display = "block";
        setTimeout(function(){
          alertCompaSenha.style.display = "none";
        },2000)
      }
    });
  }


function verificaBtn(btn,usuario, senha1, senha2) {
  btn.addEventListener("click",(event)=>{
    if (usuario.value.length < 6 || senha1.value != senha2.value) {
      alertCompaSenha.style.display = "block";
      setTimeout(function(){
        alertCompaSenha.style.display = "none";
      },2000)
      event.preventDefault();
    }
    else {
      let usuario = {
        nome: "",
        senha: "",
      };
      usuario.nome = newUser.value;
      usuario.senha = newSenha2.value;
  
      localStorage.setItem(usuario.nome, JSON.stringify(usuario));
      newUser.value = "";
      newSenha.value = "";
      newSenha2.value = "";
      
    }
  })
}


