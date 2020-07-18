const Post =require('../models/post');
const User =require('../models/user');
const user = require('../models/user');

module.exports.home=(req,res)=>{
    // console.log(req.cookies);
    // res.cookie('user',12);
    // Post.find({},(err,posts)=>{
    //     if(err)
    //     {
    //         console.log("In finding the posts",err);
    //         return;
    //     }

    //     return res.render('home',{
    //         posts:posts
    //     });
    // });

    Post.find({})
    .populate('user')
    .populate({
        path:'comment',
        populate:
        {
            path:'user'
        } 
    })
    .exec( (err,post)=>{
        
        User.find({},(err,users)=>{
            return res.render('home',{
                posts:post,
                user_friend:users
            });
        })

        
    } )
    
}