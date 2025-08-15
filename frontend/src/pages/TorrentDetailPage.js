import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../api/apiClient';
import BookmarkListPage from './BookmarkListPage';

const TorrentDetailPage = () => {
  const [torrent, setTorrent] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    apiClient.get(`/torrents/${id}/`)
      .then(response => {
        setTorrent(response.data);
      })
      .catch(error => {
        console.error('Error fetching torrent:', error);
      });
  }, [id]);

  if (!torrent) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{torrent.magnet_link}</h1>
      <p>{torrent.description}</p>
      <h2>Bookmarks</h2>
      <BookmarkListPage torrentId={id} />
    </div>
  );
};

export default TorrentDetailPage;
