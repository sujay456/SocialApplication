const express=require('express');
const router=express.Router();

const postController=require('../controller/post_controll');

router.get('/local',postController.post);

module.exports=router;