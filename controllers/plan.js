const planModel = require('../models/plan_module');

module.exports.createPlan = async (req, res) => {
    try {
      let { planID, level, planName, price, duration, category, facilities } = req.body;
  
      // Validate input (basic example)
      if (!planID || !level || !price || !duration || !category) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      // Check if the plan already exists
      let existingPlan = await planModel.findOne({ planID });
      if (existingPlan) {
        return res.status(409).json({ error: "Plan ID already exists" });  // Conflict status
      }
  
      // Create the new plan
      let newPlan = await planModel.create({
        planID,
        level,
        planName,
        price,
        duration,
        category,
        facilities  // Handle dynamic facilities array (if provided)
      });
  
      // Send response with the newly created plan
      return res.status(201).json(newPlan);  // Status 201: Created
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Server error" });  // Internal server error
    }
  };

  module.exports.deletePlan = async (req,res)=>{
    try{
      let {planID} = req.body;
  
      let plan = await planModel.findOneAndDelete({planID});
      if(!plan) return res.status(401).send("Something Went Wrong");
      res.send("plan Deleted")
    }
    catch(err){
      console.log(err.message);
    }
  }

module.exports.updatePlan = async (req,res) =>{
    try{
        let {planID, level, planName, price, duration, category} = req.body;

        let existingPlan = await planModel.findOneAndUpdate({planID},{level,planName,price,duration,category},{new: true});
        if(!existingPlan)
          return res.status(401).send("Something Went wrong");
    }
    catch(err){
        console.log(err.message);
    }
}

module.exports.listPlans = async (req,res) =>{
    try{
        let plansList = await planModel.find();
        res.json(plansList);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}
