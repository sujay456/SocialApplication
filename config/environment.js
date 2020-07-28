const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');
const morgan = require('morgan');

const logDirectory=path.join(__dirname,'../production_log');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);


// The file will be called 'access.log'
const accessLogStream=rfs.createStream('access.log',{
    interval:'1d',//1 day
    path:logDirectory
});

const development={
    name:'development',
    asset_path:'assets',
    session_cookie_key:'blahsomething',
    db:'benends_Production',
    smtp:{
            service:'gmail',
            host:'smtp.gmail.com',
            port:587,   //tls port
            secure:false,
            // identity ,who is sending the email
            auth:{
                user:'codingninjatest@gmail.com',
                pass:'uafppoqwoknrdcpy'
            }
    },
    google_clientID:"917986733590-60ed7a9t044ovpcjmeikgpg706617705.apps.googleusercontent.com",
    google_clientSecret:"yy-zCwz2p_Dd7ntKt7YJ8nKY",
    google_callbackURL:'http://localhost:8000/user/auth/google/callback',
    jwt_secreteKey:'benends',
    morgan:{
        mode:'dev',
        option:{
            stream:accessLogStream
        }
    }
}

const production={
    name:'production',
    asset_path:process.env.BENENDS_AUTH_PATH,
    session_cookie_key:process.env.BENENDS_SESSION_COOKIE_KEY,
    db:process.env.BENENDS_DB,
    smtp:{
            service:'gmail',
            host:'smtp.gmail.com',
            port:587,   //tls port
            secure:false,
            // identity ,who is sending the email
            auth:{
                user:process.env.BENENDS_USER,
                pass:process.env.BENENDS_PASSWORD
            }
    },
    google_clientID:process.env.BENENDS_GOOGLE_CLIENTID,
    google_clientSecret:process.env.BENENDS_GOOGLE_CLIENT_SECRET,
    google_callbackURL:process.env.BENENDS_GOOGLE_CALLBACKURL,
    jwt_secreteKey:process.env.BENENDS_JWT_SECRETKEY,
    morgan:{
        mode:'combined',
        option:{
            stream:accessLogStream
        }
    }

}

module.exports=eval(process.env.BENENDS_ENVIRONMENT)==undefined?development:eval(process.env.BENENDS_ENVIRONMENT);