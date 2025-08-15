import React, { useState } from 'react';
import apiClient from '../api/apiClient';

const PasswordResetRequestPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/password-reset/', { email });
      setMessage('If an account with this email exists, a password reset link has been sent.');
    } catch (err) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordResetRequestPage;
