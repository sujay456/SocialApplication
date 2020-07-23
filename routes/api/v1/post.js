const express=require('express');
const router=express.Router();
const passport=require('passport');

const postApiController=require('../../../controller/api/v1/post_api');
// const { Passport } = require('passport');

router.get('/',postApiController.index);
router.delete('/:id',passport.authenticate('jwt',{session:false}),postApiController.delete);

module.exports=router;