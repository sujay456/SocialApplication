const express=require('express');
const router=express.Router();

const PostController =require('../controller/postController');
const passport=require('passport');


router.post('/create',passport.CheckAuth,PostController.postCreate);

module.exports=router;