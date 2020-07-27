const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');

const AVATAR_PATH=  path.join('/uploads/users/avatar');


const userSchema=new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true            
        },
        password:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        post:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Post'
            }
        ],
        avatar:{
            type:String
        },
        friends:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Friendship'
            }
        ]
    },
    {
        timestamps:true
    }
);

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });
   
userSchema.statics.uploadedAvatar=multer({storage: storage}).single('avatar'); //this say only one file will be uploaded at a time
userSchema.statics.avatarPath=AVATAR_PATH;//This will be used in the controller

const user=mongoose.model("User",userSchema);
module.exports=user;