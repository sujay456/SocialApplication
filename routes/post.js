const express=require('express');
const router=express.Router();

const postController=require('../controller/post_controll');

// router.get('/local',postController.post);

router.post('/create',postController.create);

module.exports=router;

