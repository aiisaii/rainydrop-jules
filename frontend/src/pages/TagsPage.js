import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/apiClient';

const TagsPage = () => {
  const [tags, setTags] = useState([]);
  const [name, setName] = useState('');

  const fetchTags = () => {
    apiClient.get('/tags/')
      .then(response => {
        setTags(response.data);
      })
      .catch(error => {
        console.error('Error fetching tags:', error);
      });
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/tags/', { name });
      setName('');
      fetchTags();
    } catch (error) {
      console.error('Error creating tag:', error);
    }
  };

  return (
    <div>
      <h1>Tags</h1>
      <form onSubmit={handleSubmit}>
        <h2>Create New Tag</h2>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <button type="submit">Create</button>
      </form>
      <ul>
        {tags.map(tag => (
          <li key={tag.id}>
            <Link to={`/tags/${tag.id}`}>{tag.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagsPage;
