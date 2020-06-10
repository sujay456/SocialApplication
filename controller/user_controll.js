const Profile=require('../model/user');

module.exports.profile=function(req,res)
{
    console.log(req.cookies.user_id);
    res.cookie('something',"hello cookie");
    if(req.cookies.user_id)
    {
        Profile.findById(req.cookies.user_id,function(err,user)
        {
            if(err)
            {
                console.log("err in still logging in");
                return ;
            }
            if(user)
            {
                return res.render('profile',
                {
                    info:user
                });
            }
            else
            {
                return res.redirect('/user/sign_in');

            }
        });
    }
    else{
        return res.redirect('/user/sign_in');
    }


}

module.exports.signin=function(req,res)
{
    console.log(req.cookies);
    if(req.cookies.user_id)
    {
        console.log('hi');
        Profile.findById(req.cookies.user_id,function(err,user)
        {
            if(err)
            {
                console.log("Error in the signin");
                return ;
            }
            console.log("Here");
            if(user)
            {
                return res.redirect('/user/profile');
            }
            else
            {
                return res.render('signin');

            }
            // res.render('signin');
        });
    }
    else
    {
        res.render('signin');
    }
}

module.exports.signup=function(req,res)
{
    res.render('signup');
}

module.exports.create=function(req,res)
{
    console.log(req.body);
    
    Profile.findOne({email:req.body.email},function(err,account)
    {
        if(err)
        {
            console.log("Error in finding");
            return ;
        }

        if(!account)
        {
            Profile.create(req.body,function(err,account)
            {
                if(err)
                {
                    console.log('Err');
                    return;
                }

                return res.redirect('/user/sign_in');
            });
        }
        else
        {
            
            return res.redirect('back');

        }
    });
}

//for the signing in 

module.exports.session=function(req,res)
{
    console.log(req.body);
    
    Profile.findOne(req.body,function(err,presentProfile)
    {
        if(err)
        {
            console.log("Error in finding the account");
            return;
        }

        if(!presentProfile)
        {
            console.log("There is no such profile");
            return res.redirect('back');
        }
        else
        {
            if(req.body.password==presentProfile.password)
            {
                    res.cookie('user_id',presentProfile._id);
                    return res.render('profile',{
                    info:presentProfile
                    });
            
            }
            else{
                return res.redirect('back');
            }

        }
    });

}

module.exports.Signout=function(req,res)
{
    res.clearCookie('user_id');

    return res.render('signin');
}