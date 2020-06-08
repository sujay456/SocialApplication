const express=require('express');
const cookieParser=require('cookie-parser');
const port=8000;

const app=express();

const expressLayout=require('express-ejs-layouts');
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(express.urlencoded());
app.use(expressLayout);

//cookie parser
app.use(cookieParser());

const db=require('./config/mongoose');
const User=require('./model/user');

app.set('view engine','ejs');
app.set('views','./views');

app.use(express.static('./assets'));
// use it before routes


app.use('/',require('./routes'));



app.listen(port,function(err)
{
    if(err)
    {
        console.log(`Error:${err}`);
        return;
    }
    console.log(`The server is up and running on port:${port}`);
})