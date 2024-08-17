import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
// const API_URL = `http://easymb-backend:5000/api`; 

// Categories
export const getCategories = () => axios.get(`${API_URL}/categories`);
export const createCategory = (data) => axios.post(`${API_URL}/categories`, data);
export const deleteCategory = (id) => axios.delete(`${API_URL}/categories/${id}`);  // Added

// Models
export const getModels = () => axios.get(`${API_URL}/models`);
export const createModel = (data) => axios.post(`${API_URL}/models`, data);
export const deleteModel = (id) => axios.delete(`${API_URL}/models/${id}`);  // Added

// Board Parts
export const getBoardParts = () => axios.get(`${API_URL}/board-parts`);
export const createBoardPart = (data) => axios.post(`${API_URL}/board-parts`, data);
export const deleteBoardPart = (id) => axios.delete(`${API_URL}/board-parts/${id}`);  // Added

// Components
export const getComponents = () => axios.get(`${API_URL}/components`);
export const createComponent = (data) => axios.post(`${API_URL}/components`, data);
export const deleteComponent = (id) => axios.delete(`${API_URL}/components/${id}`);  // Added

// Board Part Components
export const getBoardPartComponents = () => axios.get(`${API_URL}/board-part-components`);
export const createBoardPartComponent = (data) => axios.post(`${API_URL}/board-part-components`, data);
export const deleteBoardPartComponent = (id) => axios.delete(`${API_URL}/board-part-components/${id}`);  // Added


// sudo docker run -d --name mongodb --network easymb-network -p 27017:27017 -v mongodb_data:/data/db mongo:latest
// sudo docker run -d --name easymb-frontend --network easymb-network -p 80:80 jspawar80/easymb:test-easymb-frontend
// sudo docker run -d --name easymb-backend --network easymb-network -p 5000:5000 --env MONGO_URI=mongodb://mongodb:27017/easymb --link mongodb jspawar80/easymb:test-easymb-backend