module.exports.home=function(req,res)
{
    console.log(req.cookies);
    res.cookie('id',25);
    res.render('home');
}