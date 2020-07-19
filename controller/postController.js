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
            let newPost=await Post.create( {content:req.body.content,user:req.user.id });
            
            // console.log(newPost);
                user.post.push(newPost);
                user.save();
                return res.redirect('back');
        }
    } catch (error) {
        console.log('Error',error);
        return;
    }
    
}


module.exports.delete=(req,res)=>{

    console.log(req.params.id);
    Post.findById(req.params.id,(err,post)=>{
        if(err)
        {
            console.log('Error in finding the post to be deleted ',err);
            return;
        }

        // It is a second check to see whether the user who is deleting the post actually created it 

       if(post.user==req.user.id)
       {
        
            post.remove();

            Comment.deleteMany( {post:req.params.id},(err)=>{
                if(err)
                {
                    console.log("Error in deleting the components",err);
                    return;
                }
                return res.redirect('back');
            } );
        
        
       }
       else
       {
            return res.redirect('back');
       }

    });
}