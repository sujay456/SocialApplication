const queue=require('../config/kue');

const reset_mailer=require('../mailer/reset_mailer');


queue.process('reset',function(job,done){
    console.log("Workers are doing ur job",job.data);

    reset_mailer.newMailer(job.data);
    done();
})