const jwt = require('jsonwebtoken')
const customerModel = require('../models/costumer_model')

module.exports = async (req,res,next) =>{
    try {
        const token = req.cookies.token

        if(!token){
            return res.status(401).json({Message: "Unauthorized: No token provided"})
        }

        const decoded = jwt.verify(token,process.env.JWT_KEY)
        const customer = await customerModel
            .findById(decoded.customerId)
            .select("-password");

        if(!customer){
            return res.status(401).json({message: "Customer Not Found"})
        }

        if(customer.role !== 'customer'){
            return res.status(403).json({message: "Unauthorized Customer"})
        }
        
        req.customer = customer;
        next();
    } 
    catch (error) {
        console.error(error)
    }
}

