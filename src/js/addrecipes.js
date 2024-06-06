import { getLocalStorage, loadHeaderFooter, setLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

loadHeaderFooter();

setTimeout(() => {
  const header = document.querySelector(".icons");

  const htmlElement = `<button id= "go-back" class="btn"><i class="fa fa-chevron-left"></i></button>
                      <h1 class="logo">recipe organizer</h1>
                      <button class="btn"><i class="fa fa-plus" style="display: none;"></i></button>`;

  header.innerHTML = htmlElement;

  //go back function
  const goBack = document.querySelector("#go-back");
  goBack.addEventListener("click", function(){
      window.location.href="../index.html";
  })

  //footer
  const footerChange = document.querySelector(".footer-nav").innerHTML = "";

}, 500);

localStorage.removeItem("userRecipe");

document.getElementById('recipe-form').addEventListener('submit', async function(event) {
    try {
        event.preventDefault(); // Prevent the default form submission
        
        // Perform custom validation if needed
        const form = event.target;
    
        if (!form.checkValidity()) {
            // Display custom error message if the form is invalid
            alert('Please fill out all required fields.');
            return;
        }
    
        // Get form values
        const name = document.getElementById('name').value;
        const ingredients = document.getElementById('ingredients').value.split(',').map(item => item.trim());
        const instructions = document.getElementById('instructions').value.split(',').map(item => item.trim());
        const prepTimeMinutes = document.getElementById('prepTimeMinutes').value;
        const cookTimeMinutes = document.getElementById('cookTimeMinutes').value;
        const servings = document.getElementById('servings').value;
        const difficulty = document.getElementById('difficulty').value;
        const cuisine = document.getElementById('cuisine').value;
        const caloriesPerServing = document.getElementById('caloriesPerServing').value;
        const mealType = document.getElementById('mealType').value.split(',').map(item => item.trim());
        const image = document.getElementById('image').value || "https://josequemba.github.io/PersonalProject/src/public/images/myown.png";
    
        //generate id
        const dataSource = new ExternalServices();
        let data = await dataSource.getData();
    
        console.log(data.length);
    
        // Create an object to hold the form data
        const recipeData = {
            id: data.length + 1, 
            name,
            ingredients,
            instructions,
            image,
            prepTimeMinutes: parseInt(prepTimeMinutes),
            cookTimeMinutes: parseInt(cookTimeMinutes),
            servings: parseInt(servings),
            difficulty,
            cuisine,
            caloriesPerServing: parseInt(caloriesPerServing),
            mealType
        };
    
        setLocalStorage("userRecipe", recipeData);
        
        document.getElementById("recipe-form").innerHTML = "";

        document.querySelector(".success-content").classList.add("savedRecipe");

        document.querySelector(".success-content").innerHTML = 
        `<span class="success-icon">&#10004;</span>

            <span class="success-title">
                <br><br>
                <h1>Recipe Saved Successfully</h1>
                
            </span>
            <br>
            <p>
            Your recipe has been successfully saved. Thank you for using our service!
            </p>
            <br>
        `;

    } catch {
        alert("Error ocurred while saving the recipe, try again later")
    }
});

