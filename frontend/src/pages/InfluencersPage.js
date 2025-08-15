import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/apiClient';

const InfluencersPage = () => {
  const [influencers, setInfluencers] = useState([]);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  const fetchInfluencers = () => {
    apiClient.get('/influencers/')
      .then(response => {
        setInfluencers(response.data);
      })
      .catch(error => {
        console.error('Error fetching influencers:', error);
      });
  };

  useEffect(() => {
    fetchInfluencers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/influencers/', { name, bio });
      setName('');
      setBio('');
      fetchInfluencers();
    } catch (error) {
      console.error('Error creating influencer:', error);
    }
  };

  return (
    <div>
      <h1>Influencers</h1>
      <form onSubmit={handleSubmit}>
        <h2>Create New Influencer</h2>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Bio</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>
        <button type="submit">Create</button>
      </form>
      <ul>
        {influencers.map(influencer => (
          <li key={influencer.id}>
            <Link to={`/influencers/${influencer.id}`}>{influencer.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfluencersPage;
