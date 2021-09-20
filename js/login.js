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

function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    }

});
//Function para guardar el usuario
function setUser(){
	let usuario = document.getElementById('usuario').value; //Obtengo datos del usuario por su Id
	localStorage.setItem('user', usuario); //Guardo el dato usuario como 'user'
}
