const WorkerProfile = require('../models/WorkerProfile');

// @desc    Get all workers (with filtering)
// @route   GET /api/workers
// @access  Public
exports.getWorkers = async (req, res, next) => {
  try {
    const { category, keyword, sort } = req.query;

    const query = {};

    if (category) {
      query.categories = { $in: [category] };
    }

    if (keyword) {
      query.$or = [
        { professionalTitle: { $regex: keyword, $options: 'i' } },
        { bio: { $regex: keyword, $options: 'i' } },
        { skills: { $regex: keyword, $options: 'i' } },
      ];
    }

    let workersQuery = WorkerProfile.find(query).populate('user', 'name profileImage');

    if (sort === 'rating') {
      workersQuery = workersQuery.sort({ rating: -1 });
    } else if (sort === 'price_asc') {
      workersQuery = workersQuery.sort({ hourlyRate: 1 });
    } else if (sort === 'price_desc') {
      workersQuery = workersQuery.sort({ hourlyRate: -1 });
    } else {
      workersQuery = workersQuery.sort({ createdAt: -1 });
    }

    const workers = await workersQuery;

    res.status(200).json({
      success: true,
      count: workers.length,
      data: workers,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single worker profile by ID
// @route   GET /api/workers/:id
// @access  Public
exports.getWorkerById = async (req, res, next) => {
  try {
    const worker = await WorkerProfile.findById(req.params.id).populate('user', 'name profileImage email');

    if (!worker) {
      return res.status(404).json({
        success: false,
        message: 'Worker not found',
      });
    }

    res.status(200).json({
      success: true,
      data: worker,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create or update worker profile
// @route   PUT /api/workers/profile
// @access  Private (Worker only)
exports.updateProfile = async (req, res, next) => {
  try {
    const {
      professionalTitle,
      bio,
      categories,
      skills,
      experienceYears,
      hourlyRate,
      availability,
      address,
      city,
    } = req.body;

    const profileFields = {
      user: req.user.id,
      professionalTitle,
      bio,
      experienceYears,
      hourlyRate,
      availability,
    };

    if (categories) {
      profileFields.categories = Array.isArray(categories)
        ? categories
        : categories.split(',').map((cat) => cat.trim());
    }

    if (skills) {
      profileFields.skills = Array.isArray(skills)
        ? skills
        : skills.split(',').map((skill) => skill.trim());
    }
    
    // Address processing for mock location point
    if (address || city) {
      profileFields.location = {
        type: 'Point',
        coordinates: [-73.935242, 40.730610], // Default mock coord
        address,
        city
      };
    }

    let profile = await WorkerProfile.findOne({ user: req.user.id });

    if (profile) {
      // Update
      profile = await WorkerProfile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, runValidators: true }
      );
    } else {
      // Create
      profile = await WorkerProfile.create(profileFields);
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current worker's own profile
// @route   GET /api/workers/profile/me
// @access  Private (Worker only)
exports.getMyProfile = async (req, res, next) => {
  try {
    const profile = await WorkerProfile.findOne({ user: req.user.id }).populate('user', 'name email');
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'There is no profile for this worker',
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};
