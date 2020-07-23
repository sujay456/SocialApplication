const express=require('express');
const router=express.Router();

const postApiController=require('../../../controller/api/v1/post_api');

router.get('/',postApiController.index);
router.delete('/:id',postApiController.delete);

module.exports=router;