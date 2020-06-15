const Post = require('../model/post');
const User=require('../model/user');
const Comment=require('../model/comment');
// var exec = require('exec');

// cont Post=require('../model/post');

module.exports.home=function(req,res)
{
    
    Post.find({})
    .populate('user')
    .populate({
        path:'comment',
        populate:{
            path:'userComment'
        }
    })
    .exec(function(err,post){
        if(err)
        {
            console.log("Error in find");
            return;
        }

        return res.render('home',{
            post:post
        });
    });

    


}