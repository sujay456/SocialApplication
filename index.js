const express=require('express');
const port=8000;

const app=express();

app.set('view engine','ejs');
app.set('views','./views');
app.use('/',require('./routes'));



app.listen(port,function(err)
{
    if(err)
    {
        console.log(`Error:${err}`);
        return;
    }
    console.log(`The server is up and running on port:${port}`);
})