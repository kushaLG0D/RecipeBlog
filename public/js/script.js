console.log(`I am in JS script.js`);
let addIngredientsBtn=document.getElementById('addIngredientsBtn');
let ingredientList=document.querySelector('.ingredientList');
let ingredientDiv=document.querySelectorAll('.ingredeintDiv')[0];

addIngredientsBtn.addEventListener('click', function(){
    console.log(`Btn clicked`);
    let newIngredient=ingredientDiv.cloneNode(true);
    let input=newIngredient.getElementsByTagName('input')[0];
    input.value="";
    ingredientList.appendChild(newIngredient);
})