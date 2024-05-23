
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
        this.datasource.forEach((recipe, index) => {
            const recipeHTML = `
            <div class="recipe-list list-view" id="recipeList">
                <div class="recipe-container">
                    <a href="${recipe.link}" class="recipe-link" data-index="${index}">
                        <div class="recipe-image">
                            <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
                        </div>
                        <div class="recipe-info">
                        <div class="recipe-title">${recipe.title}</div>
                        <div class="recipe-notes">${recipe.notes}</div>
                        <div class="recipe-stars">${generateStars(5)}</div>
                        </div>
                    </a>
                </div>
            </div>
            `;
            this.parentSelector.innerHTML += recipeHTML;
        });

        document.querySelectorAll('.recipe-link').forEach(link => {
            link.addEventListener('click', function(event) {
                const index = this.getAttribute('data-index');
                console.log('Clicked recipe index:', index);
                event.preventDefault(); 
                //window.location.href = this.href; // Navigate to the link
            });
        });

    }
}
        
function generateStars(rating) {
    const starsTotal = 5;
    const starPercentage = (rating / starsTotal) * 100;
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
    return `<div class="stars-inner" style="width: ${starPercentageRounded}"></div>`;
}

