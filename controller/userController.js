const User=require('../models/user');
const Reset=require('../models/reset');
const fs =require('fs');
const path=require('path');
const crypto=require('crypto');
const reset_mailer=require('../mailer/reset_mailer');

const queue=require('../config/kue');
const reset_mailer_worker=require('../workers/reset_mailer_worker');

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
                user.name=req.body.name;
                user.email=req.body.email;

                if(req.file)
                {
                    if(user.avatar)
                    {
                        fs.existsSync(path.join(__dirname,'..',user.avatar),function(err,stat){
                            if(err)
                            {
                                console.log(err);
                                user.avatar=User.avatarPath+'/'+req.file.filename;
                                return res.redirect('back');
                            }
                            console.log(stat);
                            fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                        });
                    }
                    user.avatar=User.avatarPath+'/'+req.file.filename;
                }
                user.save();
                return res.redirect('back');
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

module.exports.resetForm=function(req,res){

    return res.render('resetform',{
        mailSent:false
    });
}

module.exports.access=async function(req,res){
    
    try {
        let user=await User.findOne({email:req.body.email});
        console.log("user",user);
        if(!user)
        {
            
            req.flash('error',"Invalid Username");
            return res.redirect('back');
        }
        else
        {
           let reset=  await (await Reset.create({ user:user.id,accessToken:crypto.randomBytes(30).toString('hex'),isValid:true }));
           reset=await reset.populate('user','email').execPopulate();

        //    reset_mailer.newMailer(reset);
            let job=queue.create('reset',reset).save(function(err)
            {
                if(err)
                {
                    console.log("Error in creating the job",err);
                    return;

                }

                console.log("Your job is being enqued in the reset queue",job.id);
            })


            return res.render('resetform',{
                mailSent:true
            });
        }
    } catch (error) {
        console.log(error);
    }
    
}

module.exports.LinkClicked=function(req,res)
{
    Reset.findOne({accessToken:req.query.accessToken},function(err,reset){
        if(err)
        {
            console.log("Error in finding the reset in accessToken",err);
        }
        console.log(reset);
        if(reset.isValid)
        {
            reset.isValid=false;
            reset.save();
            return res.render('changePass',{
                userId:reset.user._id
            });
        }
        else
        {
            return res.send("Bad request Link is expired");
        }
    });
}

module.exports.change=(req,res)=>{
    console.log(req.body);

    if(req.body.password==req.body.Cpassword)
    {
        User.findByIdAndUpdate(req.body.id,{password:req.body.password},function(err,updatedUser){
            if(err)
            {
                console.log(err);
                return;
            }
            console.log(updatedUser);
            return res.redirect('/user/signin');
        });

    }

}