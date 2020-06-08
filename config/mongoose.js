const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost/benends_development");

const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error"));

db.once('open',function()
{
    console.log("Connected to mongodb");
});

module.exports=db;


