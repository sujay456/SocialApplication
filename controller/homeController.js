const Post =require('../models/post');

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

    Post.find({}).populate('user').exec( (err,post)=>{
        return res.render('home',{
            posts:post
        })
    } )
    
}