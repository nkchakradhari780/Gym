const express = require('express')
const router = express.Router();

const {
    createPlan,
    updatePlan,
    deletePlan,
    listPlans,
    getPlanById
} = require('../controllers/plan');

const { 
    createDietPlan, 
    getAllDietPlans, 
    getDietPlanById, 
    updateDietPlan, 
    deleteDietPlan 
} = require('../controllers/plan');


// Create a new plan
router.post('/create', createPlan);

// Update a plan by ID
router.put('/update/:id', updatePlan);

// Delete a plan by ID
router.delete('/delete/:id', deletePlan);

// Get a plan by ID
router.get('/plan/:id', getPlanById); 

// List all plans
router.get('/', listPlans);



// Route to create a new diet plan
router.post('/diteplans/create', createDietPlan);

// Route to get all diet plans
router.get('/diteplans/', getAllDietPlans);

// Route to get a diet plan by ID
router.get('/diteplans/:id', getDietPlanById);

// Route to update a diet plan by ID
router.put('/diteplans/:id', updateDietPlan);

// Route to delete a diet plan by ID
router.delete('/diteplans/:id', deleteDietPlan);


module.exports = router;