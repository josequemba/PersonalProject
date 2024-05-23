import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import RecipeListing from "./RecipeListing.mjs";

loadHeaderFooter();

const dataSource = new ExternalServices();
const recipesContainer = document.querySelector(".recipe-list");
const recipeInfo = new RecipeListing(dataSource, recipesContainer);



recipeInfo.init();
//setTimeout(b, 1000);

setTimeout(() => {
    document.querySelector(".btn-footer").addEventListener('click', function() {
        const recipeList = recipesContainer;
        const toggleIcon = document.querySelector('#toggleIcon');
    
        if (recipeList.classList.contains('list-view')) {
            recipeList.classList.remove('list-view');
            recipeList.classList.add('grid-view');
            toggleIcon.classList.remove('fa-th-large');
            toggleIcon.classList.add('fa-list');
        } else {
            recipeList.classList.remove('grid-view');
            recipeList.classList.add('list-view');
            toggleIcon.classList.remove('fa-list');
            toggleIcon.classList.add('fa-th-large');
        }
    });
    
}, 200);
