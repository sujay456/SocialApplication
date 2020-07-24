const nodemailer=require('../config/nodemailer');


exports.newComment=(comment)=>{
    console.log(comment);
    let htmlString=nodemailer.renderedTemplate({comment:comment},'./comments/newComment.ejs');

    // Here the renderedTemplate will recieve two arguments one the data we are passing as the contxt amd the other as the relative path to the file (ejs) itself


    nodemailer.transporter.sendMail({
        from:'codingninjatest@gmail.com',
        to:comment.user.email,
        subject:"New comment published",
        html:htmlString
    },(err,info)=>{
        if(err)
        {
            console.log("error",err);
        }
        console.log('Message is sent',info);
        return;
    });
}