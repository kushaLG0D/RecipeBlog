const express=require('express');
var expressLayouts = require('express-ejs-layouts');
const path = require('path');
const ejs=require('ejs');
const app = express();
var favicon = require('serve-favicon');
const port=process.env.PORT || 3007;
require('./server/models/database');
const fileuploader=require('express-fileupload');
const session=require('express-session');
const cookieParser = require('cookie-parser')
const flash=require('connect-flash');


app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, './public')));
app.use(expressLayouts);
app.use(favicon(path.join(__dirname,'public','images','dish.png')));

app.use(cookieParser('ReciepeBlogSecure'));
app.use(session({
    secret:"ReciepeBlogSecretSession",
    saveUninitialized:true,
    resave:true
}));
app.use(fileuploader());
app.use(flash());

app.set('layout','./layouts/main');
app.set("views", path.join(__dirname, "views"));
app.set('view engine','ejs');

app.use('/',require('./server/routes/reciepeRoutes.js'));

app.listen(port,()=>{
    console.log(`Listening port - ${port}`);
})



