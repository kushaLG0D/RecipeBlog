// require('../models/database');
// const Category = require('../models/Category');
// const Recipe = require('../models/Recipe');

// /**
//  * GET /
//  * Homepage 
// */
// exports.homepage = async(req, res) => {
//   try {
//     const limitNumber = 5;
//     const categories = await Category.find({}).limit(limitNumber);
//     const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
//     const thai = await Recipe.find({ 'category': 'Thai' }).limit(limitNumber);
//     const american = await Recipe.find({ 'category': 'American' }).limit(limitNumber);
//     const chinese = await Recipe.find({ 'category': 'Chinese' }).limit(limitNumber);

//     const food = { latest, thai, american, chinese };

//     res.render('index', { title: 'Cooking Blog - Home', categories, food } );
//   } catch (error) {
//     res.satus(500).send({message: error.message || "Error Occured" });
//   }
// }

// /**
//  * GET /categories
//  * Categories 
// */
// exports.exploreCategories = async(req, res) => {
//   try {
//     const limitNumber = 20;
//     const categories = await Category.find({}).limit(limitNumber);
//     res.render('categories', { title: 'Cooking Blog - Categoreis', categories } );
//   } catch (error) {
//     res.satus(500).send({message: error.message || "Error Occured" });
//   }
// } 


// /**
//  * GET /categories/:id
//  * Categories By Id
// */
// exports.exploreCategoriesById = async(req, res) => { 
//   try {
//     let categoryId = req.params.id;
//     const limitNumber = 20;
//     const categoryById = await Recipe.find({ 'category': categoryId }).limit(limitNumber);
//     res.render('categories', { title: 'Cooking Blog - Categoreis', categoryById } );
//   } catch (error) {
//     res.satus(500).send({message: error.message || "Error Occured" });
//   }
// } 
 
// /**
//  * GET /recipe/:id
//  * Recipe 
// */
// exports.exploreRecipe = async(req, res) => {
//   try {
//     let recipeId = req.params.id;
//     const recipe = await Recipe.findById(recipeId);
//     res.render('recipe', { title: 'Cooking Blog - Recipe', recipe } );
//   } catch (error) {
//     res.satus(500).send({message: error.message || "Error Occured" });
//   }
// } 


// /**
//  * POST /search
//  * Search 
// */
// exports.searchRecipe = async(req, res) => {
//   try {
//     let searchTerm = req.body.searchTerm;
//     let recipe = await Recipe.find( { $text: { $search: searchTerm, $diacriticSensitive: true } });
//     res.render('search', { title: 'Cooking Blog - Search', recipe } );
//   } catch (error) {
//     res.satus(500).send({message: error.message || "Error Occured" });
//   }
  
// }

// /**
//  * GET /explore-latest
//  * Explplore Latest 
// */
// exports.exploreLatest = async(req, res) => {
//   try {
//     const limitNumber = 20;
//     const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
//     res.render('explore-latest', { title: 'Cooking Blog - Explore Latest', recipe } );
//   } catch (error) {
//     res.satus(500).send({message: error.message || "Error Occured" });
//   }
// } 



// /**
//  * GET /explore-random
//  * Explore Random as JSON
// */
// exports.exploreRandom = async(req, res) => {
//   try {
//     let count = await Recipe.find().countDocuments();
//     let random = Math.floor(Math.random() * count);
//     let recipe = await Recipe.findOne().skip(random).exec();
//     res.render('explore-random', { title: 'Cooking Blog - Explore Latest', recipe } );
//   } catch (error) {
//     res.satus(500).send({message: error.message || "Error Occured" });
//   }
// } 


// /**
//  * GET /submit-recipe
//  * Submit Recipe
// */
// exports.submitRecipe = async(req, res) => {
//   const infoErrorsObj = req.flash('infoErrors');
//   const infoSubmitObj = req.flash('infoSubmit');
//   res.render('submit-recipe', { title: 'Cooking Blog - Submit Recipe', infoErrorsObj, infoSubmitObj  } );
// }

// /**
//  * POST /submit-recipe
//  * Submit Recipe
// */
// exports.submitRecipeOnPost = async(req, res) => {
//   try {

//     let imageUploadFile;
//     let uploadPath;
//     let newImageName;

//     if(!req.files || Object.keys(req.files).length === 0){
//       console.log('No Files where uploaded.');
//     } else {

//       imageUploadFile = req.files.image;
//       newImageName = Date.now() + imageUploadFile.name;

//       uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

//       imageUploadFile.mv(uploadPath, function(err){
//         if(err) return res.satus(500).send(err);
//       })

//     }

//     const newRecipe = new Recipe({
//       name: req.body.name,
//       description: req.body.description,
//       email: req.body.email,
//       ingredients: req.body.ingredients,
//       category: req.body.category,
//       image: newImageName
//     });
    
//     await newRecipe.save();

//     req.flash('infoSubmit', 'Recipe has been added.')
//     res.redirect('/submit-recipe');
//   } catch (error) {
//     // res.json(error);
//     req.flash('infoErrors', error);
//     res.redirect('/submit-recipe');
//   }
// }




// // Delete Recipe
// // async function deleteRecipe(){
// //   try {
// //     await Recipe.deleteOne({ name: 'New Recipe From Form' });
// //   } catch (error) {
// //     console.log(error);
// //   }
// // }
// // deleteRecipe();


// // Update Recipe
// // async function updateRecipe(){
// //   try {
// //     const res = await Recipe.updateOne({ name: 'New Recipe' }, { name: 'New Recipe Updated' });
// //     res.n; // Number of documents matched
// //     res.nModified; // Number of documents modified
// //   } catch (error) {
// //     console.log(error);
// //   }
// // }
// // updateRecipe();


// /**
//  * Dummy Data Example 
// */

// async function insertDymmyCategoryData(){
//   try {
//     await Category.insertMany([
//       {
//         "name": "Thai",
//         "image": "thai-food.jpg"
//       },
//       {
//         "name": "American",
//         "image": "american-food.jpg"
//       }, 
//       {
//         "name": "Chinese",
//         "image": "chinese-food.jpg"
//       },
//       {
//         "name": "Mexican",
//         "image": "mexican-food.jpg"
//       }, 
//       {
//         "name": "Indian",
//         "image": "indian-food.jpg"
//       },
//       {
//         "name": "Spanish",
//         "image": "spanish-food.jpg"
//       }
//     ]);
//   } catch (error) {
//     console.log('err', + error)
//   }
// }

// // insertDymmyCategoryData();


// async function insertDymmyRecipeData(){
//   try {
//     await Recipe.insertMany([
//       { 
//         "name": "Recipe Name Goes Here",
//         "description": `Recipe Description Goes Here`,
//         "email": "recipeemail@raddy.co.uk",
//         "ingredients": [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "American", 
//         "image": "southern-friend-chicken.jpg"
//       },
//       { 
//         "name": "Recipe Name Goes Here",
//         "description": `Recipe Description Goes Here`,
//         "email": "recipeemail@raddy.co.uk",
//         "ingredients": [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "American", 
//         "image": "southern-friend-chicken.jpg"
//       },
//     ]);
//   } catch (error) {
//     console.log('err', + error)
//   }
// }

// insertDymmyRecipeData();

[
  { 
    "name": "Thai Yellow Curry Recipe",
    "time":"29 - 40 minutes",
    "instructions": `Step 1:
    Measure out the curry paste, turmeric, fish sauce, and nut butter.
    Cut up potatoes, onions, and carrots on a wooden cutting board.
    
    Step 2:
    Prep all the veggies and set them aside. I like to cut the onions into half moon slices as pictured because that’s what I’ve gotten used to at our local restaurant. But you can dice them as well if that’s your preference.
    Sautéd onion, carrots, and potatoes in a white cooking pot, with the curry paste being added.
    
    Step 3 & 4:
      Next sauté the chicken and remove it from the pan. Then we’ll sauté the onion and carrots before adding the potatoes and curry paste.
      Flavor tip: You want to briefly cook the curry paste before adding the coconut milk. This is a classic and authentic technique that helps to draw out more flavors from the curry paste. Normally the curry paste is fried in oil. But I’ve found it works well to sauté it with the veggies just before adding the coconut milk.
      The simmered curry with the chicken being added back to the white pan along with the nut butter.
    
      Step 5 & 6:
    Add the coconut milk with the lime zest or lime leave if you can find them and simmer until all the veggies are tender.
    Then add the chicken back to the pan along with the nut butter, lime juice, and fish sauce. Stir to combine.
    Adding the chopped spinach to the yellow curry in a white pot on a white background.
    
    Step 7:
     Lastly we’re going to add the chopped spinach and let the residual heat from the curry light wilt it. Then season to taste with fish sauce and sea salt and serve.
    A large black cast iron skillet filled with Yellow Thai Curry with lime wedges and cilantro sprigs around it.
    Serve this curry with:
    
    You can serve this with steamed rice/noodles or cauliflower rice. I’ve even served this curry over sweet potato, butternut, and zucchini noodles. And each one is good in it’s own way!
    `,
    "email": "recipeemail@raddy.co.uk",
    "ingredients": [
        "2 Chicken breasts",

        
        
        "4 Carrots",
          "1 Cilantro",
         "   1 Lime, wedges",
           " 4 Potatoes, medium-size",
           " 1 Yellow onion",
    
        
           " 1 cups Chicken stock",
            "2 15-ounce cans Coconut milk, high quality",
           " 4 tbsp Yellow curry paste",
        

        
            "1 1/2 tsp Fish sauce",
        

        
            "1 Serve with jasmine rice",
        
    
        
          "3/4 tsp Salt",
           "1 1/2 tsp Sugar",
        
        
        
            "1 tbsp Coconut oil, virgin"
    ],
    "category": "Thai", 
    "image": "thai-yellowcurry.jpg"
  }
 
    ]