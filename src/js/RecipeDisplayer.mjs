import { getLocalStorage } from "./utils.mjs";

export default class RecipeDisplayer {
    constructor(datasource, parentSelector) {
      this.datasource = datasource;
      this.parentSelector = parentSelector;
    }

    async init() {
        const indexNumber = getLocalStorage("index");
        this.datasource = await this.datasource.getData();
        this.datasource = this.datasource[indexNumber];

        this.changeHeaderFooter();
        this.displayRecipes();
    }

    displayRecipes() {
        
        const recipe = this.datasource;
        const recipeHTML = `
        <div class="recipe-container">
            <div class="recipe-title">${recipe.title}</div>
            <div class="recipe-header">
                <img src="${recipe.image}" alt="${recipe.title}" class="recipe-img">
                <div class="recipe-category">${recipe.category}</div>
            </div>
            <div class="recipe-notes">Notes: ${recipe.notes}</div>
            <div class="recipe-details">
                <div class="recipe-details-item">Servings: ${recipe.servings}</div>
                <div class="recipe-details-item">Prep Time: ${recipe.prep_time}</div>
                <div class="recipe-details-item">Cook Time: ${recipe.cook_time}</div>
            </div>
            <div class="tab-container">
                <button class="tab-button" data-tab="ingredients">Ingredients</button>
                <button class="tab-button" data-tab="instructions">Instructions</button>
                <div id="ingredients" class="tab-content">
                    ${recipe.ingredients.map(ingredient => `<div class="ingredient">${ingredient.quantity} ${ingredient.name}</div>`).join('')}
                </div>
                <div id="instructions" class="tab-content" style="display:none;">
                    ${recipe.instructions.map(instruction => `<div class="instruction">${instruction.step}. ${instruction.description}</div>`).join('')}
                </div>
            </div>
            <div class="recipe-nutrition">
                <div class="recipe-details-item">Nutrition:</div>
                <div class="recipe-details-item">Calories: ${recipe.nutrition.calories}</div>
                <div class="recipe-details-item">Protein: ${recipe.nutrition.protein}</div>
                <div class="recipe-details-item">Carbohydrates: ${recipe.nutrition.carbohydrates}</div>
                <div class="recipe-details-item">Fat: ${recipe.nutrition.fat}</div>
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
        setTimeout(() => {
            const getHeader = document.querySelector(".icons");
            getHeader.innerHTML = `
                <button id="go-back" class="btn"><i class="fa fa-chevron-left"></i> </button>
                <button class="btn"><i class="fa fa-heart"></i> </button>
                <button class="btn"><span>Edit</span></button>
                `;

            const getfooter = document.querySelector(".footer-nav");
            getfooter.innerHTML = `
                <span class="recipe-count"></span>
                <button class="btn"><i class="fa fa-trash"></i> </button>
            `;
            
            //go back function
            const goBack = document.querySelector("#go-back");
            goBack.addEventListener("click", function(){
                window.location.href="../index.html";
            })

        }, 50);
    }

}
        
        