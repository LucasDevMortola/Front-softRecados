//Apontar para os elementos do HTL
let descricao = document.querySelector("#r_descricao");
let detalhe = document.querySelector("#r_detalhe");
let salvar = document.querySelector("#btnSalvar");
let table = document.querySelector("#tbody");
let rigister = document.querySelector("#tabele-recados");
let alertRecado = document.querySelector("#alertRecadoCadastrado");
let impModalDesc = document.querySelector("#inputDesc");
let impModalDet = document.querySelector("#inputDet");
let url = "https://apprecadorgrow.herokuapp.com/";

let arrayColid = [];
let modalEditar = new bootstrap.Modal(document.getElementById("modal"));

let i = numMaxRecados();
salvar.addEventListener("click", (event) => {
  numMaxRecados();
  let task = {
    numTask: 0,
    descTask: "",
    detTask: "",
  };
  i++;
  task.numTask = i;
  task.descTask = descricao.value;
  task.detTask = detalhe.value;

  axios
    .post(`${url}recados/inserir`, {
      detalhe: task.descTask,
      descricao: task.detTask,
    })
    .then(
      (alertRecado.style.display = "block"),
      setTimeout(function () {
        alertRecado.style.display = "none";
      }, 2000)
    )
    .then((res) => {
      //Apontar para os elementos
      let linha = document.createElement("tr");
      let id = document.createElement("td");
      let coldesc = document.createElement("td");
      let coldetalhe = document.createElement("td");

      let bodyTable = document.querySelector("#tbody");
      //Setar os valores
      id.innerHTML = task.numTask;
      coldesc.innerHTML = task.descTask;
      coldetalhe.innerHTML = task.detTask;

      linha.appendChild(id);
      linha.appendChild(coldesc);
      linha.appendChild(coldetalhe);
      linha.appendChild(creaButtonApagar());
      linha.appendChild(creaButtonEditar());

      bodyTable.appendChild(linha);
      location.reload();
    });
});

window.addEventListener("load", (event) => {
  axios
    .get(`${url}recados`)
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        let bodyTable = document.querySelector("#tbody");
        //Popular a tabela
        let linha = document.createElement("tr");
        let colId = document.createElement("td");
        let dvb = document.createElement("div");
        dvb.id = "divBtn";
        dvb.style.display = "flex";
        dvb.style.justifyContent = "center";
        colId.innerHTML = data[i].id;
        arrayColid.push(colId);
        linha.appendChild(colId);

        let coldesc = document.createElement("td");
        coldesc.innerHTML = data[i].descricao;
        linha.appendChild(coldesc);

        let colDet = document.createElement("td");
        colDet.innerHTML = data[i].detalhe;
        linha.appendChild(colDet);

        let colAcao = document.createElement("td");
        // criação dos botoes

        dvb.appendChild(creaButtonApagar());
        dvb.appendChild(creaButtonEditar());

        colAcao.appendChild(dvb);
        linha.appendChild(colAcao);

        bodyTable.appendChild(linha);
      }
    });
});

function numMaxRecados() {
  axios
    .get(`${url}recados`)
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      return data.length;
    });
}

//CRria o botao apagar da tabela
function creaButtonApagar() {
  let btnApagar = document.createElement("button");
  btnApagar.innerHTML = "Apagar";
  btnApagar.className = "btn btn-danger btn-rec";
  btnApagar.style.background = "#d9534f";

  btnApagar.addEventListener("click", function (event) {
    let btnReturn = event.target;
    let div = btnReturn.parentNode;
    let col = div.parentNode;
    let linha = col.parentNode;
    let num = linha.children[0].innerHTML;
    console.log(num);

    axios.delete(`${url}recados/apagar/${num}`).then(() => {
      location.reload();
    });
  });
  return btnApagar;
}

let btnModalSalvar = document.querySelector("#btnSalvarModal");

//Cria o botao Editar da tabela
function creaButtonEditar() {
  let btnEditar = document.createElement("button");
  btnEditar.innerHTML = "Editar";
  btnEditar.className = "btn btn-success btn-rec";
  btnEditar.style.background = "#5cb85c";
  btnEditar.id = "btnEditarTable";

  btnEditar.addEventListener("click", (event) => {
    modalEditar.show();
    let btnReturn = event.target;
    let div = btnReturn.parentNode;
    let col = div.parentNode;
    let linha = col.parentNode;

    btnModalSalvar.addEventListener("click", (event) => {
      if (impModalDesc.value != "" && impModalDet.value != "") {
        // linha.children[1].innerHTML = impModalDesc.value;
        // linha.children[2].innerHTML = impModalDet.value;
        // impModalDet.value = "";
        // impModalDesc.value = "";
        let num = linha.children[0].innerHTML;
        console.log(num);
        axios
          .put(`${url}recados/alterar/${num}`, {
            detalhe: impModalDet.value,
            descricao: impModalDesc.value,
          })
          .then(() => {
            location.reload();
          });
      } else {
        alert("Campos não podem estar vazios");
      }
    });
  });
  return btnEditar;
}
