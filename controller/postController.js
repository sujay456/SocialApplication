const Post=require('../models/post');
const User=require('../models/user');

module.exports.postCreate=(req,res)=>{
    
    User.findById(req.user.id , (err,user)=>{
        if(err)
        {
            console.log('Error in finding who is creating this post',err);
            return;
        }

        if(user)
        {
            Post.create( {content:req.body.content,user:req.user.id },(err,newPost)=>{
                if(err)
                {
                    console.log("Error in creating the post",err);
                    return;
                }
        
                console.log(newPost);
                user.post.push(newPost);
                user.save();
                return res.redirect('back');
            } );
        }
    })
}