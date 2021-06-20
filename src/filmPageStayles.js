const countries = {
  zh: "Chinese",
  da: "Danish",
  nl: "Dutch",
  fi: "Finnish",
  fr: "French",
  de: "German",
  it: "Italian",
  ja: "Japanese",
  ko: "Korean",
  no: "Norwegian",
  pt: "Portuguese",
  ru: "Russian",
  es: "Spanish",
  sv: "Swedish",
  th: "Thai",
  ar: "Arabic",
  bg: "Bulgarian",
  hr: "Croatian",
  cs: "Czech",
  en: "English",
  el: "Greek",
  iw: "Hebrew",
  hu: "Hungarian",
  pl: "Polish",
  pt: "Portuguese",
  ro: "Romanian",
  sk: "Slovak",
  sl: "Slovenian",
  tr: "Turkish",
  uk: "Ukrainian",
  vi: "Vietnamese",
  sq: "Albanian",
  af: "Afrikaans",
  am: "Armenian",
  eu: "Basque",
  bs: "osnian",
  bn: "Bengali",
  my: "Burmese",
  ca: "Catalan",
  nl: "Dutch",
  et: "Estonian",
  fa: "Farsi",
  fr: "French'",
  ka: "Georgian",
  gu: "Gujarati",
  haw: "Hawaiian",
  hi: "Hindi",
  is: "Icelandic",
  ga: "Irish",
  it: "Italian",
  kn: "Kannada",
  kk: "Kazakh",
  km: "Khmer",
  lv: "Latvian",
  lt: "Lithuanian",
  lb: "Luxembourgish",
  mk: "Macedonian",
  ms: "Malay",
  ml: "Malayalam",
  mt: "Maltese",
  mr: "Marathi",
  sh: "Montenegrin",
  ro: "Romanian",
  rm: "Romansh",
  sm: "Samoan",
  sr: "Serbian",
  es: "Spanish",
  sw: "Swahili",
  tl: "Tagalog",
  ta: "Tamil",
  te: "Telugu",
  ur: "Urdu",
  cy: "Welsh",
  xh: "Xhosa",
  zu: "Zulu",
};
function renderHTML(obj) {
  const root = document.createElement("div");

  root.classList.add("root");
  let genres = "",
    budget = "",
    homepage = "",
    title = "",
    countryes = "",
    releaseDate = "",
    tagline = "",
    language = "",
    companies = "",
    raiting = "",
    image = "";
  if (obj.genres) {
    let g = obj.genres.reduce((acc, el) => {
      acc.push(el.name);
      return acc;
    }, []);

    genres = `<div class="genres"><b>Genres :</b> <span>${g.join(
      ","
    )}</span></div>`;
  }
  if (obj.budget) {
    budget = `<div class="budget"><b>Budget :</b><span>${obj.budget} million USA Dollar</span></div>`;
  }
  if (obj.homepage) {
    homepage = `<div class="homepage"><b>Home Page : </b><span><a href="${obj.homepage}" target='blank'> Go To Home Page </a></span></div>`;
  }
  if (obj.title) {
    title = `<div class="film_title"><b>Movie Name :</b> <span>${obj.title}</span></div>`;
  }
  if (obj.production_countries) {
    let c = obj.production_countries.reduce((acc, el) => {
      acc.push(el.name);
      return acc;
    }, []);

    if (c.length > 0) {
      countryes = ` <div class="country"><b>Production country :</b> <span>${c.join(
        ""
      )}</span></div>`;
    }
  }
  if (obj.release_date) {
    releaseDate = `<div class="date"><b>Relase Date : </b><span>${obj.release_date}</span></div>`;
  }
  if (obj.tagline) {
    tagline = `<div class="tagline"> <b> Tagline :</b> <span >${obj.tagline}</span ></div>`;
  }
  if (countries[obj.original_language]) {
    let l = countries[obj.original_language];
    language = `<div class="language"> <b> Original Language :</b> <span >${l}</span ></div>`;
  }
  if (obj.production_companies) {
    let g = obj.production_companies.reduce((acc, el) => {
      acc.push(el.name);
      return acc;
    }, []);
    if (g.length > 0) {
      companies = `<div class="companies"><b>Companies :</b> <span>${g.join(
        ","
      )}</span></div>`;
    }
  }
  if (obj.vote_average) {
    raiting = `<div class="raiting"> <b> Raiting :</b> <span>${obj.vote_average}</span ></div>`;
  }
  if (obj.poster_path) {
    image = obj.poster_path;
  } else if (obj.backdrop_path) {
    image = obj.backdrop_path;
  } else {
    image =
      "https://i.pinimg.com/originals/25/b5/04/25b5040ce35ef0dad4630a17d615c614.jpg";
  }
  root.innerHTML = `<div class="image_content">
   <img src="https://image.tmdb.org/t/p/w500${image}" alt="Photo has been deleted" />
   </div>
   <div class="description_content">
   ${raiting}      ${budget}  ${genres}   ${homepage}  ${title} 
    ${releaseDate} ${tagline} ${language} ${companies} ${countryes}
   </div>
   <div class="forMovie">
      <div class="overview">
         <p>${obj.overview}</p>
      </div>
   </div>`;

  return root;
}

function filmPageRender(id) {
  fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=533c699d20160f1793f6b6802001b0ed`
  )
    .then((response) => response.json())
    .then((data) => {
      const result = data;
      const contentBody = document.querySelector(".content_body");
      contentBody.innerHTML = "";
      contentBody.append(renderHTML(result));
    })
    .catch((e) => {
      console.log(e);
    });
}
window.goToMoviePage = filmPageRender;
