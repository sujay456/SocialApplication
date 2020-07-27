const User=require('../models/user');
// const Friend=require('../models/friendship');
const FriendShip = require('../models/friendship');

module.exports.SendFriendReq=async function(req,res)
{
    
    try {

        // console.log('From whom',req.user.id);
        // console.log('To Whom',req.query.to);

        let friend= await FriendShip.findOne({from_whom:req.user._id,to_whom:req.query.to});
        // console.log(friend);
        if(!friend)
        {
            let newFriend=await FriendShip.create({from_whom:req.user._id,to_whom:req.query.to});
            console.log(newFriend);

            let user=await User.findByIdAndUpdate(req.user.id);

            // console.log(user);
            user.friends.push(newFriend);
            user.save();

            return res.json(200,{
                type:1,
                message:'You Two are friends now'
            });
        }
        else
        {
            let user=await User.findByIdAndUpdate(req.user.id).populate('friends');
            console.log('user',user);

            user.friends.pull(friend);
            user.save();
            friend.remove();

            return res.json(200,{
                type:0,
                message:'Removed from the friend'
            });
        }


    } catch (error) {
        console.log("Error in freinds controller",error);
        return res.json(500,{
            message:'internal server error'
        })
    }    

}