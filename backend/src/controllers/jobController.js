const Job = require('../models/Job');

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Private (Customer only)
exports.createJob = async (req, res, next) => {
  try {
    req.body.customer = req.user.id;

    const job = await Job.create(req.body);

    res.status(201).json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all open jobs (for workers to browse)
// @route   GET /api/jobs
// @access  Public
exports.getJobs = async (req, res, next) => {
  try {
    const { category, sort } = req.query;

    const query = { status: 'open' };

    if (category) {
      query.category = category;
    }

    let jobsQuery = Job.find(query).populate('customer', 'name profileImage');

    if (sort === 'budget_desc') {
      jobsQuery = jobsQuery.sort({ budget: -1 });
    } else if (sort === 'budget_asc') {
      jobsQuery = jobsQuery.sort({ budget: 1 });
    } else {
      jobsQuery = jobsQuery.sort({ createdAt: -1 }); // Newest first
    }

    const jobs = await jobsQuery;

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get jobs posted by the logged in customer
// @route   GET /api/jobs/me
// @access  Private (Customer only)
exports.getMyJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ customer: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get jobs assigned to the logged in worker
// @route   GET /api/jobs/worker
// @access  Private (Worker only)
exports.getWorkerJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ worker: req.user.id }).populate('customer', 'name email phone').sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single job by ID
// @route   GET /api/jobs/:id
// @access  Public
exports.getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('customer', 'name profileImage email phone')
      .populate('worker', 'name profileImage email phone');

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    // Hide contact details if job is not assigned to this worker or user is not the customer
    if (req.user) {
      const isCustomer = req.user.id === job.customer._id.toString();
      const isAssignedWorker = job.worker && req.user.id === job.worker._id.toString();
      const isAdmin = req.user.role === 'admin';

      if (!isCustomer && !isAssignedWorker && !isAdmin) {
        if (job.customer) {
          job.customer.email = undefined;
          job.customer.phone = undefined;
        }
      }
    } else {
      if (job.customer) {
        job.customer.email = undefined;
        job.customer.phone = undefined;
      }
    }

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark a job as completed
// @route   PUT /api/jobs/:id/complete
// @access  Private (Customer only)
exports.completeJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    if (job.customer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this job',
      });
    }

    if (job.status !== 'assigned' && job.status !== 'in-progress') {
      return res.status(400).json({
        success: false,
        message: 'Job must be assigned or in-progress to be completed',
      });
    }

    job.status = 'completed';
    await job.save();

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};
