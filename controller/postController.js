const Post=require('../models/post');
const User=require('../models/user');
const Comment=require('../models/comment');


// -----------------without async await------------
// module.exports.postCreate=(req,res)=>{
    
//     User.findById(req.user.id , (err,user)=>{
//         if(err)
//         {
//             console.log('Error in finding who is creating this post',err);
//             return;
//         }

//         if(user)
//         {
//             Post.create( {content:req.body.content,user:req.user.id },(err,newPost)=>{
//                 if(err)
//                 {
//                     console.log("Error in creating the post",err);
//                     return;
//                 }
        
//                 console.log(newPost);
//                 user.post.push(newPost);
//                 user.save();
//                 return res.redirect('back');
//             } );
//         }
//     })
// }

// -------------------with using async await ------------------
module.exports.postCreate=async (req,res)=>{
    
    try {
        let user=await User.findById(req.user.id);  

        if(user)
        {
            // console.log(req);
            let newPost=await Post.create( {content:req.body.content,user:req.user.id });

                if(req.xhr)
                {
                    return res.status(200).json({
                        data:{
                            post:newPost
                        },
                        message:'Post Created!'
                    });
                }
            // console.log(newPost);
                user.post.push(newPost);
                user.save();
                req.flash('success','Post publihed');
                return res.redirect('back');
        }
    } catch (error) {
        console.log('Error',error);
        return;
    }
    
}


module.exports.delete= async (req,res)=>{

    // console.log(req.params.id);
    try {
        let post=await Post.findById(req.params.id);

    if(post.user==req.user.id)
       {
        
            post.remove();
            if(req.xhr)
            {
                return res.status(200).json({
                    data:{
                        postId:req.params.id
                    },
                    message:'post Deleted'
                });
            }
            await Comment.deleteMany( {post:req.params.id} );
            
            req.flash('success','Post deleted');
            return res.redirect('back');

        
       }
       else
       {
            return res.redirect('back');
       }
    } catch (error) {
        console.log("Error",error);
    }

}