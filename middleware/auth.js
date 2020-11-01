const jwt = require('jsonwebtoken')

//will hide later
const secretKey = 'secret'


function processHeader(header) {
    // remove Bearer from header
    if(header){
        let tokenOnly = header.split("Bearer ")
        return tokenOnly[1];
    }    
  }

module.exports =  async function(req, res, next){

    //Get token from header
    const header = req.header('Authorization');
    
    const token = await processHeader(header)

    //check if no token
    if(!token){
        return res.status(401).json({ msg: 'No token, authorization denied'});
    }

    //verify token
    try {
        const decoded = jwt.verify(token, secretKey)
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Invalid Token'})
    }
}
