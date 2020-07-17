const Post=require('../models/post');


module.exports.postCreate=(req,res)=>{
    Post.create( {content:req.body.content,user:req.user.id },(err,newPost)=>{
        if(err)
        {
            console.log("Error in creating the post",err);
            return;
        }
        console.log(newPost);
        return res.redirect('back');
    } );
}