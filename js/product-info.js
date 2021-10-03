//Muestro Imágenes en Carousel
var imagenes = [
  "img/prod1_1.jpg",
  "img/prod1.jpg",
  "img/prod1_2.jpg",
  "img/prod1_3.jpg",
  "img/prod1_4.jpg",
];
var slides = "";
var i = 0;
imagenes.forEach((elemento) => {  //Con forEach ejecuto la función por cada elemento presente en el array
  if (i == 0) {
    slides +=
      "<div class='carousel-item active'>  <img class='dblock w-100'  src=" + elemento + " alt='" + elemento + "' width=100 height=300> </div>";
  } else {
    slides +=
      "<div class='carousel-item '>  <img class='dblock w-100'  src=" + elemento + " alt='" + elemento + "' width=100 height=300> </div>";
  }
  i++;
});
document.getElementById("infoImages").innerHTML = slides;


//Muestro info de Producto

var info = {};

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      info = resultObj.data;

      let infoNameHTML = document.getElementById("infoName");
      let infoDescriptionHTML = document.getElementById("infoDescription");
      let infoSoldCountHTML = document.getElementById("infoSoldCount");
      let infoCostHTML = document.getElementById("infoCost");
      let infoCurrencyHTML = document.getElementById("infoCurrency");
      let infoCategoryHTML = document.getElementById("infoCategory");

      infoNameHTML.innerHTML = info.name;
      infoDescriptionHTML.innerHTML = info.description;
      infoSoldCountHTML.innerHTML = info.soldCount;
      infoCostHTML.innerHTML = info.cost;
      infoCurrencyHTML.innerHTML = info.currency;
      infoCategoryHTML.innerHTML = info.category;
    }
  });
});

//Productos Relacionados
let products = [];   //Declaro una variable global

function showRelatedProducts(array){
  let htmlContentToAppend = "";
  for(let i = 0; i < array.length; i++){
    let relatedProducts = products[array[i]];
  //Genero el html
    htmlContentToAppend += `               
                  <div class="card" style="width: 18rem;">
                    <img src="` + relatedProducts.imgSrc + `" class="card-img-top" alt="...">
                    <div class="card-body">
                     <h5 class="card-title">` + relatedProducts.name + `</h5>
                     <p class="card-text">` + relatedProducts.description + `</p>
                     <small>` + relatedProducts.soldCount + ` vendidos </small>
                    </div>
                  </div>`

    document.getElementById("relatedProducts").innerHTML = htmlContentToAppend; //Inserto en mi contenedor con id "relatedProducts", el html creado 
  }
}

document.addEventListener("DOMContentLoaded", function(e){ //Cuando termina de cargar la página luego de DOMContentLoaded..
  getJSONData(PRODUCTS_URL)                                //..carga datos del json
  .then(resultObj=>{                                       //Proceso la respuesta
    if(resultObj.status === "ok"){                         //Si esta todo "ok"..
      products = resultObj.data;                           //..cargo los datos en mi variable 
      let related = info.relatedProducts;                  //En la variable related cargo sólo los productos relacionados que estan en info
      showRelatedProducts(related); 
    }
  });
});