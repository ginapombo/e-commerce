const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}


//Function para obtener el usuario guardado
function getUser(){
  let usuario = localStorage.getItem('user');                      //Con la variable usuario, y desde localStorage.getItem obtengo 'user'
  if((usuario !==undefined) && (usuario !=='')){                   //Verifico si usuario no está undefinded ó vacío
    document.getElementById("nombreUsuario").innerHTML += usuario; //Muesto el usuario guardado con Id 'nombreUsuario' en la barra nav
  }
}

document.addEventListener("DOMContentLoaded", function(e){//Llamo getUser dentro de addEventListener de DOMContentLoaded para que la muestre luego que cargue el modelo DOM
  getUser(); 
})

//Function para borrar el usuario
function eraseUser(){
  let usuario = localStorage.getItem('user');      //Creo la variable usuario y desde localStorage obtengo 'user'
  if((usuario !==undefined) && (usuario !=='')){   //Verifico si usuario no está undefinded ó vacío
    localStorage.removeItem('user')                //Remuevo 'user'
    window.location.href = "login.html"            //Redirijo la página a login.html
  }
}

document.getElementById("signOut").addEventListener("click", function(){ //Llamo la función con su Id al hacer click sobre el botón y remuevo usuario y redirijo la página
  eraseUser();
})
