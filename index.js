const express=require('express');
const port=8000;

const app=express();

app.get('/',(req,res)=>{
    res.send("Hi");
})

app.listen(port,(err)=>{
    if(err)
    {
        console.log("Error");
    }
    console.log(`Server is up and running: ${port} `);
});