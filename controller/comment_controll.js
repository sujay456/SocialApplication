const Comment=require('../model/comment');
const Post=require('../model/post');

module.exports.create=function(req,res)
{
   
//   We will first check whether the given post on which the comment is being made exist or not
    Post.findById(req.body.postId,function(err,post)
    {   
        if(err)
        {
            console.log("Error in finding post");
            return;
        }

        if(post)
        {
            Comment.create({
                comment:req.body.comment,
                userComment:req.user.id,
                post:req.body.postId
            },function(err,comment)
            {
                if(err)
                {
                    console.log("Error in creating the comment");
                    return;
                }

                //here you dont have to pass the id of the comment it will be automatically passed ,uff :)
                post.comment.push(comment);
                post.save();
                return res.redirect('back');
            });
        }
    });
}

