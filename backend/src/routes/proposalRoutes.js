const express = require('express');
const {
  submitProposal,
  getJobProposals,
  getMyProposals,
  acceptProposal,
} = require('../controllers/proposalController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/:jobId', protect, authorize('worker'), submitProposal);
router.get('/job/:jobId', protect, authorize('customer'), getJobProposals);
router.get('/me', protect, authorize('worker'), getMyProposals);
router.put('/:id/accept', protect, authorize('customer'), acceptProposal);

module.exports = router;
