const development={
    name:'development',
    asset_path:'/assets',
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
    jwt_secreteKey:'benends'
}

const production={
    name:'production'
}

module.exports=development;