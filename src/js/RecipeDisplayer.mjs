import { getLocalStorage } from "./utils.mjs";

export default class RecipeDisplayer {
    constructor(datasource, parentSelector) {
      this.datasource = datasource;
      this.parentSelector = parentSelector;
      this.getfunctions = datasource;
    }

    async init() {
        const idNumber = getLocalStorage("index");
        this.datasource = await this.datasource.getData();
        this.datasource = this.datasource.filter(element => element.id == idNumber);

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
                <button class="btn"><i class="fa fa-heart"></i> </button>
                <button class="btn"><span>Edit</span></button>
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
            })

            //go back function
            const deleteRecipe = document.querySelector("#delete-recipe");

            const result = await this.getfunctions.removeItemsFromServer(this.datasource[0].id);
            
            console.log(result);
            //console.log(this.datasource[0].id);
            goBack.addEventListener("click", function(){
                this.datasource.ge
                window.location.href="../index.html";
            })

        }, 50);
    }

}
        
        