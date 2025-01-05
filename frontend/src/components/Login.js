import React, { useState } from 'react';
import axios from 'axios';
import '../assets/styles/login.css';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login/', { email, password });
      const data = response.data;
      localStorage.setItem('data', JSON.stringify(data));
      
      setUser(data.token); // Update the user state in the parent component
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-container"> {/* Add the login-container class here */}
      <div className="login-form-container"> {/* Add the login-form-container class here */}
        <h1>Student Login</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email" 
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password" 
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
