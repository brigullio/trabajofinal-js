document.addEventListener("DOMContentLoaded", () => {

const noticias = document.getElementById("dataJson");

const xhr = new XMLHttpRequest();

xhr.open("GET", "../json/novedades.json", true);

xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) { // petición terminada
    if (xhr.status === 200) { // OK
      try {
        const data = JSON.parse(xhr.responseText);
        
        data.forEach(noticia => {
          const bloque = document.createElement("div"); //para cada noticia, creamos un div con class "noticia"
          bloque.classList.add("noticia");
          bloque.innerHTML = `
            <div class="noticiaTitulo">
              <img src="assets/calendario.png" width="35px" height="35px">
              <h3>${noticia.titulo}</h3>
            </div>
            <small>${noticia.fecha}</small>
            <p>${noticia.contenido}</p>
          `;
          noticias.appendChild(bloque); //lo agregamos al div "data json" que tenemos en el html
        });
      } catch (e) {
        console.error("Error al cargar JSON", e);
      }
    } else {
      console.error("Error al cargar las noticias. Status:", xhr.status);
    }
  }
}
xhr.send();
});