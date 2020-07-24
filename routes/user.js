const express=require('express');
const passport=require('passport');
const UserController=require('../controller/userController');
const router=express.Router();


router.get('/profile',passport.CheckAuth,UserController.profile);

router.post('/update',passport.CheckAuth,UserController.update);


router.get('/signin',UserController.signin);
router.get('/signup',UserController.signup);
router.get('/signout',UserController.signout);
// Here passport will be used as a middleware
router.post('/session',passport.authenticate(
    'local',
    {failureRedirect:'/user/signin'},
),UserController.createSession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/user/signin'}),UserController.createSession);

router.post('/create',UserController.create);


module.exports=router;