

// www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.btn');
const recipe_container = document.querySelector('.recipe_container');
const recipe_detail_content = document.querySelector('.recipe_detail_content');
const recipe_closeBtn = document.querySelector('.recipe_closeBtn');

// making function which gives us the recipes
// await - it wait until the data is not found and give whole data in one time we have to use async 
const fetchRecipesFunction = async (query) => {
    
    recipe_container.innerHTML = `<h2>Here we go 😋. . .</h2>`

    // if unkown recipe comes
    try{
        // get the data form api using fetch function which return us a promisis.
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        // convert in json
        const reponce = await data.json();

        // because ew don't want to show anythings
        recipe_container.innerHTML = ""

        // meal is a array so we use the for each loop
        reponce.meals.forEach(meal => {
            // console.log(meal);
            // now create the element
            const recipeDiv = document.createElement('div');
            // now give the class to recipeDiv and its name
            recipeDiv.classList.add('recipe');
            // now storing all img,name of the image in innerHTML
            recipeDiv.innerHTML = `
                <img src="${meal.strMealThumb}">
                <h3>${meal.strMeal}</h3>
                <p><span>${meal.strArea}</span> dish</p>
                <p>Belongs to <span>${meal.strCategory}</span></p>
                `
            //making the button to view the recipe
            const button = document.createElement('button');
            button.textContent = "view recipe"
            // append to the previous class
            recipeDiv.appendChild(button);
            
            //adding the add event lisner to the button show we can see the popup
            button.addEventListener('click',()=>{
                    openRecipePopup(meal);
            })

            // now append the div on recipe_container
            recipe_container.appendChild(recipeDiv);
        });
        // console.log(reponce.meals[0]);
    } catch(error){
        recipe_container.innerHTML = `<h2>Error in fetching recipes 🥹</h2>`
    }

    
}

// fetch ingredients and mesurement
const fetchIngredients = (meal) =>{
    // console.log(meal);
    let ingredientsList = "";
    for(let i =1;i<=20;i++){
        const ingredient =  meal[`strIngredient${i}`]
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;
}

const openRecipePopup = (meal) => {
    recipe_detail_content.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredents:</h3>
        <ul class="IngredientList">${fetchIngredients(meal)}</ul>
        <div class="recipeInstruction">
            <h3>Instruction:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        `
    // block the display to parent of recipe_detail_content which is repipe_details
    recipe_detail_content.parentElement.style.display = "block";
}

recipe_closeBtn.addEventListener('click',()=>{
    recipe_detail_content.parentElement.style.display = "none"
})

searchBtn.addEventListener('click' , (e)=>{
    e.preventDefault();// it prevent the auto submit
    // firstly we have to take the input from search box and trim the value
    const searchInput = searchBox.value.trim();
    // it give some random meals
    if(!searchInput){
        recipe_container.innerHTML = `<h2>type the meal you want to search😁</h2>`
        return;
    }
    fetchRecipesFunction(searchInput);
    // console.log("button clicked");
})

// using the mealDB api