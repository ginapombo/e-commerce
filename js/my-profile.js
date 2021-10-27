function save(){
    let datos={
        //con el id obtengo lo que se haya ingresado en cada input
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        edad: document.getElementById("edad").value,
        telefono: document.getElementById("telefono").value,
    }
    localStorage.setItem("perfil", JSON.stringify(datos));  
    } 
    //parámetro "perfil" como key ó clave asi recupero los datos en esa clave que defino y en "datos" guardo
    // setItem cuando reciba una clave(perfil) y un valor, añadirá estos a "datos", o actualizará el valor.
    //como localStorage solo guarda tipo de datos simples, con JSON.stringify paso el objeto ó registro a formato json
    document.getElementById("guardar").addEventListener("click", function(e){
        save();
    })
    //al button con id "guardar", le anclo el evento "click" y lo paso a function anónima para que ejecute el código de la función save()

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.    
    document.addEventListener("DOMContentLoaded", function(e){
        let datoslocal= JSON.parse(localStorage.getItem("perfil")); 
        // con getItem recupero los datos guardados en "perfil" y los coloco en cada input
        // obtengo el json guardado y con JSON.parse lo transformo en registro. Asi puedo setear cada propiedad del objeto en los input
        document.getElementById("nombre").value = datoslocal.nombre;
        document.getElementById("apellido").value = datoslocal.apellido;
        document.getElementById("edad").value = datoslocal.edad;
        document.getElementById("telefono").value = datoslocal.telefono;
    })



