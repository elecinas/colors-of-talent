function saludoBlogNews(saludo) {
  console.log(saludo);
}

//getting json data
//and sending data to loadingFront() function
function readTextFile(data_type) {
  const requestURL = "../json/blog-news-data.json";
  const request = new XMLHttpRequest();
  request.open("GET", requestURL);
  request.responseType = "json";
  request.send();
  request.onload = function () {
    const data = request.response;
    loadingFront(data, data_type); //it calls next function!
  };
}

//selecting data depending on the language selected
//and send data to makingFront() function
function loadingFront(data, data_type) {
  switch (data_type) {
    case "en":
      makingFront(data["en"]);
      break;
    case "es":
      makingFront(data["es"]);
      break;
    case "ca":
      makingFront(data["ca"]);
      break;
    default:
      makingFront(data["es"]);
      break;
  }
}

//for every news it draw a card calling makeCard() function
function makingFront(section_array) {
  var myarray = section_array;
  var search_divisor = parseInt(myarray.length / 9); //cuántas arrays necesitaremos
  var divisor = parseInt(myarray.length / search_divisor); //factor de division
  content_division_array = []; //este array contendrá las otras arrays si es necesario

  if (search_divisor <= 1) {
    //si los elementos son menos de 2*9 los cargamos en una página…
    //… y ocultamos la paginación
    document.getElementById("blog-news-pagination").style.display = "none";
    for (var i = 0; i < myarray.length; i++) {
      makeCard(myarray[i]);
    }
  } else {
    //si son más de 2*9 los dividimos en varios arrays
    for (var i = 0; i < search_divisor; i++) {
      var limit = divisor * (i + 1);
      if (limit == search_divisor * divisor) {
        //al llegar al último array establecemos el límite al final de todo
        limit = myarray.length;
      }
      content_division_array.push(myarray.slice(divisor * i, limit));
    }
    //cargamos solo el primer array en la página
    for (var i = 0; i < content_division_array[0].length; i++) {
      makeCard(content_division_array[0][i]);
    }
    //finalmente cargamos la paginación
    makePagination(1);
  }
}

function makePagination(current_page) {
  paintLiPagination("Previous", current_page, content_division_array.length);
  for (var i = 0; i < content_division_array.length; i++) {
    paintLiPagination(i + 1, current_page, content_division_array.length);
  }
  paintLiPagination("Next", current_page, content_division_array.length);
}

function paintLiPagination(text, current_page, array_length) {
  //buscamos el elemento padre (<ul id="blog-news-pagination-list"></ul>) en el DOM
  var navigation_list = document.getElementById("blog-news-pagination-list");
  //Creamos el elemento  <li class="page-item"></li>
  //y lo colocamos dentro de <ul></ul>
  var liPagination = document.createElement("li");
  liPagination.setAttribute("class", "page-item");
  navigation_list.appendChild(liPagination);

  //Creamos el elemento ><a class="page-link" href="#"></a>
  //Y lo colocamos dentro de <li></li>
  var aPagination = document.createElement("a");

  //comprobamos si los botones de paginación son "previous" o "next"
  switch (text) {
    case "Previous":
      if (current_page === 1) {
        //TODO link inactive
      } else {
        aPagination.setAttribute("onclick", "changePageElements(" + (current_page - 1) + ");");
      }
      break;

    case "Next":
      if (current_page === array_length ) {
        //TODO link inactive
      } else {
        aPagination.setAttribute("onclick", "changePageElements(" + (current_page + 1) + ");");
      }
      break;

    default:
      aPagination.setAttribute("onclick", "changePageElements(" + text + ");");
      break;
  }

  aPagination.setAttribute("class", "page-link");
  //Marcamos el link que corresponde a la página actual
  if(text === current_page){
    aPagination.style.backgroundColor = "#c665db";
  }
  aPagination.setAttribute("href", "#!");
  aPagination.textContent = text;
  liPagination.appendChild(aPagination);
}

function changePageElements(index) {
  //buscamos el padre de cards y las borramos
  var card_columns = document.getElementById("card-container");
  while (card_columns.firstChild) {
    card_columns.removeChild(card_columns.firstChild);
  }
  //buscamos el padre de pagination y borramos la paginacion
  var navigation_list = document.getElementById("blog-news-pagination-list");
  while (navigation_list.firstChild) {
    navigation_list.removeChild(navigation_list.firstChild);
  }
  //cargamos el array que corresponde en la página
  for (var i = 0; i < content_division_array[index - 1].length; i++) {
    makeCard(content_division_array[index - 1][i]);
  }
  //finalmente cargamos la paginación
  makePagination(index);
}

function makeCard(card_data) {
  //buscamos el elemento padre en el DOM
  var card_columns = document.getElementById("card-container");
  //1º CREAR <div> QUE LO ENVUELVE TODO
  //<div class="card"></div>
  var divCard = document.createElement("div");
  divCard.setAttribute("class", "card");
  card_columns.appendChild(divCard);

  //2º METER DENTRO LOS ELEMENTOS HIJOS: <img> Y <div>
  //<img class="card-img-top" src="card_data.img_src" alt="card_data.img_alt" />
  var imgCard = document.createElement("img");
  imgCard.setAttribute("class", "card-img-top");
  imgCard.setAttribute("src", card_data.img_src);
  imgCard.setAttribute("alt", card_data.img_alt);
  divCard.appendChild(imgCard);
  //<div class="card-body"></div>
  var divCardBody = document.createElement("div");
  divCardBody.setAttribute("class", "card-body");
  divCard.appendChild(divCardBody);

  //3º METER DENTRO DE <div class="card-body"> LOS ELEMENTOS p, h5, p, a
  //<p class="blog-card-date"></p>
  var dateCard = document.createElement("p");
  dateCard.setAttribute("class", "blog-card-date");
  dateCard.textContent = card_data.date;
  divCardBody.appendChild(dateCard);
  // <h5 class="card-title blog-card-h5"></h5>
  var titleh5 = document.createElement("h5");
  titleh5.setAttribute("class", "card-title blog-card-h5");
  titleh5.textContent = card_data.title;
  divCardBody.appendChild(titleh5);
  // <p class="card-text blog-card-text"></p>
  var principalText = document.createElement("p");
  principalText.setAttribute("class", "card-text blog-card-text");
  principalText.textContent = card_data.resume;
  divCardBody.appendChild(principalText);
  //<a href="" class="card-link text-primary blog-card-text"></a>
  var aCard = document.createElement("a");
  aCard.setAttribute("href", card_data.link);
  aCard.setAttribute("class", "card-link text-primary blog-card-text");
  aCard.textContent = "Leer más…";
  divCardBody.appendChild(aCard);
}
