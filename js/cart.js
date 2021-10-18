let cartProducts = []; //Variable global

function subtotalSuma(){
  var suma = 0
  for(let i=0; i<cartProducts.articles.length; i++){
    var subtotal = parseFloat(document.getElementById("subtotal"+i).innerHTML);
    suma += subtotal;
  }
  document.getElementById("subtotal").innerHTML = suma
  document.getElementById("totalFinal").innerHTML = parseFloat(document.getElementById("subtotal").innerHTML) + parseFloat(document.getElementById("envio").innerHTML)
}


function subtotalCost(id){ //Subtotal de la compra de ese artículo en tiempo real al modificar input. 
  var amount = document.getElementById(id).value;

  if(amount<1){ //Para mostrar la mínima cantidad del producto y su precio
    amount=1
    document.getElementById(id).value = 1
  }

  var subtotal = amount*currencyExchange(id); //Multiplico por la función que ya tiene el cambio de moneda
  document.getElementById("subtotal"+id).innerHTML = subtotal;
  subtotalSuma();
}

function currencyExchange(i){ //Cambio de moneda
  if(cartProducts.articles[i].currency === 'USD'){
    return cartProducts.articles[i].unitCost*40;
  }else{
    return cartProducts.articles[i].unitCost;
  }  
}

function showCart(){
  let html = "";
  for (let i=0; i<cartProducts.articles.length; i++) {
    var cart = cartProducts.articles[i];
    var price = currencyExchange(i); //Le paso a esta función la posición que está recorriendo el for, si es usd hago el cambio de moneda
    var subtotal = price * cart.count;
//Genero el html
    html = `
    <tr>
    <td><img src="${cart.src}" class="img-fluid" style="max-width:50px!important"></td>
    <td>${cart.name}</td>
    <td>${cart.currency} ${cart.unitCost}</td>
    <td><input type="number" min="1" class="text-center" onchange="subtotalCost(${i})" value="${cart.count}" name="" id="${i}"></td> 
    <td id="subtotal${i}">${subtotal}</td>
  </tr> `;
  document.getElementById("bodyTable").innerHTML += html; //Con id"bodyTable" inserto en mi contenedor el html creado
  }
}

//Creo id="${i}" para los input y id="subtotal${i}" para el subtotal asi tienen id únicos y puedo acceder a ellos
//El atributo onchange se dispara en el momento que se cambia el valor del elemento
//Según el id que me pase onchange, conecto con ese id el input y el subtotal


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      cartProducts = resultObj.data; 
      showCart(cartProducts);
      subtotalSuma();
    }
  });
});
  

  
  