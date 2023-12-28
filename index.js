let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendResults(searchData) {
  let { title, link, description } = searchData;

  let resultItemEl = document.createElement("div");
  resultItemEl.classList.add("result-item", "shadow-sm");
  searchResultsEl.appendChild(resultItemEl);

  let titleEl = document.createElement("a");
  titleEl.href = link;
  titleEl.target = "_blank";
  titleEl.textContent = title;
  titleEl.classList.add("result-title");
  resultItemEl.appendChild(titleEl);

  let titleBreakEl = document.createElement("br");
  resultItemEl.appendChild(titleBreakEl);

  let urlEl = document.createElement("a");
  urlEl.textContent = link;
  urlEl.href = link;
  urlEl.classList.add("result-url");
  urlEl.target = "_blank";
  resultItemEl.appendChild(urlEl);

  let lineBreakEl = document.createElement("br");
  resultItemEl.appendChild(lineBreakEl);

  let descriptionEl = document.createElement("p");
  descriptionEl.textContent = description;
  descriptionEl.classList.add("link-description");
  resultItemEl.appendChild(descriptionEl);
}

function displayResults(results) {
  spinnerEl.classList.toggle("d-none");
  for (let searchData of results) {
    createAndAppendResults(searchData);
  }
}

function wikipediaSearch(event) {
  if (event.key === "Enter") {
    spinnerEl.classList.toggle("d-none");
    searchResultsEl.textContent = "";
    let searchInputElValue = searchInputEl.value;
    let url = "https://apis.ccbp.in/wiki-search?search=" + searchInputElValue;
    let options = {
      method: "GET",
    };

    fetch(url, options)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        let { search_results } = jsonData;
        displayResults(search_results);
      });
  }
}

searchInputEl.addEventListener("keydown", wikipediaSearch);