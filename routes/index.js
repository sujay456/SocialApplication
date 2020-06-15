const express=require('express');
const homeController=require('../controller/home_controll');


const router=express.Router();


router.get('/',homeController.home);

router.use('/user',require('./user'));



router.use('/post',require('./post'));

router.use('/comment',require('./comment'));


module.exports=router;