const express = require('express');
const router = express.Router();
const batchController = require('../controllers/batchController');
const { protect } = require('../middleware/authMiddleware');


router.use(protect);


router.get('/options', batchController.getBatchOptions); 
router.get('/', batchController.getBatches);     
router.post('/', batchController.createBatch);    

module.exports = router;