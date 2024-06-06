import { getLocalStorage, setLocalSimpleStorage } from "./utils.mjs";

export default class FavoritesDisplayer {
    constructor(datasource, parentSelector, searchForm, searchResult, searchWord) {
        this.datasource = datasource;
        this.parentSelector = parentSelector;
        this.searchForm = searchForm;
        this.searchResult = searchResult;
        this.searchWord = searchWord;
    }

    async init() {
        this.datasource = await this.datasource.getData();

        const favoriteRecipesArray = getLocalStorage("favorite-array").map(str => parseInt(str));

        if (favoriteRecipesArray.length == 0) {
            this.parentSelector.innerHTML = `
                <div style="text-align: center; padding: 20px;">
                    <br> <br> <br> 
                    <h2 style="font-family: Arial, sans-serif; color: #333;">No Recipes Found</h2>
                    <br> <br> <br> 
                    <p style="font-family: Arial, sans-serif; color: #666;">It seems you have not added any recipes to your favorites yet. Please explore our collection and add your favorite recipes.</p>
                    <br> <br> <br> 
                    <button style="padding: 10px 20px; font-size: 16px; font-family: Arial, sans-serif; background-color: #007BFF; color: #fff; border: none; border-radius: 5px; cursor: pointer;" onclick="window.location.href='/explore'">Explore Recipes</button>
                </div>
            `;
        }

        const recipe = this.datasource.filter(element => favoriteRecipesArray.includes(element.id));

        this.displayRecipes(recipe);

        this.searchForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            this.parentSelector.innerHTML = '';
            const newList = filterListBySearch(this.datasource, this.searchWord.value);

            this.displayRecipes(newList)

            console.log(newList.length);

            if (newList.length > 0) {
                this.searchResult.style.display = "inline-block";
                this.searchResult.innerHTML = newList.length + " " + (newList.length === 1 ? "result" : "results");
            }
            if (newList.length == this.datasource.length) {
                this.searchResult.style.display = "none";
            }
            if (newList.length == 0) {
                this.searchResult.style.display = "inline-block";
                this.searchResult.innerHTML = newList.length + " " + (newList.length === 1 ? "result" : "results");
            }
        });
    }

    displayRecipes(list) {
        list.forEach((recipe) => {
            const recipeHTML = `
            <div class="recipe-list list-view" id="recipeList">
                <div class="recipe-container">
                    <a href="${recipe.link}" class="recipe-link" data-index="${recipe.id}">
                        <div class="recipe-image">
                            <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
                        </div>
                        <div class="recipe-info">
                        <div class="recipe-title">${recipe.name}</div>
                        <div class="recipe-notes">${recipe.mealType} | ${recipe.servings} serving | Prep time: ${recipe.prepTimeMinutes}
                        | ${recipe.cuisine}</div>
                        <div class="recipe-stars">${generateStars(5)}</div>
                        </div>
                    </a>
                </div>
            </div>
            `;
            this.parentSelector.innerHTML += recipeHTML;
        });

        document.querySelectorAll('.recipe-link').forEach(link => {
            link.addEventListener('click', function (event) {
                const id = this.getAttribute('data-index');

                event.preventDefault();

                setLocalSimpleStorage("index", id);

                window.location.href = this.href = "../recipes_pages/index.html";
            });
        });
    }
}

function filterListBySearch(list, searchWord) {
    return list.filter(item => {
        const tag = item.tags[0].toLowerCase();
        const name = item.name.toLowerCase();
        const category = item.cuisine.toLowerCase();
        const search = searchWord.toLowerCase();
        const result = tag.includes(search) || name.includes(search) || category.includes(search);
        return result;
    });
}

function generateStars(rating) {
    const starsTotal = 5;
    const starPercentage = (rating / starsTotal) * 100;
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
    return `<div class="stars-inner" style="width: ${starPercentageRounded}"></div>`;
}

