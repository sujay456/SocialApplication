const Queue=require('../config/kue');

const commentMailer=require('../mailer/comments_mailer');

// Whenever a new task is assigned it has to run that is the
// meaning of .process
Queue.process('emails',function(job,done){
    console.log("Worker is processing your request",job.data);
    commentMailer.newComment(job.data);
    done();
});