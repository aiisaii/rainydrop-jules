import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';

const PasswordResetConfirmPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post(`/password-reset-confirm/${uid}/${token}/`, { new_password: newPassword });
      navigate('/login');
    } catch (err) {
      setError('Password reset failed. The link may be invalid or expired.');
    }
  };

  return (
    <div>
      <h1>Set New Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Set New Password</button>
      </form>
    </div>
  );
};

export default PasswordResetConfirmPage;
