module.exports.index=function(req,res)
{
    return res.status(200).json({
        data:{
            message:'v2',
            posts:[]
        }
    })
}