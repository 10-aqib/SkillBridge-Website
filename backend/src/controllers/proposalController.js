const Proposal = require('../models/Proposal');
const Job = require('../models/Job');

// @desc    Submit a proposal for a job
// @route   POST /api/proposals/:jobId
// @access  Private (Worker only)
exports.submitProposal = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    if (job.status !== 'open') {
      return res.status(400).json({
        success: false,
        message: 'This job is no longer open for proposals',
      });
    }

    // Check if worker already submitted a proposal
    const existingProposal = await Proposal.findOne({ job: job._id, worker: req.user.id });
    if (existingProposal) {
      return res.status(400).json({
        success: false,
        message: 'You have already submitted a proposal for this job',
      });
    }

    const { coverLetter, proposedPrice, estimatedDays } = req.body;

    const proposal = await Proposal.create({
      job: job._id,
      worker: req.user.id,
      coverLetter,
      proposedPrice,
      estimatedDays,
    });

    res.status(201).json({
      success: true,
      data: proposal,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'You have already submitted a proposal for this job',
      });
    }
    next(error);
  }
};

// @desc    Get all proposals for a specific job
// @route   GET /api/proposals/job/:jobId
// @access  Private (Customer only)
exports.getJobProposals = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    // Make sure user is the job owner
    if (job.customer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view proposals for this job',
      });
    }

    const proposals = await Proposal.find({ job: req.params.jobId })
      .populate('worker', 'name profileImage')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: proposals.length,
      data: proposals,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get proposals submitted by the logged in worker
// @route   GET /api/proposals/me
// @access  Private (Worker only)
exports.getMyProposals = async (req, res, next) => {
  try {
    const proposals = await Proposal.find({ worker: req.user.id })
      .populate('job', 'title category budget status')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: proposals.length,
      data: proposals,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Accept a proposal
// @route   PUT /api/proposals/:id/accept
// @access  Private (Customer only)
exports.acceptProposal = async (req, res, next) => {
  try {
    const proposal = await Proposal.findById(req.params.id);

    if (!proposal) {
      return res.status(404).json({
        success: false,
        message: 'Proposal not found',
      });
    }

    const job = await Job.findById(proposal.job);

    // Make sure user is the job owner
    if (job.customer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to accept this proposal',
      });
    }

    if (job.status !== 'open') {
      return res.status(400).json({
        success: false,
        message: 'Job is no longer open',
      });
    }

    // Update proposal status
    proposal.status = 'accepted';
    await proposal.save();

    // Reject all other proposals for this job
    await Proposal.updateMany(
      { job: job._id, _id: { $ne: proposal._id } },
      { $set: { status: 'rejected' } }
    );

    // Update job status and assign worker
    job.status = 'assigned';
    job.worker = proposal.worker;
    await job.save();

    res.status(200).json({
      success: true,
      data: proposal,
    });
  } catch (error) {
    next(error);
  }
};
