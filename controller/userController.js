const User=require('../models/user');
const { findOne } = require('../models/user');

module.exports.profile=(req,res)=>{
    return res.render('profile');
}

module.exports.signup=(req,res)=>{
    return res.render('signup');
}


module.exports.signin=(req,res)=>{
    return res.render('signin');
}

module.exports.create=(req,res)=>{

    // console.log(req.body);

    User.findOne({email:req.body.email },(err,user)=>{
        if(err)
        {
            console.error.bind(console,"Errro");
            return;
        }
        if(!user)
        {
            User.create(req.body,(err,newUser)=>{
                if(err)
                {
                    console.error(err);
                    return;
                }
                // console.log(newUser);
                return res.render('signin');
            })
        }
        else{
            res.redirect('back');
        }
    })
}

module.exports.createSession=(req,res)=>{


}