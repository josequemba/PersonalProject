
export default class RecipeDisplayer {
    constructor(datasource, parentSelector) {
      this.datasource = datasource;
      this.parentSelector = parentSelector;
    }

    async init() {
        this.datasource = await this.datasource.getData();
        this.displayRecipes();
        console.log(this.datasource)
        //console.log(this.parentSelector)
    }

    displayRecipes() {
        
        this.datasource.forEach(recipe => {
            const recipeHTML = `
                <div class="recipe-container">
                    <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
                    <div class="recipe-title">${recipe.title}</div>
                    <div class="recipe-category">${recipe.category}</div>
                    <div class="recipe-description">${recipe.description}</div>
                    <div class="recipe-details">
                        <div class="recipe-details-item">Servings: ${recipe.servings}</div>
                        <div class="recipe-details-item">Prep Time: ${recipe.prep_time}</div>
                        <div class="recipe-details-item">Cook Time: ${recipe.cook_time}</div>
                    </div>
                    <div class="recipe-ingredients">
                        <div class="section-title">Ingredients:</div>
                        ${recipe.ingredients.map(ingredient => `<div class="ingredient">${ingredient.quantity} ${ingredient.name}</div>`).join('')}
                    </div>
                    <div class="recipe-instructions">
                        <div class="section-title">Instructions:</div>
                        ${recipe.instructions.map(instruction => `<div class="instruction">${instruction.step}. ${instruction.description}</div>`).join('')}
                    </div>
                    <div class="recipe-details">
                        <div class="recipe-details-item">Nutrition:</div>
                        <div class="recipe-details-item">Calories: ${recipe.nutrition.calories}</div>
                        <div class="recipe-details-item">Protein: ${recipe.nutrition.protein}</div>
                        <div class="recipe-details-item">Carbohydrates: ${recipe.nutrition.carbohydrates}</div>
                        <div class="recipe-details-item">Fat: ${recipe.nutrition.fat}</div>
                    </div>
                    <div class="recipe-notes">Notes: ${recipe.notes}</div>
                </div>
            `;
            this.parentSelector.innerHTML += recipeHTML;
            console.log(recipeHTML)
        });
    }

}
        
        