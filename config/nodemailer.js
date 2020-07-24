const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');


let transporter=nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,   //tls port
    secure:false,
    // identity ,who is sending the email
    auth:{
        user:'codingninjatest@gmail.com',
        pass:'sujay@2001'
    }
});

let renderedTemplate=(data,relativePath)=>{
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname,'../views/mailer',relativePath),
        data,
        function(err,template){
            if(err)
            {
                console.log('Error in renderring template',err);
                return;
            }
            mailHtml=template;
        }
    )
    return mailHtml;
}
module.exports={
    transporter:transporter,
    renderedTemplate:renderedTemplate
}