/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/carros';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.carro.forEach(item => insertList(item.modelo, item.placa, item.valor, item.cor, item.ano))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputModel, inputPlate, inputPrice, inputColor, inputYear) => {
  const formData = new FormData();
  formData.append('modelo', inputModel);
  formData.append('placa', inputPlate);
  formData.append('valor', inputPrice);
  formData.append('cor', inputColor);
  formData.append('ano', inputYear);

  let url = 'http://127.0.0.1:5000/carro';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[1].innerHTML
      if (confirm("Você deseja remover o item da lista?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/carro?placa=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com modelo, placa, valor, cor e ano 
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputModel = document.getElementById("newModel").value;
  let inputPlate = document.getElementById("newPlate").value;
  let inputPrice = document.getElementById("newPrice").value;
  let inputColor = document.getElementById("newColor").value;
  let inputYear = document.getElementById("newYear").value;

  if (inputModel === '') {
    alert("Escreva o modelo de um carro!");
  } else if (isNaN(inputPrice) || isNaN(inputYear)) {
    alert("Quantidade e valor precisam ser números!");
  } else {
    insertList(inputModel, inputPlate, inputPrice, inputColor, inputYear)
    postItem(inputModel, inputPlate, inputPrice, inputColor, inputYear)
    alert("Carro adicionado!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (nameModel, plate, price, color, year) => {
  var item = [nameModel, plate, price, color, year]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newModel").value = "";
  document.getElementById("newPlate").value = "";
  document.getElementById("newPrice").value = "";
  document.getElementById("newColor").value = "";
  document.getElementById("newYear").value = "";

  removeElement()
}