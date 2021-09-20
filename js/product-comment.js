var comments = [];

function saveComment() {
  let date = new Date(); //Obtengo fecha del momento - un nuevo objeto del tipo fecha
  let formatDate =
    date.getDate().toString().padStart(2, "0") +
    "/" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    date.getFullYear().toString() +
    "  " +
    date.getHours() +
    ":" +
    date.getMinutes();
  comment = {
    //Creo el objeto comment
    message: document.getElementById("message").value,
    completeDate: formatDate,
    score: document.getElementById("score").value,
    user: localStorage.getItem("user"),
  };
  comments.push(comment); //Agrego el objeto a la lista
  showComment(); // Muestro
}

function drawStars(stars) {
  let number = parseInt(stars); // Un número texto lo paso a entero
  let html = ""; //Declaro variable para llenar un html
  for (let i = 1; i <= number; i++) {
    html += `<span class="fa fa-star checked"></span>`;
  }
  for (let j = number + 1; j <= 5; j++) {
    //Hago otro for para que no me pinte el resto de las stars
    html += `<span class="fa fa-star"></span>`;
  }
  return html;
}

function showComment() {
  let html = "";
  for (let i = comments.length - 1; i >= 0; i--) {
    //Recorro la lista
    let comment = comments[i];
    html +=
      `
        <div class="card">
  <h5 class="card-header">` +
      drawStars(comment.score) +
      `</h5>
  <div class="card-body">
    <h5 class="card-title">` +
      comment.user +
      `</h5>
    <p class="card-text">` +
      comment.message +
      `</p>
    <p class="card-text text-muted">` +
      comment.completeDate +
      `</p>
  </div>
</div>
                `;
  }
  document.getElementById("comentarios").innerHTML = html;
  document.getElementById("formulario").reset(); //Limpio los campos ingresados
}

function productsInfoComments() {
  let htmlContentToAppend = "";
  for (let i = 0; i < commentArray.length; i++) {
    let comment = commentArray[i];
    htmlContentToAppend +=
      `
        <div class="card">
  <div class="card-header">` +
      drawStars(comment.score) +
      `</div>
  <div class="card-body">
    <h5 class="card-title">` +
      comment.user +
      `</h5>
    <p class="card-text">` +
      comment.description +
      `.</p>
    <p class="card-text text-muted">` +
      comment.dateTime +
      `</p>
  </div>
</div>
            `;
  }

  document.getElementById("comment-products").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      commentArray = resultObj.data;

      productsInfoComments();
    }
  });
});
