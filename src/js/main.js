import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import RecipeListing from "./RecipeListing.mjs";

loadHeaderFooter();

const searchForm = document.querySelector("#search-form");
const searchWord = document.querySelector("#search-input");
const searchResult = document.querySelector("#result-search");
const dataSource = new ExternalServices();
const recipesContainer = document.querySelector(".recipe-list");
const recipeInfo = new RecipeListing(dataSource, recipesContainer, searchForm, searchResult, searchWord);

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

  document.querySelector("#add-btn").addEventListener("click", function () {
    window.location.href = "../add_page/index.html";
  });
}, 500);
