const jwt = require('jsonwebtoken')
const ownerModel = require('../models/owner_model')

module.exports = async (req,res,next) =>{
    try {
        const token = req.cookies.token

        if(!token){
            return res.status(401).json({Message: "Unauthorized: No token provided"})
        }

        const decoded = jwt.verify(token,process.env.JWT_KEY)
        const owner = await ownerModel
            .findById(decoded.Id)
            .select("-password");
        
        if(!owner){
            return res.status(401).json({message: "Owner Not Found"})
        }

        if(owner.role !== 'owner'){
            return res.status(403).json({message: "Unauthorized Owner"})
        }

        

        req.owner = owner;
        
        next();
    } 
    catch (error) {
        console.error(error)
    }
}

