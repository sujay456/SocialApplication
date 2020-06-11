const express=require('express');
const profileController=require('../controller/user_controll');
const passport=require('passport');
const router=express.Router();




router.get('/profile',passport.checkAuth,profileController.profile);

router.get('/sign_in',profileController.signin);

router.get('/sign_up',profileController.signup);

router.post('/create',profileController.create);

router.get('/sign_out',profileController.destroySession);

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign_in'}
),profileController.createSession);

module.exports=router;