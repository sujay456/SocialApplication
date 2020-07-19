module.exports.setFlash=(req,res,next)=>{
    // console.log(req.flash);
    res.locals.flash=
    {
        'success':req.flash('success'),
        'error':req.flash('error')
    };
    next();
}