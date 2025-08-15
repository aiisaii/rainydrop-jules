import React from 'react';
import apiClient from '../api/apiClient';

const BookmarkCard = ({ bookmark, onDelete }) => {
  const handleDelete = async () => {
    try {
      await apiClient.delete(`/bookmarks/${bookmark.id}/`);
      onDelete(bookmark.id);
    } catch (error) {
      console.error('Error deleting bookmark:', error);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', margin: '10px', width: '300px' }}>
      <h3>{bookmark.title}</h3>
      <p>{bookmark.description}</p>
      <a href={bookmark.url} target="_blank" rel="noopener noreferrer">Visit</a>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default BookmarkCard;
