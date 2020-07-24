const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;

const crypto=require('crypto'); //for generating new random password 
const User=require('../models/user');

// tell passprt to use a new startegy for google login
passport.use(new googleStrategy({
    clientID:"917986733590-60ed7a9t044ovpcjmeikgpg706617705.apps.googleusercontent.com",
    clientSecret:"yy-zCwz2p_Dd7ntKt7YJ8nKY",
    callbackURL:'http://localhost:8000/user/auth/google/callback',
    },
    function(accessToken,refreshToken,profile,done){
        // find a user if found set this user as req.user
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err)
            {
                console.log('Error in google passport',err);
                return;
            }
            console.log(profile);
            if(user)
            {
                return done(null,user);
            }
            // If not found create the user and set its for req.user
            else
            {
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err)
                    {
                        console.log('Error in google passport',err);
                        return;
                    }
                    return done(null,user);
                })
            }

        })
    }
));

module.exports=passport;

