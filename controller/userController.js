const User=require('../models/user');
const { findOne, findById } = require('../models/user');

module.exports.profile=(req,res)=>{

    
        User.findById(req.query.userid,(err,user)=>{
            return res.render('profile',{
                profile_user:user
            });
        })
    
    
}

module.exports.update=async (req,res)=>{

    // if(req.user.id==req.query.id)
    // {
    //     User.findByIdAndUpdate(req.query.id,req.body,(err,Updateduser)=>{
    //         if(err)
    //         {
    //             console.log('Error in updating the user',err);
    //             return;
    //         }

    //         return res.redirect('back');
    //     });
    // }
    // else 
    // {
    //     return res.status(401).send('Unauthorized');
    // }

    if(req.user.id==req.query.id)
    {
        try {
            let user= await User.findById(req.query.id);

            User.uploadedAvatar(req,res,function(err){
                if(err)
                {
                    console.log('error',err);
                    return;
                }
                console.log(req.file);
            });
        } catch (error) {
            if(error)
            {
                console.log('error',error);
                
            }
        }
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

module.exports.create=async (req,res)=>{

    // console.log(req.body);

   try {
    let user=await User.findOne({email:req.body.email });

    if(!user)
        {
            await User.create(req.body);
            req.flash('success','Account  created');
            return res.redirect('/user/signin');
        }
        else
        {
            req.flash('error','Email already in use ');
            res.redirect('back');
        } 
   } catch (error) {
       console.loh("Error",error);
   }
}

module.exports.createSession=(req,res)=>{

    // console.log(req.user);
    req.flash('success','Logged in Succesfully');
    return res.redirect('/');

}

module.exports.signout=(req,res)=>
{
    req.logout();
    res.clearCookie('benends');
    req.flash('success','Logged Out');

    res.redirect('/user/signin');
}
