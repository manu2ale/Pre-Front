const apiURL = "http://localhost:8080/api/peliculas";
document.addEventListener("DOMContentLoaded", async () => {

// Metodo GET para mostar el listado de Peliculas

        const response = await fetch(apiURL);
        const data = await response.json();
        console.log(data);
        const movies = data;
    let principal = document.querySelector(".movies");

    let cardHTML = "";

    function card(pelicula) {
        return `
    <div class="card border-0 text-bg-dark" style="width: 22rem;">
        <img src=${pelicula.imagen} class="card-img-top border border-4 mt-3" alt="poster" style="width: 12rem; height:16rem; align-self:center;">
        <div class="card-body">
            <h5 class="card-title text-center">${pelicula.titulo}</h5>
        </div>
        <ul class="list-group list-group-flush border border-success">
            <li class="list-group-item">Genero: ${pelicula.genero}</li>
            <li class="list-group-item">Duración: ${pelicula.duracion}</li>
        </ul>
    </div>
    `
    };

    movies.map(pelicula => cardHTML += card(pelicula))
    principal.innerHTML = cardHTML;

// Metodo POST para agregar una nueva Pelicula
    const formAgregarPelicula = document.getElementById('formAgregar');
    formAgregarPelicula.addEventListener('submit', async (e)=> {
        e.preventDefault();
        const formData = new FormData(formAgregarPelicula);
        const titulo = formData.get('titulo');
        const genero = formData.get('genero');
        const duracion = formData.get('duracion');
        const imagen = formData.get('imagen');

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                titulo: titulo,
                genero: genero,
                duracion: duracion,
                imagen: imagen
            })
        };

        const response = await fetch(apiURL,options);
        if (response.status === 201) {
            formAgregarPelicula.reset();
            Swal.fire({
                title: "Película Agregada!",
                icon: "success"
            });
            setTimeout(() => {
                location.reload()
            }, 3600);
        } else {
            Swal.fire({
                title: "Error",
                text: "Algo salió mal",
                icon: "error"
              });
        }
    });
});