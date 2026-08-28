import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/workers/`;

// Get all workers (with query params)
const getWorkers = async (searchParams = {}) => {
  const params = new URLSearchParams(searchParams).toString();
  const response = await axios.get(`${API_URL}?${params}`);
  return response.data;
};

// Get single worker profile by ID
const getWorkerById = async (id) => {
  const response = await axios.get(`${API_URL}${id}`);
  return response.data;
};

// Get current worker's own profile
const getMyProfile = async () => {
  const response = await axios.get(`${API_URL}profile/me`);
  return response.data;
};

// Update or create worker profile
const updateProfile = async (profileData) => {
  const response = await axios.put(`${API_URL}profile`, profileData);
  return response.data;
};

const workerService = {
  getWorkers,
  getWorkerById,
  getMyProfile,
  updateProfile,
};

export default workerService;
