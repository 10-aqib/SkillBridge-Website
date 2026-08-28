const WorkerProfile = require('../models/WorkerProfile');
const Job = require('../models/Job');

// @desc    Add a review for a worker
// @route   POST /api/reviews/:workerId
// @access  Private (Customer only)
exports.addReview = async (req, res, next) => {
  try {
    const { rating, comment, jobId } = req.body;
    const workerId = req.params.workerId;

    // Validate inputs
    if (!rating || !comment || !jobId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide rating, comment, and jobId',
      });
    }

    // Check if the job exists, belongs to this customer, and is assigned to this worker
    const job = await Job.findById(jobId);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    if (job.customer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You did not post this job',
      });
    }

    if (job.worker.toString() !== workerId) {
      return res.status(400).json({
        success: false,
        message: 'This worker was not assigned to this job',
      });
    }

    if (job.status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'You can only review a worker after the job is marked completed',
      });
    }

    const workerProfile = await WorkerProfile.findOne({ user: workerId });

    if (!workerProfile) {
      return res.status(404).json({
        success: false,
        message: 'Worker profile not found',
      });
    }

    // Check if customer already reviewed this worker for this specific job
    // (Assuming one review per job)
    const alreadyReviewed = workerProfile.reviews.find(
      (r) => r.user.toString() === req.user.id && r.comment === comment // simplified check
    );

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this worker',
      });
    }

    const review = {
      user: req.user.id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    workerProfile.reviews.push(review);
    
    // Save will trigger the updateAverageRating method if we call it explicitly
    await workerProfile.updateAverageRating();

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: review
    });
  } catch (error) {
    next(error);
  }
};
