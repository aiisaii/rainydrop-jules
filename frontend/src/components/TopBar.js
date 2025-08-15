import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const TopBar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', borderBottom: '1px solid #ccc' }}>
      <input type="text" placeholder="Search..." />
      <div>
        {user ? (
          <>
            <span>{user.username}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <span>Guest</span>
        )}
      </div>
    </div>
  );
};

export default TopBar;
