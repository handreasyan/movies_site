const genresContent = document.querySelector(".all_genres");
const forPresentFilms = document.querySelector(".all_films");
findWithGenreID(null, 1);
// get All genres
function fillGenresCont() {
  fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=533c699d20160f1793f6b6802001b0ed
       `
  )
    .then((response) => response.json())
    .then((data) => {
      const result = data;
      result["genres"].forEach((obj) => {
        const span = document.createElement("span");
        span.classList.add("genre_type");
        span.setAttribute("data-genre-id", obj.id);
        span.innerHTML = obj.name;
        genresContent.append(span);
      });

      genresContent.addEventListener("click", (event) => {
        if (event.target.dataset.genreId) {
          findWithGenreID(event.target.dataset.genreId, 1);
        }
      });
    })
    .catch((e) => {
      console.log(e);
    });
}
fillGenresCont();
function findWithGenreID(id, pageNumber) {
  let url;
  if (id) {
    url = `https://api.themoviedb.org/3/discover/movie?with_genres=${id}&page=${pageNumber}&api_key=533c699d20160f1793f6b6802001b0ed
      `;
  } else {
    url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=${pageNumber}&api_key=533c699d20160f1793f6b6802001b0ed
      `;
  }
  forPresentFilms.innerHTML = "";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const result = data;

      forPresentFilms.addEventListener("click", (event) => {
        if (event.target.dataset.movieId) {
          window.goToMoviePage(event.target.dataset.movieId);
        }
      });
      result.results.forEach((el) => {
        forPresentFilms.append(renderFilmContent(el));
      });
      const btn = document.createElement("button");
      btn.innerHTML = "Next Page";
      btn.classList.add("nextButton");
      btn.addEventListener("click", () => {
        if (id) {
          console.log("if");
          findWithGenreID(id, ++pageNumber);
        } else {
          console.log("else");
          findWithGenreID(null, ++pageNumber);
        }
      });
      forPresentFilms.append(btn);
    })
    .catch((e) => {
      console.log(e);
    });
}

function renderFilmContent(obj) {
  const coverSpan = document.createElement("span");
  coverSpan.setAttribute("data-movie-id", obj.id);
  coverSpan.classList.add("coverSpan");

  const div = document.createElement("div");
  div.classList.add("film");
  let image = "",
    title = "",
    desc = "";
  if (obj.poster_path) {
    image = obj.poster_path;
  } else if (obj.backdrop_path) {
    image = obj.backdrop_path;
  } else {
    image =
      "https://i.pinimg.com/originals/25/b5/04/25b5040ce35ef0dad4630a17d615c614.jpg";
  }
  if (obj.title) {
    title = obj.title;
  }
  if (obj.overview) {
    desc = obj.overview;
    if (desc.length > 120) {
      desc = desc.substr(0, 120) + " . . .";
    }
  }
  div.innerHTML = `
                   <div class="film_image">
                      <img src="https://image.tmdb.org/t/p/w500${image}" alt="Film" />
                   </div>
                   <div class="film_name">
                      <h2>${title}</h2>
                   </div>
                   <div class="film_desc">
                      <p>
                        ${desc}
                      </p>
                   </div>
    `;
  div.append(coverSpan);
  return div;
}
