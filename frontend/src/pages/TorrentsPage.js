import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/apiClient';

const TorrentsPage = () => {
  const [torrents, setTorrents] = useState([]);
  const [magnetLink, setMagnetLink] = useState('');
  const [description, setDescription] = useState('');

  const fetchTorrents = () => {
    apiClient.get('/torrents/')
      .then(response => {
        setTorrents(response.data);
      })
      .catch(error => {
        console.error('Error fetching torrents:', error);
      });
  };

  useEffect(() => {
    fetchTorrents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/torrents/', { magnet_link: magnetLink, description });
      setMagnetLink('');
      setDescription('');
      fetchTorrents();
    } catch (error) {
      console.error('Error creating torrent:', error);
    }
  };

  return (
    <div>
      <h1>Torrents</h1>
      <form onSubmit={handleSubmit}>
        <h2>Create New Torrent</h2>
        <div>
          <label>Magnet Link</label>
          <input type="text" value={magnetLink} onChange={(e) => setMagnetLink(e.target.value)} required />
        </div>
        <div>
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button type="submit">Create</button>
      </form>
      <ul>
        {torrents.map(torrent => (
          <li key={torrent.id}>
            <Link to={`/torrents/${torrent.id}`}>{torrent.magnet_link}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TorrentsPage;
