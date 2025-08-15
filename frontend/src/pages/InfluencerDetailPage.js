import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../api/apiClient';
import BookmarkListPage from './BookmarkListPage';

const InfluencerDetailPage = () => {
  const [influencer, setInfluencer] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    apiClient.get(`/influencers/${id}/`)
      .then(response => {
        setInfluencer(response.data);
      })
      .catch(error => {
        console.error('Error fetching influencer:', error);
      });
  }, [id]);

  if (!influencer) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{influencer.name}</h1>
      <p>{influencer.bio}</p>
      {influencer.social_links && (
        <div>
          <h3>Social Links</h3>
          <ul>
            {Object.entries(influencer.social_links).map(([platform, url]) => (
              <li key={platform}>
                <a href={url} target="_blank" rel="noopener noreferrer">{platform}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <h2>Bookmarks</h2>
      <BookmarkListPage influencerId={id} />
    </div>
  );
};

export default InfluencerDetailPage;
