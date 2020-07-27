const mongoose=require('mongoose');
const user = require('./user');

const FriendshipSchema=new mongoose.Schema({
    from_whom:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    to_whom:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true  
    }
},{
    timestamps:true
});

const FriendShip=mongoose.model('Friendship',FriendshipSchema);

module.exports=FriendShip;