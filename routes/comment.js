const express=require('express');
const router=express.Router();
const CommentController=require('../controller/commentController');
const passport=require('passport');


router.get('/delete',passport.CheckAuth,CommentController.delete);
router.post('/create',passport.CheckAuth,CommentController.Create);

module.exports=router;