/* <ul>
<li>Llamamos al search button, generando un listener, al hacer click (evento con el nombre searchMovies)</li> 
<li>se arma la funcion del evento creado searchMovies</li>
<li>se hace un fetch, donde se genera un enlace dinamico con la query y la api </li>
<li>se arman las respuestas, donde primero se pide la info, y luego se genera en donde se va a mostrar, en este caso en la vavriable displayMovies</li>
<li>se crea la funcion displayMovies donde va a mostrar el elemento</li>
<li>primero se genera un condicional que si no hay elementos para buscar se genera un elemento 'P' y se aplica el return (que sirve como else)</li>
<li>caso que se busque algo y haya elementos, se crea un forEach por posibles varios elementos</li>
<li>a cada div se le inserta la <i>class="movie"</i> </li>
<li>se crea los elementos internos (h2, y que contenido va a buscar en la api, ese h2)</li>
<li> luego se une todos los elementos al div padre (movieDiv)</li>
<li>y el div Results, debe entrar en el otro div ya existente en el html para que todo se muestre</li>
<li>se crtea un resultContainer.innerHTML con el texto "cargando", y otro vacio dentro de la funcion de busqueda, paara que mientras busque el elemento aparesca el cartel,
pero una vez encontrado, desapareszca el cartel</li>

</ul>
*/
document.getElementById("searchButton").addEventListener("click", searchMovies);

let api_key = "a7b8e9218ba65539ecf118297e6e7fd1";
let urlBase = "https://api.themoviedb.org/3/search/movie";
let urlImg = "https://image.tmdb.org/t/p/w500";

let resultContainer = document.getElementById("results");

//url original --> 'https://api.themoviedb.org/3/search/movie? query=Jack+Reacher&api_key=a7b8e9218ba65539ecf118297e6e7fd1'
//esta se divide, [url original] + [busqueda o query] + [api key]

function searchMovies() {
  resultContainer.innerHTML = "Cargando...";
  let searchInput = document.getElementById("searchInput").value;

  fetch(`${urlBase}?query=${searchInput}&api_key=${api_key}`)
    .then((response) => response.json())
    .then((response) => displayMovies(response.results));
}

function displayMovies(movies) {
  resultContainer.innerHTML = "";
  if (movies.length === 0) {
    resultContainer.innerHTML =
      "<p> no se encontraron resultados para tu busqueda!</p>";
    return;
  }
  movies.forEach((movie) => {
    let movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");

    let title = document.createElement("h2");
    title.textContent = movie.title;

    let releaseDate = document.createElement("p");
    releaseDate.textContent =
      "la fecha de lanzamiento fue: " + movie.release_date;

    let overview = document.createElement("p");
    overview.textContent = movie.overview;

    let voteAverage = document.createElement("p");
    voteAverage.textContent = "votos: " + Math.floor(movie.vote_average);

    let posterPath = urlImg + movie.poster_path;
    let poster = document.createElement("img");
    poster.src = posterPath;

    movieDiv.appendChild(poster);
    movieDiv.appendChild(title);
    movieDiv.appendChild(releaseDate);
    movieDiv.appendChild(voteAverage);
    movieDiv.appendChild(overview);

    resultContainer.appendChild(movieDiv);
  });
}
