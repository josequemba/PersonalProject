import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import FavoritesDisplayer from "./favoriteDisplayer.mjs";

loadHeaderFooter();


setTimeout(() => {
  const header = document.querySelector(".icons");

  const htmlElement = `<button id= "favorite-btn" class="btn"><i class="fa fa-chevron-left"></i></button>
                      <h1 class="logo">Favorites</h1>
                      <button class="btn"><i class="fa fa-plus" style="display: none;"></i></button>`;

  header.innerHTML = htmlElement;
}, 50);

const searchForm = document.querySelector("#search-form");
const searchWord = document.querySelector("#search-input");
const searchResult = document.querySelector("#result-search");
const dataSource = new ExternalServices();
const recipesContainer = document.querySelector(".recipe-list");
const recipeInfo = new FavoritesDisplayer(dataSource, recipesContainer, searchForm, searchResult, searchWord);

recipeInfo.init();

setTimeout(async () => {
  const recipesLength = document.querySelector(".recipe-count");
  const countLength = await dataSource.getData();

  countLength.length > 1
    ? (recipesLength.innerHTML = `${countLength.length} recipes`)
    : countLength.length == 1
      ? (recipesLength.innerHTML = `${countLength.length} recipe`)
      : (recipesLength.innerHTML = "");

  document.querySelector(".btn-footer").addEventListener("click", function () {
    const recipeList = recipesContainer;
    const toggleIcon = document.querySelector("#toggleIcon");

    if (recipeList.classList.contains("list-view")) {
      recipeList.classList.remove("list-view");
      recipeList.classList.add("grid-view");
      toggleIcon.classList.remove("fa-th-large");
      toggleIcon.classList.add("fa-list");
    } else {
      recipeList.classList.remove("grid-view");
      recipeList.classList.add("list-view");
      toggleIcon.classList.remove("fa-list");
      toggleIcon.classList.add("fa-th-large");
    }
  });

  document.querySelector("#favorite-btn").addEventListener("click", function () {
    window.location.href = "../favorite_page/index.html";
  });
}, 200);
