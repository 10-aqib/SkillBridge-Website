import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/reviews/`;

const addReview = async (workerId, reviewData) => {
  const response = await axios.post(`${API_URL}${workerId}`, reviewData);
  return response.data;
};

const reviewService = {
  addReview,
};

export default reviewService;
