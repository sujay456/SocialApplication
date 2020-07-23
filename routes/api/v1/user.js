const express=require('express');
const router=express.Router();

const userApiController=require('../../../controller/api/v1/user_api');

router.post('/create-session',userApiController.createSession);

module.exports=router;