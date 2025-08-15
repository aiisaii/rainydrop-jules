import React from 'react';
import { Link } from 'react-router-dom';
import BookmarkListPage from './BookmarkListPage';

const HomePage = () => {
  return (
    <div>
      <Link to="/create-bookmark">Create Bookmark</Link>
      <BookmarkListPage />
    </div>
  );
};

export default HomePage;
