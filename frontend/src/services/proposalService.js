import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/proposals/`;

const submitProposal = async (jobId, proposalData) => {
  const response = await axios.post(`${API_URL}${jobId}`, proposalData);
  return response.data;
};

const getJobProposals = async (jobId) => {
  const response = await axios.get(`${API_URL}job/${jobId}`);
  return response.data;
};

const getMyProposals = async () => {
  const response = await axios.get(`${API_URL}me`);
  return response.data;
};

const acceptProposal = async (proposalId) => {
  const response = await axios.put(`${API_URL}${proposalId}/accept`);
  return response.data;
};

const proposalService = {
  submitProposal,
  getJobProposals,
  getMyProposals,
  acceptProposal,
};

export default proposalService;
