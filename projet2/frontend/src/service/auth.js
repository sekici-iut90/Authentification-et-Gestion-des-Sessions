import axios from 'axios';

const API_URL = 'http://localhost:3000'

// Fonction pour vérifier si l'utilisateur est authentifié
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};


// Fonction pour l'inscription
export const register = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/register`, user);
    return response.data;
  } catch (error) {
    throw new Error('Erreur lors de l\'inscription');
  }
};

export const login = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/login`, user);
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    throw new Error('Erreur lors de la connexion');
  }
};

// Fonction pour la déconnexion
export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};

export default {
  register,
  login,
  isAuthenticated,
  logout
};
