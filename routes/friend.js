const express=require('express');
const router=express.Router();
const FriendController=require('../controller/friendController');

router.get('/send',FriendController.SendFriendReq);

module.exports=router;