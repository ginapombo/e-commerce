function iniciarSesion(){

	let usuario = document.getElementById('usuario').value;
	let password = document.getElementById('password').value;
	
	if ((usuario !=='') && (password !=='')){
		setUser();  //Luego de validar los datos, queda el usuario guardado en localStorage
		location.href= 'index.html';
	}
	else{
		alert("Debe completar los campos")
	}

}

$(function() {
	'use strict';

	
  $('.form-control').on('input', function() {
	  var $field = $(this).closest('.form-group');
	  if (this.value) {
	    $field.addClass('field--not-empty');
	  } else {
	    $field.removeClass('field--not-empty');
	  }
	});

});
//Function para guardar el usuario
function setUser(){
	let usuario = document.getElementById('usuario').value; //Obtengo datos del usuario por su Id
	localStorage.setItem('user', usuario); //Guardo el dato usuario como 'user'
}
