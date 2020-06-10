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

const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport_local_startegy');


const User=require('./model/user');

app.set('view engine','ejs');
app.set('views','./views');

//after the views for the encoding of cookies
app.use(session({
    name:'codeial',
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }

}));

app.use(passport.initialize());
app.use(passport.session());

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