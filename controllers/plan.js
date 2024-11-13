const planModel = require('../models/plan_module');
const customerModel = require('../models/costumer_model');
const trainerModel = require('../models/trainer_model');
const ditePlanModel = require('../models/diteplan_model');

  // CREATE a new Plan
module.exports.createPlan = async (req, res) => {
  try {
    let { level, planName, price, duration, category, facilities } = req.body;

    // Validate input (basic example)
    if (!level || !price || !duration || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create the new plan
    let newPlan = await planModel.create({
      level,
      planName,
      price,
      duration,
      category,
      facilities,  // Handle dynamic facilities array (if provided)
    });

    // Send response with the newly created plan
    return res.status(201).json(newPlan);  // Status 201: Created
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Server error" });  // Internal server error
  }
};

// DELETE a Plan by ID
module.exports.deletePlan = async (req, res) => {
  try {
    const { id } = req.params;  // Get the plan ID from params

    let plan = await planModel.findByIdAndDelete(id);
    if (!plan) return res.status(404).json({ error: "Plan not found" });  // 404: Not found
    res.json({ message: "Plan deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// UPDATE a Plan by ID
module.exports.updatePlan = async (req, res) => {
  try {
    const { id } = req.params;  // Get the plan ID from params
    const { planID, level, planName, price, duration, category } = req.body;

    let updatedPlan = await planModel.findByIdAndUpdate(
      id,
      { level, planID, planName, price, duration, category },
      { new: true, runValidators: true }
    );
    if (!updatedPlan) return res.status(404).json({ error: "Plan not found" });  // 404: Not found
    res.json(updatedPlan);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// LIST all Plans
module.exports.listPlans = async (req, res) => {
  try {
    // Fetch list of all plans
    let plansList = await planModel.find();

    // Get the total count of plans
    let totalPlans = await planModel.countDocuments();

    // Send response with the plans list and total count
    res.status(200).json({
      total: totalPlans,
      plans: plansList,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// GET Plan by ID
module.exports.getPlanById = async (req, res) => {
  try {
    const { id } = req.params;  // Get the plan ID from params

    let plan = await planModel.findById(id);
    if (!plan) return res.status(404).json({ error: "Plan not found" });  // 404: Not found
    res.status(200).json(plan);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};



module.exports.buyPlans = async (req, res) => {
  try {
    const { customerId, planIds, dietPlanIds, trainerId } = req.body;

    // Validate required fields
    if (!customerId || !planIds || !dietPlanIds || !trainerId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Ensure planIds and dietPlanIds are arrays
    if (!Array.isArray(planIds) || !Array.isArray(dietPlanIds)) {
      return res.status(400).json({ error: "planIds and dietPlanIds must be arrays" });
    }

    // Check if the customer exists
    const customer = await customerModel.findById(customerId);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    // Validate plan IDs and check if plans exist
    const plans = await planModel.find({ _id: { $in: planIds } });
    if (plans.length !== planIds.length) {
      return res.status(404).json({ error: "One or more plans not found" });
    }

    // Validate dietPlan IDs and check if diet plans exist
    const dietPlans = await dietPlanModel.find({ _id: { $in: dietPlanIds } });
    if (dietPlans.length !== dietPlanIds.length) {
      return res.status(404).json({ error: "One or more diet plans not found" });
    }

    // Check if the trainer exists
    const trainer = await trainerModel.findById(trainerId);
    if (!trainer) {
      return res.status(404).json({ error: "Trainer not found" });
    }

    // Update customer with joined plans, diet plans, and trainer
    customer.joinedPlans.push(...plans.map(plan => plan._id));
    customer.ditePlans.push(...dietPlans.map(dietPlan => dietPlan._id));
    customer.trainer = trainer._id;

    // Save the updated customer
    await customer.save();

    return res.status(200).json({ message: "Plans and trainer added successfully", customer });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Server error" });
  }
};

// CREATE a new Diet Plan
module.exports.createDietPlan = async (req, res) => {
  try {
    const { planName, description, calories, protein, carbs, fats, duration, meals, trainer } = req.body;

    // Validate input (basic validation example)
    if (!planName || !description || !calories || !protein || !carbs || !fats || !duration || !trainer) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create new diet plan
    const newDietPlan = await ditePlanModel.create({
      planName,
      description,
      calories,
      protein,
      carbs,
      fats,
      duration,
      meals,  // Array of meals
      trainer, // Reference to the trainer who created this plan
    });

    // Send response with the created diet plan
    res.status(201).json(newDietPlan);  // Status 201: Created
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// READ/Get all Diet Plans
module.exports.getAllDietPlans = async (req, res) => {
  try {
    const dietPlans = await ditePlanModel.find().populate('trainer'); // Fetch all diet plans and populate trainer data
    res.status(200).json(dietPlans);  // Status 200: OK
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// READ/Get a single Diet Plan by ID
module.exports.getDietPlanById = async (req, res) => {
  try {
    const { id } = req.params;
    const dietPlan = await ditePlanModel.findById(id).populate('trainer');

    if (!dietPlan) {
      return res.status(404).json({ error: 'Diet Plan not found' });
    }

    res.status(200).json(dietPlan);  // Status 200: OK
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// UPDATE a Diet Plan by ID
module.exports.updateDietPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { planName, description, calories, protein, carbs, fats, duration, meals } = req.body;

    // Find and update the diet plan
    const updatedDietPlan = await ditePlanModel.findByIdAndUpdate(
      id,
      { planName, description, calories, protein, carbs, fats, duration, meals }, // Fields to update
      { new: true, runValidators: true } // Return updated document and run schema validations
    );

    if (!updatedDietPlan) {
      return res.status(404).json({ error: 'Diet Plan not found' });
    }

    res.status(200).json(updatedDietPlan);  // Status 200: OK
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE a Diet Plan by ID
module.exports.deleteDietPlan = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDietPlan = await ditePlanModel.findByIdAndDelete(id);

    if (!deletedDietPlan) {
      return res.status(404).json({ error: 'Diet Plan not found' });
    }

    res.status(200).json({ message: 'Diet Plan deleted successfully' });  // Status 200: OK
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};


