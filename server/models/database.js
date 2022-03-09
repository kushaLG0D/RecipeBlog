const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/RecipeBlog').then(()=>{
    console.log('Connected to database sucessfully')
}).catch(e=>{
    console.log(`Connection to database failed`);
});