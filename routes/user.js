const express=require('express');
const profileController=require('../controller/user_controll');

const router=express.Router();





router.get('/profile',profileController.profile);

module.exports=router;