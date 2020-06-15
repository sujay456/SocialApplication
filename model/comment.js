const mongoose=require('mongoose');

const commentSchema=new mongoose.Schema({
    comment:{
        type:String
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post'
    },
    userComment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},{
    timestamps:true
});

const Comment=mongoose.model('comment',commentSchema);

module.exports=Comment;