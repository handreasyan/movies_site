// aside menu data onload
let asidePageNum = 1;
const date = new Date();
const url = `https://api.themoviedb.org/3/discover/movie?primary_release_year=${date.getFullYear()}&page=${asidePageNum}&sort_by=vote_average.desc&api_key=533c699d20160f1793f6b6802001b0ed`;

const randomFilmsContent = document.querySelector(".films_random");
//  page scroll
randomFilmsContent.addEventListener("scroll", (event) => {
  if (randomFilmsContent.dataset.innerContent !== "search_result") {
    const allHeigth = document.body.scrollHeight;
    const screenHeight = document.body.offsetHeight;
    const scrollHeight = window.pageYOffset;

    if (allHeigth - screenHeight === scrollHeight) {
      ++asidePageNum;
      fetchSend(
        `https://api.themoviedb.org/3/discover/movie?primary_release_year=${date.getFullYear()}&page=${asidePageNum}&sort_by=vote_average.desc&api_key=533c699d20160f1793f6b6802001b0ed`
      );
    }
  }
});

fetchSend(url); // fill aside menu

// fill select options
const selects = document.querySelectorAll(".dropdown_select");
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
for (let i = date.getDate(); i <= 31; i++) {
  i = i < 10 ? "0" + i : i;
  const element = document.createElement("option");
  element.setAttribute("value", i);
  element.innerHTML = i;
  selects[0].append(element);
}
months.forEach((month, i) => {
  if (i > date.getMonth()) {
    i = i < 10 ? "0" + i : i + 1;
    const element = document.createElement("option");
    element.setAttribute("value", i);
    element.innerHTML = month;
    selects[1].append(element);
  }
});
const element = document.createElement("option");
element.setAttribute("value", date.getFullYear());
element.innerHTML = date.getFullYear();
selects[2].append(element);

// search
const searchBtn = document.querySelector(".search_by_date");
const textContent = document.querySelector(".for_teatre h3");

searchBtn.addEventListener("click", () => {
  const daySel = document.querySelector(".days_select").value;
  const monthSel = document.querySelector(".months_select").value;
  const yearSel = document.querySelector(".years_select").value;

  textContent.classList.remove("warning");
  textContent.innerHTML = "See days examples of films . . .";
  if (daySel && monthSel && yearSel) {
    const forTitle = document.querySelector(".films_random_content h3");
    forTitle.innerHTML = `In ${daySel}.${monthSel}.${yearSel} there will be an example of these films`;
    randomFilmsContent.innerHTML = "";
    const url = `https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=${yearSel}-${monthSel}-${daySel}&primary_release_date.lte=${yearSel}-${monthSel}-${daySel}&api_key=533c699d20160f1793f6b6802001b0ed`;

    fetchSend(url);

    randomFilmsContent.setAttribute("data-inner-content", "search_result");
  } else {
    textContent.classList.add("warning");
    textContent.innerHTML = "Please Choose Date";
  }
});

function fetchSend(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const result = data.results;
      result.forEach((obj) => {
        const div = document.createElement("div");
        div.classList.add("film_name");
        div.setAttribute("data-movie-id", obj.id);

        div.innerHTML = obj.title;
        randomFilmsContent.append(div);
      });
    })
    .catch((e) => {
      textContent.classList.add("warning");
      textContent.innerHTML = "Something went wrong, try again later";
    });
}

document.addEventListener("click", (event) => {
  if (event.target.dataset.movieId) {
    window.goToMoviePage(event.target.dataset.movieId);
  }
});
