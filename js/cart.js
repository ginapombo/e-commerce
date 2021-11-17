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
    <td><button type="button" class="btn btn-dark"><i class="fas fa-trash"></i></td>
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
  
//Función para mostrar en el modal el formulario de pagar con tarjeta
function formTarjeta(){
  document.getElementById("formTarjeta").style.display = 'block'; //Muestro el form de pagar con tarjeta
  document.getElementById("formTransferencia").style.display = 'none'; //Oculto el form de pagar con transferencia bancaria

  document.getElementById("nroCuenta").disabled = true; //Inhabilito campo de nro de cuenta

  document.getElementById("nroTarjeta").disabled = false; //Habilito todos los campos del form para pagar con tarjeta
  document.getElementById("titular").disabled = false;
  document.getElementById("cvv").disabled = false;
  document.getElementById("caducidad").disabled = false;
};

//Función para mostrar en el modal el formulario de pagar con transferencia bancaria
function formTransferencia(){
  document.getElementById("formTarjeta").style.display = 'none'; //Oculto el form de pagar con tarjeta
  document.getElementById("formTransferencia").style.display = 'block'; //Muestro el form de pagar con transferencia bancaria

  document.getElementById("nroTarjeta").disabled = true;//Inhabilito campos del form para pagar con transferencia bancaria
  document.getElementById("titular").disabled = true;
  document.getElementById("cvv").disabled = true;
  document.getElementById("caducidad").disabled = true;

  document.getElementById("nroCuenta").disabled = false; //Habilito todos los campos del form para pagar con transferencia bancaria

};


//Calcular el costo de envío según porcentaje
comissionPercentage = 0;
document.getElementById("premium").addEventListener("change", function(){
  comissionPercentage = 0.15;
  updateTotalCosts();
});

document.getElementById("express").addEventListener("change", function(){
  comissionPercentage = 0.07;
  updateTotalCosts();
});

document.getElementById("standard").addEventListener("change", function(){
  comissionPercentage = 0.05;
  updateTotalCosts();
});


//Función para actualizar los costos de publicación
function updateTotalCosts(){
  let subtotal = parseFloat(document.getElementById("subtotal").innerHTML);
  
  let costoEnvio = subtotal * comissionPercentage;
  document.getElementById("envio").innerHTML = costoEnvio;

  let total =  subtotal +  costoEnvio;
  document.getElementById("totalFinal").innerHTML = total;
}


// Deshabilitar el envío de formularios del modal si hay campos no válidos
(function() {
  'use strict';
  window.addEventListener('load', function() {
// Obtener todos los formularios a los que queremos aplicar estilos de validación
    var forms = document.getElementsByClassName('needs-validation');
// Bucle sobre ellos y evitar la presentación
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();


function validarCompra() {
  if (document.getElementById("tarjeta").checked) {
      let tarjeta = document.getElementById("nroTarjeta").value;
      let titular = document.getElementById("titular").value;
      let cvv = document.getElementById("cvv").value;
      let caducidad = document.getElementById("caducidad").value;

      if ((tarjeta != "") && (titular != "") && (caducidad != "") && (cvv != "")){
          alert("Compra finalizada con éxito!");
          return true
      } else {
          alert("Completar campos de tarjeta");
          return false;
      }
  } else if(document.getElementById("transferencia").checked) {
       let nrocuenta = document.getElementById("nroCuenta").value;
       if (nrocuenta != ""){
              alert("Compra finalizada con éxito!");
              return true
       } else {
          alert("Completar campos de transferencia");
          return false;   
       }
  } else if (!(document.getElementById("tarjeta").checked || document.getElementById("transferencia").checked)){
      alert("Seleccionar forma de pago");
      return false;
  }    
}

function habilitarCompra(){
   if (document.getElementById("tarjeta").checked) {
      let tarjeta = document.getElementById("nroTarjeta").value;
      let titular = document.getElementById("titular").value;
      let cvv = document.getElementById("cvv").value;
      let caducidad = document.getElementById("caducidad").value;

      if ((tarjeta != "") && (titular != "") && (caducidad != "") && (cvv != "")){
          //jquery
         $("#exampleModal").modal('hide');
      }
  } else if(document.getElementById("transferencia").checked) {
       let nrocuenta = document.getElementById("nroCuenta").value;
       if (nrocuenta != ""){
          //jquery
         $("#exampleModal").modal('hide');
       }
  }
  return false;
}