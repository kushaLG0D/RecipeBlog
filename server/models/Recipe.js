const mongoose=require('mongoose');


const recipeSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    instructions:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    
    ingredients:{
        type:Array,
        required:true
    },
    category:{
        type:String,
        enum:['Thai' , 'American', 'Chinese', 'Mexican' , 'Indian','Spanish'],
        required:true
    },
    image:{
        type:String,
        required:true
    }

})

recipeSchema.index({name:'text',instructions:'text'});

const Recipe = mongoose.model('Recipe',recipeSchema);

module.exports=Recipe;