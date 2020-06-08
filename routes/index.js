const express=require('express');
const homeController=require('../controller/home_controll');


const router=express.Router();


router.get('/',homeController.home);

router.use('/user',require('./user'));



router.use('/local',require('./local'));


module.exports=router;