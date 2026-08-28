const express = require('express');
const { addReview } = require('../controllers/reviewController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/:workerId').post(protect, authorize('customer'), addReview);

module.exports = router;
