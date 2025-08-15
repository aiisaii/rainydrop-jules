import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div style={{ width: '250px', borderRight: '1px solid #ccc', height: '100vh' }}>
      <h2>RainyDrop</h2>
      <nav>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/categories">Categories</Link></li>
          <li><Link to="/tags">Tags</Link></li>
          <li><Link to="/influencers">Influencers</Link></li>
          <li><Link to="/torrents">Torrents</Link></li>
          <li><Link to="/collections">Collections</Link></li>
          <li><Link to="/favorites">Favorites</Link></li>
          <li><Link to="/highlights">Highlights & Notes</Link></li>
          <li><Link to="/trash">Trash</Link></li>
          <li><Link to="/import-export">Import / Export</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
