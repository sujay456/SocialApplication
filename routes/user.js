const express=require('express');
const UserController=require('../controller/userController');
const router=express.Router();


router.get('/profile',UserController.profile);

router.get('/signin',UserController.signin);
router.get('/signup',UserController.signup);


module.exports=router;