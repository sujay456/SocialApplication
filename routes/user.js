const express=require('express');
const UserController=require('../controller/userController');
const router=express.Router();


router.get('/profile',UserController.profile);

router.get('/signin',UserController.signin);
router.get('/signup',UserController.signup);

router.post('/session',UserController.createSession);
router.post('/create',UserController.create);


module.exports=router;