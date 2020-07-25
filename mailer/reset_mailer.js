// const nodeMailer=require('../config/nodemailer');
const nodemailer = require('../config/nodemailer');


exports.newMailer=(reset)=>{
    console.log("reset",reset);
    let htmlString=nodemailer.renderedTemplate({reset:reset},'/reset/reset.ejs');

    nodemailer.transporter.sendMail({
        from:'codingninjatest@gmail.com',
        to:reset.user.email,
        subject:'Reset Password',
        html:htmlString
    },(err,info)=>{
        if(err)
        {
            console.log("Error",err);
            return;
        }
        console.log("Message sent",info);
    });
}