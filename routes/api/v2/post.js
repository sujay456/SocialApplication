const express=require('express');
const router=express.Router();
const postApiController=require('../../../controller/api/v2/post_api');


router.get('/',postApiController.index);


module.exports=router;