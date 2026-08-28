import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/jobs/`;

const createJob = async (jobData) => {
  const response = await axios.post(API_URL, jobData);
  return response.data;
};

const getJobs = async (searchParams = {}) => {
  const params = new URLSearchParams(searchParams).toString();
  const response = await axios.get(`${API_URL}?${params}`);
  return response.data;
};

const getMyJobs = async () => {
  const response = await axios.get(`${API_URL}me`);
  return response.data;
};

const getWorkerJobs = async () => {
  const response = await axios.get(`${API_URL}worker`);
  return response.data;
};

const getJobById = async (id) => {
  const response = await axios.get(`${API_URL}${id}`);
  return response.data;
};

const completeJob = async (id) => {
  const response = await axios.put(`${API_URL}${id}/complete`);
  return response.data;
};

const jobService = {
  createJob,
  getJobs,
  getMyJobs,
  getWorkerJobs,
  getJobById,
  completeJob,
};

export default jobService;
