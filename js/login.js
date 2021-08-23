function iniciarSesion(){

	let usuario = document.getElementById('usuario').value;
	let password = document.getElementById('password').value;
	
	if ((usuario !=='') && (password !=='')){
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
