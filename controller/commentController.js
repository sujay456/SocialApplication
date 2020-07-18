const Comment=require('../models/comment');
const Post=require('../models/post');
module.exports.Create=(req,res)=>{

    // console.log(req.body);
    // console.log(req.query);
  
    Post.findById(req.query.id,(err,post)=>{
        if(err)
        {
            console.log('Error in finding the post on which u are commenting',err);
            return;
        }

        if(post)
        {
            Comment.create( { 
                content:req.body.content,
                user:req.user.id,
                post:req.query.id },(err,newComment)=>{
                if(err)
                {
                    console.log("Error in creating the comment",err);
                    return;
                }
                post.comment.push(newComment);
                post.save();
                 return res.redirect('back');
                
            });
        }
        
    })

}