import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADMIN_LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminLogin.css';

const AdminLogin = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [adminLogin, { error }] = useMutation(ADMIN_LOGIN);
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("Attempting login with:", formState);
      const mutationResponse = await adminLogin({
        variables: { email: formState.email, password: formState.password },
      });
      console.log("Login response:", mutationResponse);
      const token = mutationResponse.data.adminLogin.token;
      Auth.login(token);
      navigate('/admin/dashboard');
    } catch (e) {
      console.error("Login error:", e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h2 className="admin-login-title">Admin Access</h2>
        <form onSubmit={handleFormSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              placeholder="admin@example.com"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
              className="admin-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <input
              placeholder="******"
              name="password"
              type="password"
              id="pwd"
              onChange={handleChange}
              className="admin-input"
            />
          </div>
          {error && (
            <div className="error-message">
              The provided credentials are incorrect
            </div>
          )}
          <button type="submit" className="admin-submit-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;