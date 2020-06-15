const Comment=require('../model/comment');

module.exports.create=function(req,res)
{
   
    Comment.create({
        comment:req.body.comment,
        post:req.query.postid,
        userComment:req.user.id
    },function(err,comment)
    {
        if(err)
        {
            console.log("Err in making comment");
            return;
        }
        console.log(comment);
        return res.redirect('back');
    });
}