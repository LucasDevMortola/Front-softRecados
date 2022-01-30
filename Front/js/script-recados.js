let descricao = document.querySelector("#r_descricao");
let detalhe = document.querySelector("#r_detalhe");
let salvar = document.querySelector("#btnSalvar");
let table = document.querySelector("#tbody");
let rigister = document.querySelector("#tabele-recados");
let alertRecado = document.querySelector("#alertRecadoCadastrado");
let impModalDesc = document.querySelector("#inputDesc");
let impModalDet = document.querySelector("#inputDet");


let url ="https://apprecados.herokuapp.com/";

let contador = 0;
let arrayColid = [];
let modalEditar = new bootstrap.Modal(document.getElementById("modal"));

let i = numMaxRecados();

mostraTabela()

async function mostraTabela() {

  await axios.get(`${url}recados`).then((res) => {
    let dados = res.data;


  for (let i = 0; i < dados.length; i++) {
    contador++;
    let bodyTable = document.querySelector("#tbody");


    //Popular a tabela
    let linha = document.createElement("tr");
    let colId = document.createElement("td");
    let dvb = document.createElement("div");
    dvb.id = "divBtn";
    dvb.style.display = "flex";
    dvb.style.justifyContent = "center";
    colId.innerHTML = contador;
    arrayColid.push(colId);
    linha.appendChild(colId);
    let id = dados[i].uid;

    let coldesc = document.createElement("td");
    coldesc.innerHTML = dados[i].descricao;
    linha.appendChild(coldesc);

    let colDet = document.createElement("td");
    colDet.innerHTML = dados[i].detalhe;
    linha.appendChild(colDet);

    let colAcao = document.createElement("td");
    // criação dos botoes

    let btnEditar = document.createElement("button")
    btnEditar.innerHTML = "Editar";
    btnEditar.className = "btn btn-success btn-rec";
    btnEditar.style.background = "#5cb85c";
    btnEditar.setAttribute("onclick", `editar("${id}")`)
    dvb.appendChild(btnEditar);


    let btnApagar = document.createElement("button")
    btnApagar.innerHTML = "Apagar";
    btnApagar.className = "btn btn-danger btn-rec";
    btnApagar.style.background = "#d9534f";
    btnApagar.setAttribute("onclick", `apagar("${id}")`)

    dvb.appendChild(btnApagar);
    dvb.appendChild(btnEditar);


    colAcao.appendChild(dvb);
    linha.appendChild(colAcao);

    bodyTable.appendChild(linha);
  }
})
}


async function apagar(uid) {
  console.log(uid)
  await axios.delete(`${url}recados/${uid}`)
    .then(setTimeout(function () {
        location.reload()
      }, 2000))

}

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
    .post(`${url}recados`, {
      detalhe: task.descTask,
      descricao: task.detTask,
    })
    .then(
      (alertRecado.style.display = "block"),
      setTimeout(function () {
        location.reload()
      }, 2000)
    )
    

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



let btnModalSalvar = document.querySelector("#btnSalvarModal");



  function editar(id) {

    modalEditar.show();
    editarLinha(id)
  };
 function editarLinha(uid){

  btnModalSalvar.addEventListener("click", (event) => {
    if (impModalDesc.value != "" && impModalDet.value != "") {
      axios
        .put(`${url}recados/${uid}`, {
          descricao: impModalDesc.value,
          detalhe: impModalDet.value
        })
        .then(() => {
          location.reload();
        });
    } else {
      alert("Campos não podem estar vazios");
    }
  });
 }
  