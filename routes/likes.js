const express =require('express');
const router=express.Router();
const LikeController=require('../controller/likeController');



router.post('/toggle',LikeController.ToggleLike);




module.exports=router;
