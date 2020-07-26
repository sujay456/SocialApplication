const Post=require('../models/post');
const Comment=require('../models/comment');
const Like=require('../models/like');
const { query } = require('express');


module.exports.ToggleLike= async function(req,res)
{

    // /like/toggle?id=asdas&type=Post
    console.log(req.query);
    try {
        let likedon;
        let deleted=false;
        if(req.query.type=='Post')
        {
            likedon=await Post.findById(req.query.id).populate('like');
        }
        else
        {
            likedon=await Comment.findById(req.query.id).populate('like');    
        }

        let alreadyLiked=await Like.findOne({user:req.user.id,likedon:req.query.id,onModel:req.query.type});
        if(alreadyLiked)
        {
            // delete
            likedon.like.pull(alreadyLiked._id);
            likedon.save();
            deleted=true;
            alreadyLiked.remove();
        }
        else
        {
            // Create a Like

            let newLike=await Like.create({user:req.user.id,likedon:req.query.id,onModel:req.query.type});

            likedon.like.push(newLike);
            likedon.save();

        }

        return res.json(200,{
            message:'Request succesfull',
            data:{
                numberLikes:likedon.like.length,
                deleted:deleted
            }
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message:'Internal server Error'
        })
    }
}