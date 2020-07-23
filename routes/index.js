const express =require('express');
const router=express.Router();
const HomeController=require('../controller/homeController');

console.log("In the test");


router.get('/',HomeController.home);

router.use('/user',require('./user'));

router.use('/post',require('./post'));

router.use('/comment',require('./comment'));

router.use('/api',require('./api'));
module.exports=router;