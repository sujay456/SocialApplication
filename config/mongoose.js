const mongoose=require('mongoose');
const env=require('./environment');
mongoose.connect(`mongodb://localhost/${env.db}`);

const db=mongoose.connection;

db.on('error',(err)=>{ console.error.bind(console,"Error connecting to mongodb"); })

db.once('open',()=>{
    console.log("Connected to mongodb");
})


module.exports=db;