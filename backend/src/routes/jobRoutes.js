const express = require('express');
const {
  createJob,
  getJobs,
  getMyJobs,
  getWorkerJobs,
  getJobById,
  completeJob,
} = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(getJobs)
  .post(protect, authorize('customer'), createJob);

router.route('/me').get(protect, authorize('customer'), getMyJobs);
router.route('/worker').get(protect, authorize('worker'), getWorkerJobs);
router.route('/:id').get(protect, getJobById);
router.route('/:id/complete').put(protect, authorize('customer'), completeJob);

module.exports = router;
