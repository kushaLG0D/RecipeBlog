const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const Recipe = require("../models/Recipe");

//Get-'/' -Home Page
router.get("/", async (req, res) => {
  try {
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);
    const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
    const thai = await Recipe.find({ category: "Thai" }).limit(limitNumber);
    const american = await Recipe.find({ category: "American" }).limit(
      limitNumber
    );
    const indian = await Recipe.find({ category: "Indian" }).limit(limitNumber);

    const food = { latest, thai, american, indian };

    res.render("index", { title: "Recipe Blog - Home", categories, food });
  } catch (e) {
    res.status(500).json({ message: e.message || "Error Occured" });
  }
});

router.get("/contact", (req, res)=>{
  res.render('contact');
})
router.get("/about", (req, res)=>{
  res.render('about');
})

//Get-'/categories' -All Category Page displayed when we click on all categories.
router.get("/categories", async (req, res) => {
  try {
    limitNumber = 20;
    const categories = await Category.find({}).limit(limitNumber);

    res.render("categories", {
      title: "Recipe Blog - Categories",
      categories,
    });
  } catch (e) {
    res.status(500).json({ message: e.message || "Error Occured" });
  }
});

//Get-'/recipe/:id' -To display inividual reciep details to viewer
router.get("/recipe/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const recipe = await Recipe.findById({ _id });
    const name = recipe.name;
    res.render("recipe", { title: `Recipe Blog - ${name}`, recipe });
  } catch (e) {
    res.status(500).json({ message: e.message || "Error Occured" });
  }
});

//Get-'/categories/category' -Sort recipe by category
router.get("/categories/:category", async (req, res) => {
  try {
    let category = req.params.category;
    limitNumber = 20;
    const categoriesByName = await Recipe.find({ category });

    res.render("categories", {
      title: `Recipe Blog - ${category}`,
      categoriesByName,
    });
  } catch (e) {
    res.status(500).json({ message: e.message || "Error Occured" });
  }
});

//Search
router.post("/search", async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    let recipeBySearch = await Recipe.find({
      $text: { $search: searchTerm, $diacriticSensitive: true },
    });
    res.render('search',{title:'Recipe Blog - Searched',recipeBySearch})
  } catch (e) {
    res.status(500).json({ message: e.message || "Error Occured" });}
});


//Get-Explore-Latest
router.get('/explore-latest',async(req,res) => {
  try {
   let limitNumber = 20;
   const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
   res.render('explore-latest',{title:'Recipe Blog - Latest',latest})
  } catch (e) {
    res.status(500).json({ message: e.message || "Error Occured" });
  }
});

//Get-Explore-Random
router.get('/explore-random',async(req,res) => {
  try {
    const count= Recipe.find().countDocuments;
   const random = Math.floor(Math.random() * count);
   const recipe = await Recipe.findOne().skip(random).exec();
  //  res.json(recipe);
   res.render('explore-random',{title:'Recipe Blog - Random',recipe});
  } catch (e) {
    res.status(500).json({ message: e.message || "Error Occured"});
  }
});





//Get-Submit recipe Page

router.get('/submit-recipe',async(req, res)=>{
  try{
    const infoSubmitObj=req.flash('infoSubmit');
    const infoErrorsObj=req.flash('infoErrors');
    res.render('submit-recipe',{title:'Recipe Blog - Submit Recipe',infoSubmitObj,infoErrorsObj});
  }
  catch (e){
    res.status(500).json({ message: e.message || "Error Occured" });
  }
})

//Post-Submit Recipe page
router.post('/submit-recipe',async (req, res)=>{
  try{
      let newImageName;
      if(req.files)
      {
        let uploadImage = req.files.image;
        newImageName=Date.now()+uploadImage.name;
        let uploadPath= require('path').resolve('./')+'/public/images/'+newImageName;
        uploadImage.mv(uploadPath,(e)=>{
          if(e){
            return res.status('500').send(e.message);
          }
        })
      }

    const newRecipe=new Recipe({
      name: req.body.name,
      time: req.body.time,
      email: req.body.email,
      instructions: req.body.description,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image:newImageName,
    })
    const save=await newRecipe.save();

    req.flash('infoSubmit','Recipe has been added successfully');  
    req.flash('infoError','Some Error has occurred');  
    res.redirect('/submit-recipe');
}
  catch(e){
    res.status(500).json({ message: e.message || "Error Occured" });
  }
})




module.exports = router;
