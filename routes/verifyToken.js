const jwt = require("jsonwebtoken");

function isLoggedIn(req,res,next){
    const token = req.header("auth-token");
    if(!token) return res.status(401).json({Message:'AccessDenied'});
    try{
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = verified._id;
        next();
    }
    catch (err){
        res.status(401).json({Error:"Invalid token"})
    }
}
function isAdmin(req,res,next){
    const token = req.header("auth-token");
    if(!token) return res.status(401).json({Message:'AccessDenied'});
    try{
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if(verified._type!="admin")return res.status(403).json({Message:'You do not have permission'})
        next();
    }
    catch (err){
        res.status(401).json({Error:"Invalid token"})
    }
}
module.exports.isLoggedIn = isLoggedIn;
module.exports.isAdmin = isAdmin;