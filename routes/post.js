const express=require('express');
const router=express.Router();

const PostController =require('../controller/postController');



router.post('/create',PostController.postCreate);

module.exports=router;