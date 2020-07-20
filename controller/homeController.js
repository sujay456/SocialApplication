const Post =require('../models/post');
const User =require('../models/user');
const user = require('../models/user');

module.exports.home= async (req,res)=>{
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
    try {
        let post=await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comment',
            populate:
            {
                path:'user'
            } 
        });
        
        let users=await User.find({});

        return res.render('home',{
            posts:post,
            user_friend:users
        });
    } catch (error) {
        console.log("Errro".error);
    }

   

    
    
}