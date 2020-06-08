const express=require('express');
const profileController=require('../controller/user_controll');

const router=express.Router();




router.get('/profile',profileController.profile);

router.get('/sign_in',profileController.signin);

router.get('/sign_up',profileController.signup);

router.post('/create',profileController.create);
module.exports=router;