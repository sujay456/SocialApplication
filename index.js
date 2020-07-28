const express=require('express');
const env=require('./config/environment');
const logger=require('morgan');
const port=8000;
const cookieParser=require('cookie-parser');
const app=express();
require('./config/view-helpers')(app);

const kue=require('kue');
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
const passportGoogle=require('./config/passport-google');
const path=require('path');

const chatServer=require('http').Server(app);
const chatSocket=require('./config/chat_socket').chatSocket(chatServer);
chatServer.listen(5000);


// console.log(path.join(__dirname,env.asset_path,'scss'));

if(env.name=='development')
{
    app.use(sassMiddleware({
        src:path.join(__dirname,env.asset_path,'scss'), //from where we are gonna find all sccs 
        dest:path.join(__dirname,env.asset_path,'css'),
        debug:true,
        outputStyle:'extended',
        prefix:'/css'
    }));
}
app.use(logger(env.morgan.mode,env.morgan.option));
app.use(express.urlencoded());

app.use(cookieParser());
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.use(express.static(path.join(__dirname,env.asset_path)));
app.use('/uploads',express.static('./uploads'));
// app.use('/preview',express.static(''))

// use express router
app.set('view engine','ejs');
app.set('views','./views');


// just the setup for the cookie /express-session
app.use(session(
    {
        name:'benends', //name of cookie
        secret:env.session_cookie_key,
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

// 917986733590-60ed7a9t044ovpcjmeikgpg706617705.apps.googleusercontent.com
// yy-zCwz2p_Dd7ntKt7YJ8nKY