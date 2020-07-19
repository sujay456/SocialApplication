const User=require('../models/user');
const { findOne } = require('../models/user');

module.exports.profile=(req,res)=>{

    
        User.findById(req.query.userid,(err,user)=>{
            return res.render('profile',{
                profile_user:user
            });
        })
    
    
}

module.exports.update=(req,res)=>{

    if(req.user.id==req.query.id)
    {
        User.findByIdAndUpdate(req.query.id,req.body,(err,Updateduser)=>{
            if(err)
            {
                console.log('Error in updating the user',err);
                return;
            }

            return res.redirect('back');
        });
    }
    else 
    {
        return res.status(401).send('Unauthorized');
    }
}

module.exports.signup=(req,res)=>{
    if(req.isAuthenticated())
    {
        return res.redirect('/user/profile');
    }
    return res.render('signup');
}


module.exports.signin=(req,res)=>{
    if(req.isAuthenticated())
    {
        return res.redirect('/user/profile');
    }
    return res.render('signin');
}

module.exports.create=(req,res)=>{

    // console.log(req.body);

    User.findOne({email:req.body.email },(err,user)=>{
        if(err)
        {
            console.error.bind(console,"Errror");
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

    // console.log(req.user);
    return res.redirect('/');

}

module.exports.signout=(req,res)=>
{
    req.logout();
    res.clearCookie('benends');
    res.redirect('/user/signin');
}
