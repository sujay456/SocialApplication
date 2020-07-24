const Post=require('../../../models/post');
const Comment=require('../../../models/comment');
const User=require('../../../models/user');

module.exports.index=async function(req,res)
{
    let posts=await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comment',
            populate:
            {
                path:'user'
            } 
        });

    return res.json(200,{
        message:"List of posts",
        posts:posts
    });
}

module.exports.delete= async (req,res)=>{

    // console.log(req.params.id);
    try {
        let post=await Post.findById(req.params.id);
        // console.log(post);
        console.log('user',req.user);
        if(post.user==req.user.id)
       {
        
            let userId=post.user;
            post.remove();
            
            await User.findByIdAndUpdate(userId,{ $pull:{post:req.params.id} });


            await Comment.deleteMany( {post:req.params.id} );
            
                return res.status(200).json({
                    data:{
                        postId:req.params.id
                    },
                    message:'post Deleted'
                });
       }
       else
       {
            return res.json(401,{
                message:'Unauthorized'
            });
       }
    } catch (error) {
        console.log("Error",error);
        return res.json(500,{
            message:"Internal server error"
        })
    }

}