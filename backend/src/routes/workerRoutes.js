const express = require('express');
const {
  getWorkers,
  getWorkerById,
  updateProfile,
  getMyProfile,
} = require('../controllers/workerController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(getWorkers);
router.route('/profile/me').get(protect, authorize('worker'), getMyProfile);
router.route('/profile').put(protect, authorize('worker'), updateProfile);
router.route('/:id').get(getWorkerById);

module.exports = router;
