const equipmentModel = require('../models/equipment_model');

module.exports.addEquipment = async (req,res) =>{

    try{
        let {id, name, status} = req.body;
    
        let existingEquipment = await equipmentModel.findOne({id});
        if(existingEquipment)
            return res.status(401).send('Equipment With This ID already Exists');
    
        let newEquipment = await equipmentModel.create({
            id,
            name,
            status
        })
        res.send(newEquipment);
    }
    catch(err){
        console.log(err.message);
    }
}


module.exports.updateEquipment = async (req,res) =>{
    try{
        let {id, name, status} = req.body;
    
        let existingEquipment = await equipmentModel.findOneAndUpdate({id},{status},{new: true});
        if(!existingEquipment)
            return res.status(401).send('Equipment with this id not found');

        res.send(existingEquipment);
    }
    catch(err){
        console.log(err.message);
    }
}


module.exports.removeEquipment = async (req,res) =>{
    try{
        let {id} = req.body;

        let Equipment = await equipmentModel.findOneAndDelete({id});
        if(!Equipment) 
            return res.status(401).send('Something Went Wrong');
        res.send("Equipment Deleted")
    }
    catch(err){
        console.log(err.message);
    }   
}


module.exports.listEquipments = async (req, res) => {
    try {
      // Fetch list of all equipment
      const equipmentList = await equipmentModel.find();
      
      // Get the total count of equipment
      const totalEquipments = await equipmentModel.countDocuments();
  
      // Send response with the equipment list and total count
      res.status(200).json({
        total: totalEquipments,
        equipments: equipmentList
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  