function save(){
    let datos={
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        edad: document.getElementById("edad").value,
        telefono: document.getElementById("telefono").value,
    }
    localStorage.setItem("perfil", JSON.stringify(datos));
}
    document.getElementById("guardar").addEventListener("click", function(e){
        save();
    })

    document.addEventListener("DOMContentLoaded", function(e){
        let datoslocal= JSON.parse(localStorage.getItem("perfil"));
        document.getElementById("nombre").value = datoslocal.nombre;
        document.getElementById("apellido").value = datoslocal.apellido;
        document.getElementById("edad").value = datoslocal.edad;
        document.getElementById("telefono").value = datoslocal.telefono;
    })



