const passport=require('passport');

const LocalStrategy=require('passport-local').Strategy;

const User=require('../model/user');

passport.use(new LocalStrategy({
    usernameField:'email'
    },

    function(email,password,done)
    {
        User.findOne({email:email},function(err,user)
        {
            if(err)
            {
                console.log("Error in finding");
                return done(err);
            }

            if(!user || user.password!=password)
            {
                return done(null,false);
            }
            //authentication is not been done therefore false
            return done(null,user);
        });
    }
));


//serializing the user to decide which key to sent in cookies

passport.serializeUser(function(user,done)
{
    done(null,user.id);
})

//de the iser from the key in the cookie

passport.deserializeUser(function(id,done)
{
    User.findById(id,function(err,user)
    {
        if(err)
        {
            return done(err);
        }

        return done(null,user);
    });
});


module.exports=passport;