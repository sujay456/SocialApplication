const express=require('express');
const port=8000;

const app=express();

const expressLayout=require('express-ejs-layouts');
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.set('view engine','ejs');
app.set('views','./views');

app.use(express.static('./assets'));
// use it before routes
app.use(expressLayout);

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