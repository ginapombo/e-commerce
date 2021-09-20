const ORDER_ASC_BY_PRICE = "ASC-USD"; //Defino estas variables con sus strings
const ORDER_DESC_BY_PRICE = "DESC-USD";
const ORDER_BY_PROD_COUNT = "RELEVANCIA";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) //Ordeno con el criterio de precio ascendente
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; } 
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){  //Ordeno con el criterio de precio descenente
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){ //Ordeno por relevancia
        result = array.sort(function(a, b) { // array.sort devuelve la lista ordenada y la setea en result
            let aCount = parseInt(a.soldCount); //Defino esta variable con parseInt que toma los parámetros a y b y lo convierte a entero
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; } //Luego de convertirlos ahi si comparo
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result; // Devuelve la lista ordenada
}

function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))) {

            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name +`</h4>
                        <small class="text-muted">` + product.soldCount + ` vendidos</small>
                    </div>
                    <small class="text-muted">` + product.description + ` </small>
                    <br><b class="text-muted">` + product.currency + ` ` + product.cost + `</b>
                </div>
            </div>
            </div>
            `
        }

        document.getElementById("cat-list-products").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, productsArray){ //Llamo a las dos funciones, primero ordeno la lista y luego las muestro
    currentSortCriteria = sortCriteria; //Seteo globalmente el criterio

    if(productsArray != undefined){
        currentProductsArray = productsArray; //Seteo globalmente la lista
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray); //Ordeno esa lista

    //Muestro los productos ordenados
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_PRICE, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){ //Llamo al elemento con su Id al hacer click sobre el botón y muestro los productos segun el criterio
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByCost").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de vendidos por producto.
        minCost = document.getElementById("rangeFilterCountMin").value;
        maxCost = document.getElementById("rangeFilterCountMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }

        showProductsList();
    });
});

