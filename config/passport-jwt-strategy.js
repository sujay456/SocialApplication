const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;  //fot extraction the hwt from headers
const env=require('./environment');
const User = require('../models/user');


let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),  //this is jus telling to extract jwt from request 's header inside the authorization inside bearer token
    secretOrKey: env.jwt_secreteKey //this is key for decryption
}


passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){
    console.log('jwt',jwtPayLoad);
    User.findById(jwtPayLoad._id, function(err, user){
        if (err){console.log('Error in finding user from JWT'); return;}

        if (user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    })

}));

module.exports = passport;
