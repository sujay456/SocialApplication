const Post = require('../model/post');
const User=require('../model/user');
// var exec = require('exec');

// cont Post=require('../model/post');

module.exports.home=function(req,res)
{
    
    Post.find({}).populate('user').exec(function(err,post){
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