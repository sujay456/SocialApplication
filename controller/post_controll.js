const Post =require('../model/post');
// const Test=require('../model/test');
// const Post = require('../routes');

module.exports.create=function(req,res)
{
    
    Post.create({content:req.body.content , user:req.user.id},function (err,post) {
        if(err){console.log("ERror in post"); return;}
        console.log(post);
        return res.redirect('back');
    });   
}