import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiService } from '../services/ApiService';

export const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  const login = (email, password) => {
    return ApiService.post('/login', { email, password })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token);
        navigate('/dashboard');
      })
      .catch(err => {
        console.log('Login failed:', err);
        throw err; // Throw the error to be caught in the calling function
      });
  };


  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  return { token, login, logout };
};
