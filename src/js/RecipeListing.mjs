
export default class RecipeListing {
    constructor(datasource, parentSelector, recipesLenghth) {
      this.datasource = datasource;
      this.parentSelector = parentSelector;
    }

    async init() {
        this.datasource = await this.datasource.getData();
        this.displayRecipes();
    }

    displayRecipes() {
        this.datasource.forEach(recipe => {
            const recipeHTML = `
            <div class="recipe-list list-view" id="recipeList">
                <div class="recipe-container">
                    <div class="recipe-image">
                        <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
                    </div>
                    <div class="recipe-info">
                    <div class="recipe-title">${recipe.title}</div>
                    <div class="recipe-notes">${recipe.notes}</div>
                    <div class="recipe-stars">${generateStars(5)}</div>
                    </div>
                </div>
            </div>
            `;
            this.parentSelector.innerHTML += recipeHTML;
        });
    }
}
        
function generateStars(rating) {
    const starsTotal = 5;
    const starPercentage = (rating / starsTotal) * 100;
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
    return `<div class="stars-inner" style="width: ${starPercentageRounded}"></div>`;
}

