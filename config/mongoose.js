const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/benends_Production');

const db=mongoose.connection;

db.on('error',(err)=>{ console.error.bind(console,"Error connecting to mongodb"); })

db.once('open',()=>{
    console.log("Connected to mongodb");
})


module.exports=db;