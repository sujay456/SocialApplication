const passport=require('passport');
const LocalStragey=require('passport-local').Strategy;
const User=require('../models/user');


// Here the done function takes two arguments first is the error if not null and other argument as the user if not return false
passport.use(new LocalStragey({
    usernameField:email
    },
    function(email,password,done){
        User.findOne( {email:email},(err,user)=>{
          if(err)
          {
              console.log("Error in finding");
              return done(err) ;
          }
          if(!user || user.password!=password )
          {
              return done(null,false);
          } 
          
          return done(null,user);
        } );
    }
));
// This is for telling the server that we are keeping this key for the cookie encoding
passport.serializeUser( function(user,done){
    // whenver the user sign in this serializeuser is called and it will make the specified key a origin for the cookie session 
    done(null,user.id);
} );

// Deserialize user

passport.deserializeUser( (id,done)=>{
    User.findById(id,(err,user)=>{
        if(err)
        {
            return done(err);
        }
        return done(null,user);
    })
} );

module.exports=passport;