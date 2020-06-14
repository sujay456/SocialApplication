const Profile=require('../model/user');

module.exports.profile=function(req,res)
{
    res.render('profile');
}

module.exports.signin=function(req,res)
{
    if(req.isAuthenticated())
    {
       return res.redirect('/user/profile');
    }

    res.render('signin');
}

module.exports.signup=function(req,res)
{
    if(req.isAuthenticated())
    {       
        return res.redirect('/user/profile');
    }

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

module.exports.createSession=function(req,res)
{
    // return res.send('hi');
    return res.redirect('/');
}

module.exports.destroySession=function(req,res)
{
//    this logout function is given by passport
    req.logout();

    return res.redirect('/user/sign_in');
}
