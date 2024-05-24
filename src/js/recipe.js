import RecipeDisplayer from "./RecipeDisplayer.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const dataSource = new ExternalServices();
const recipesContainer = document.querySelector(".recipe-listing");
const recipeInfo = new RecipeDisplayer(dataSource, recipesContainer);

recipeInfo.init();