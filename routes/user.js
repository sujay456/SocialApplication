const express=require('express');
const passport=require('passport');
const UserController=require('../controller/userController');
const router=express.Router();


router.get('/profile',UserController.profile);

router.get('/signin',UserController.signin);
router.get('/signup',UserController.signup);

// Here passport will be used as a middleware
router.post('/session',passport.authenticate(
    'local',
    {failureRedirect:'/user/signin'},
),UserController.createSession);

router.post('/create',UserController.create);


module.exports=router;