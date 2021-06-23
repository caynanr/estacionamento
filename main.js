// pegas os dados dos inputs a cada clique [x]
// colocalos dentro de uma Array [x]
// com os dados na array criar um novo Element para cada [x]
// colocar esse elemente dentro do tabela [x]
// n permitir ir sem os dois dados de modelo e placa [x]

//eu vou conseguir cadastrar o carro [x]
//apagar e atualizar a lista de carros dentro do estacionamento [x]
//passar o index junto num dataset e onclick(index) e pegar de volta no click[x]
//salvar e ler os dados no localStorage[x]
//verificar se a placa ta no padrão pra aceitar ser salva[x]
//limpar placa para tirar qualquer caracter especial com regexp[]
// contar o tempo do carro no estacionamento[]

const form = document.querySelector(".form");
const btnCadastro = document.querySelector(".btn-cadastro");
const tabela = document.querySelector(".table tbody");

// const carros = [];
const garage = localStorage.garage ? JSON.parse(localStorage.garage) : [];

function deletarCarro(index) {
  // carros.splice(index, 1);
  garage.splice(index, 1);
  localStorage.garage = JSON.stringify(garage);
  reload();
}

function adicionarCarroArray(carro) {
  // carros.push(carro);
  garage.push(carro);
  localStorage.garage = JSON.stringify(garage);
  reload();
}

function limparForm() {
  [...form].forEach((item) => (item.value = ""));
}

function renderDom(carros) {
  carros.forEach((carro, index) => {
    const tr = document.createElement("tr");
    tr.dataset.index = index;
    tr.innerHTML = `
    <td>${carro.modelo}</td>
    <td>${carro.placa}</td>
    <td>Tempo</td>
    <td><button onclick="deletarCarro(${index})">x</button></td>`;
    tabela.appendChild(tr);
  });
}

function pegarCarro(event) {
  event.preventDefault();
  const contemDados = form[0].value && form[1].value;
  const regexpPlacaNova = /[a-z]{3}\d{1}[a-z]{1}\d{2}/gi;
  const regexpPlacaAntiga = /\b[a-z]{3}[-. ]?\d{4}/gi;
  const placaNova = form[1].value.match(regexpPlacaNova);
  const placaAntiga = form[1].value.match(regexpPlacaAntiga);

  if (contemDados && (placaNova || placaAntiga)) {
    const modelo = form[0].value;
    const placa = form[1].value;

    adicionarCarroArray({ modelo: modelo, placa: placa });

    limparForm();
  } else {
    alert("Verifique os dados");
    return;
  }
}

btnCadastro.addEventListener("click", pegarCarro);

function reload() {
  tabela.innerHTML = "";
  init();
}

function init() {
  // renderDom(carros);
  renderDom(garage);
}

init();
