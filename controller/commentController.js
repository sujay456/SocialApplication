const Comment=require('../models/comment');
const commentMailer=require('../mailer/comments_mailer');
const Post=require('../models/post');
const queue=require('../config/kue');
const commentEmailWorker=require('../workers/comment_email_worker');


module.exports.Create=async (req,res)=>{

    // console.log(req.body);
    // console.log(req.query);
  
    let post=await Post.findById(req.query.id).populate('user');
    
    if(post)
        {
            let newComment=await Comment.create( { 
                content:req.body.content,
                user:req.user.id,
                post:req.query.id });

                post.comment.push(newComment);
                post.save();

                newComment=await newComment.populate('user','name email').execPopulate();

                // commentMailer.newComment(newComment);
                let job=queue.create('emails',newComment).save(function(err){
                    if(err)
                    {
                        console.log("Error in workers controller");
                        return;
                    }
                    console.log("Job with name emails created and queued ",job.id);
                })
                if(req.xhr)
                {
                    return res.status(200).json({
                        data:{
                            comment:newComment,
                            username:post.user.name
                        },
                        message:'Comment Posted',
                        type:'success',
                        text:'Comment Posted'
                    });
                }
                 return res.redirect('back');
        }

}

module.exports.delete= async (req,res)=>{

    let comment=await Comment.findById(req.query.id);

    if(comment.user==req.user.id)
        {
            let postId=comment.post;
            comment.remove();

            await Post.findByIdAndUpdate(postId,{ $pull:{comment:req.query.id} });
            

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        commentId:req.query.id
                    },
                    type:'success',
                    text:'Comment Deleted',
                    message:'Comment Deleted Succesfully'
                });
            }
            return res.redirect('back');


        }
        
        else
        {
            if(req.xhr){
                return res.status(401).json({
                    message:'Comment Not deleted',
                    type:'error',
                    text:'Unauthorised'
                })
            }

            return res.redirect('back');

        }
}

module.exports.deleteUnAppro=(req,res)=>{

    Post.findById(req.query.pid,(err,post)=>{
        if(err)
        {
            console.log("Error in finding the post in deleting the comment",err);
            return;
        }
        if(post.user==req.user.id)
        {
            Comment.findById(req.query.cid,(err,comment)=>{
                if(err)
                {
                    console.log("Error in finding the comment to be deleted",err);
                    return;
                }
                let postId=comment.post;
                comment.remove();

                Post.findByIdAndUpdate(postId,{ $pull:{comment:req.query.cid} },(err,post)=>{
                    // As we dont need to do anything with the post so we are just returning from here
                    req.flash('success','comment deleted');
                    return res.redirect('back');
                });
                
            })   
        }
        else
        {
            return res.redirect('back');
            
        }
    });
}
