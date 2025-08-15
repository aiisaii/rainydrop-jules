import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/apiClient';

const CollectionsPage = () => {
  const [collections, setCollections] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const fetchCollections = () => {
    apiClient.get('/collections/')
      .then(response => {
        setCollections(response.data);
      })
      .catch(error => {
        console.error('Error fetching collections:', error);
      });
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/collections/', { name, description });
      setName('');
      setDescription('');
      fetchCollections();
    } catch (error) {
      console.error('Error creating collection:', error);
    }
  };

  return (
    <div>
      <h1>Collections</h1>
      <form onSubmit={handleSubmit}>
        <h2>Create New Collection</h2>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button type="submit">Create</button>
      </form>
      <ul>
        {collections.map(collection => (
          <li key={collection.id}>
            <Link to={`/collections/${collection.id}`}>{collection.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollectionsPage;
