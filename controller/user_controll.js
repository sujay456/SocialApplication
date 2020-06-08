const Profile=require('../model/user');

module.exports.profile=function(req,res)
{
    res.render('profile');
}

module.exports.signin=function(req,res)
{
    res.render('signin')
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
            })
        }
        else
        {
            
            return res.redirect('back');

        }
    })
}

