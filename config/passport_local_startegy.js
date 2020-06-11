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
                return done(null,false,{message:"Password is wrong or User not found"});
            }
            //authentication is not been done therefore false
            return done(null,user,{message:"Succesfully Logged in the account"});
        });
    }
));
 

//serializing the user to decide which key to sent in cookies

passport.serializeUser(function(user,done)
{
    console.log("Making a cookie");
    done(null,user.id);
});

//de the iser from the key in the cookie

//it is called right after serializing  
passport.deserializeUser(function(id,done)
{
    console.log("Deserilization")


    
    User.findById(id,function(err,user)
    {
        if(err)
        {
            return done(err);
        }

        return done(null,user);
    });
});


// this ia a middle to check whether the user is signed in or not
passport.checkAuth=function(req,res,next)
{
    if(req.isAuthenticated())
    {
        
        return next();
    }
    // if the user is not signed in
    // console.log("in the check middleware");
    return res.redirect('/user/sign_in');
     
}

passport.setAuth=function(req,res,next)
{
    if(passport.authenticate())
    {
        //whenever someone sign in passport set the info in the req.user
        res.locals.user=req.user;
    }
    // console.log("in the setAuth middleware");

    next();
}


//here we export only passport not the passport local 
module.exports=passport;