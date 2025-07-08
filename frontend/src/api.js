import axios from 'axios';

const API_URL = 'http://localhost:8000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication functions
const loginUser = async (credentials) => {
  try {
    const params = new URLSearchParams();
    for (const key in credentials) {
      params.append(key, credentials[key]);
    }

    const response = await axios.post(
      `${API_URL}/auth/token`,
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

const registerUser = async (userData) => {
  try {
    await axios.post(`${API_URL}/auth/register`, userData);
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

const fetchUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/users/users/me/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Fetch user profile error:", error);
    throw error;
  }
};

// Task management functions
const getTasks = async () => {
  try {
    const response = await api.get('/tasks');
    return response.data;
  } catch (error) {
    console.error("Fetch tasks error:", error);
    throw error;
  }
};

const createTask = async (taskData) => {
  try {
    const response = await api.post('/tasks', taskData);
    return response.data;
  } catch (error) {
    console.error("Create task error:", error);
    throw error;
  }
};

const updateTask = async (taskId, taskData) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    console.error("Update task error:", error);
    throw error;
  }
};

const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error("Delete task error:", error);
    throw error;
  }
};

export { 
  loginUser, 
  registerUser, 
  fetchUserProfile,
  getTasks,
  createTask,
  updateTask,
  deleteTask
};