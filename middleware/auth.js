const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");
dotenv.config()


module.exports = function(req, res, next){

    //Get token from header
    const token = req.header('Authorization');

    //check if no token
    if(!token){
        return res.status(401).json({ msg: 'No token, authorization denied'});
    }

    //verify token
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)

        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Invalid Token'})
    }
}
