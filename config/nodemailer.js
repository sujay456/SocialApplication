const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');
const env=require('./environment');

let transporter=nodemailer.createTransport(env.smtp);

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