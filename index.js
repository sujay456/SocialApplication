const express=require('express');
const port=8000;
const cookieParser=require('cookie-parser');
const app=express();

const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
// For session creation from passport or any other authentication
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport');
const Mongostore=require('connect-mongo')(session);
const sassMiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const CustomMware=require('./config/middleware');
const passportJWT=require('./config/passport-jwt-strategy');
app.use(sassMiddleware({
    src:'./assets/scss', //from where we are gonna find all sccs 
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}))
app.use(express.urlencoded());

app.use(cookieParser());
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.use(express.static('./assets'));
app.use('/uploads',express.static('./uploads'));
// app.use('/preview',express.static(''))

// use express router
app.set('view engine','ejs');
app.set('views','./views');


// just the setup for the cookie /express-session
app.use(session(
    {
        name:'benends', //name of cookie
        secret:'blahsomething',
        saveUninitialized:false,
        resave:false,
        cookie:{
            maxAge:(1000*60*60)
        },
        store:new Mongostore(
            {
                mongooseConnection:db,
                autoRemove:'disabled'
            },
            function(err)
            {
                console.log(err );
            }
        )

    }
));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.SetAuthUserInfo);

app.use(flash());
app.use(CustomMware.setFlash);

app.use('/',require('./routes/index'));

app.listen(port,(err)=>{
    if(err)
    {
        console.log("Error");
    }
    console.log(`Server is up and running: ${port} `);
});