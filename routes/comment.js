const express=require('express');

const router=express.Router();
const CommentController=require('../controller/comment_controll');

router.post('/create',CommentController.create);



module.exports=router;