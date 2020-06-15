const express=require('express');
const router=express.Router();

const postController=require('../controller/post_controll');
const passport = require('passport');

// const passport=require('passport');
// router.get('/local',postController.post);

router.post('/create',passport.checkAuth,postController.create);

module.exports=router;

