import { getLocalStorage, removeItemsFromLocalStorage, setLocalSimpleStorage, setLocalStorage } from "./utils.mjs";

export default class RecipeDisplayer {
    constructor(datasource, parentSelector) {
      this.datasource = datasource;
      this.parentSelector = parentSelector;
      this.getfunctions = datasource;
      this.currentID;
    }

    async init() {
        this.currentID = getLocalStorage("index");
        this.datasource = await this.datasource.getData();
        this.datasource = this.datasource.filter(element => element.id == this.currentID);

        this.changeHeaderFooter();
        this.displayRecipes();
    }

    displayRecipes() {
        const recipe = this.datasource[0];
        console.log(recipe)
        const recipeHTML = `
        <div class="recipe-container">
            <div class="recipe-title">${recipe.name}</div>
            <div class="recipe-header">
                <img src="${recipe.image}" alt="${recipe.name}" class="recipe-img">
                <div class="recipe-category">${recipe.cuisine}</div>
            </div>
            <div class="recipe-notes">Meal: ${recipe.mealType}</div>
            <div class="recipe-details">
                <div class="recipe-details-item">Servings: ${recipe.servings}</div>
                <div class="recipe-details-item">Prep Time: ${recipe.prepTimeMinutes}</div>
                <div class="recipe-details-item">Cook Time: ${recipe.cookTimeMinutes}</div>
            </div>
            <div class="tab-container">
                <button class="tab-button" data-tab="ingredients">Ingredients</button>
                <button class="tab-button" data-tab="instructions">Instructions</button>
                <div id="ingredients" class="tab-content">
                    ${recipe.ingredients.map(ingredient => `<div class="ingredient">${ingredient}</div>`).join('')}
                </div>
                <div id="instructions" class="tab-content" style="display:none;">
                    ${recipe.instructions.map(instruction => `<div class="instruction">${instruction}</div>`).join('')}
                </div>
            </div>
            <div class="recipe-nutrition">
                <div class="recipe-details-item">Nutrition:</div>
                <div class="recipe-details-item">Calories: ${recipe.caloriesPerServing}</div>
                <div class="recipe-details-item">Difficulty: ${recipe.difficulty}</div>
                <div class="recipe-details-item">Rating: ${recipe.rating}</div>
            </div>
        </div>
        `;

        setTimeout(() => {
            const tabButtons = document.querySelectorAll('.tab-button');
            const tabContents = document.querySelectorAll('.tab-content');
        
            tabButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const tabName = this.getAttribute('data-tab');
                    tabContents.forEach(content => {
                        content.style.display = 'none';
                    });
                    document.getElementById(tabName).style.display = 'block';
                });
            });
        }, 500);

        this.parentSelector.innerHTML = recipeHTML;
        //console.log(recipeHTML)
    }

    changeHeaderFooter() {
        setTimeout(async () => {
            const getHeader = document.querySelector(".icons");
            getHeader.innerHTML = `
                <button id="go-back" class="btn"><i class="fa fa-chevron-left"></i> </button>
                <button id="favorite-btn" class="btn"><i class="fa fa-heart"></i> </button>
                <button class="btn" style="display: none;"><span>Edit</span></button>
                `;

            const getfooter = document.querySelector(".footer-nav");
            getfooter.innerHTML = `
                <span class="recipe-count"></span>
                <button id="delete-recipe" class="btn"><i class="fa fa-trash"></i> </button>
            `;

            //go back function
            const goBack = document.querySelector("#go-back");
            goBack.addEventListener("click", function(){
                window.location.href="../index.html";
            });
            
            //console.log(this.datasource[0].id);
            goBack.addEventListener("click", function(){
                this.datasource.ge
                window.location.href="../index.html";
            })

            //favorites
            const favoriteButtun = document.querySelector("#favorite-btn");

            this.currentID = getLocalStorage("index");
            const favoriteItems = getLocalStorage("favorite-array") || [];
            
            if (favoriteItems.includes(this.currentID)) {
                if (favoriteButtun.classList.contains("btn-dark")) {
                    //do nothing
                } else {
                    favoriteButtun.classList.toggle("btn-dark");
                }
            }

            favoriteButtun.addEventListener("click", function(){
                //add to favorite
                this.currentID = getLocalStorage("index");
                const favotiteArray = getLocalStorage("favorite-array");

                if (favotiteArray.includes(this.currentID)) {
                    removeItemsFromLocalStorage("favorite-array", this.currentID);
                    //manage color
                    favoriteButtun.classList.toggle("btn-dark");
                } else {
                    setLocalStorage("favorite-array", this.currentID)
                    //manage color
                    favoriteButtun.classList.toggle("btn-dark");
                }
            });

            //delete
            document.querySelector("#delete-recipe").addEventListener("click", function(){
                this.currentID = getLocalStorage("index");
                const itemsArray = getLocalStorage("userRecipe");

                if (this.currentID >= 31) {
                    const removeItem = itemsArray.filter(element => element.id !== this.currentID);

                    document.querySelector("#confirmationDialog").style.display = "block";

                    document.querySelector("#cancelDeleteButton").addEventListener("click", function (){
                        document.querySelector(".dialog").style.display = "none";
                    });

                    document.querySelector("#confirmDeleteButton").addEventListener("click", function (){
                        document.querySelector(".dialog").style.display = "none";
                        setLocalSimpleStorage("userRecipe", removeItem);

                        window.location.href = "/src/index.html";
                    });
                } else {
                    //only can delete your own recipes
                    document.querySelector("#alertDialog").style.display = "block";

                    document.querySelector("#okButton").addEventListener("click", function (){
                        document.querySelector("#alertDialog").style.display = "none";
                    });
                }
            })

        }, 500);
    }

}
        
// Function to remove recipe by ID
function removeById(arr, id) {
    const index = arr.findIndex(item => item.id === id);
    
    // If element with the given ID exists, remove it
    if (index !== -1) {
        arr.splice(index, 1);
        return true; // Element removed successfully
    } else {
        return false; // Element with given ID not found
    }
}