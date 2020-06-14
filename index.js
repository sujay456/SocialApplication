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

const MongoStore=require('connect-mongo')(session);

// This should be placed before express.static
const sassMiddleware=require('node-sass-middleware');
app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'expanded',
    prefix:'/css'
}));

const User=require('./model/user');

app.use(express.static('./assets'));
// use it before routes



app.set('view engine','ejs');
app.set('views','./views');

//after the views for the encoding of cookies

// name of the cookie,encoding the cokkie,cookie age in miliseconds
app.use(session({
    name:'codeial',
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new MongoStore(
    {
        mongooseConnection:db,
        autoRemove:'disabled'
    },
    function(err)
    {
        console.log("Hello error");
        return;
    }
    )

}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuth);

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