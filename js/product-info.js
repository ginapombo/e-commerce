var info = {};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            info = resultObj.data;

            let infoNameHTML  = document.getElementById("infoName");
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