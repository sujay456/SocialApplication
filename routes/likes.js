const express =require('express');
const router=express.Router();
const LikeController=require('../controller/likeController');



router.get('/toggle',LikeController.ToggleLike);




module.exports=router;
