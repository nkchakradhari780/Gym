const jwt = require('jsonwebtoken')
const managerModel = require('../models/manager_model')

module.exports = async (req,res,next) =>{
    try {
        const token = req.cookies.token

        if(!token){
            return res.status(401).json({Message: "Unauthorized: No token provided"})
        }

        const decoded = jwt.verify(token,process.env.JWT_KEY)
        const manager = await managerModel
            .findById(decoded.managerId)
            .select("-password");

        if(!manager){
            return res.status(401).json({message: "Manager Not Found"})
        }

        if(manager.role !== 'manager'){
            return res.status(403).json({message: "Unauthorized Manager"})
        }
        
        req.manager = manager;
        next();
    } 
    catch (error) {
        console.error(error)
    }
}
