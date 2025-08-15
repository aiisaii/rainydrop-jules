import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../api/apiClient';
import BookmarkListPage from './BookmarkListPage';

const CollectionDetailPage = () => {
  const [collection, setCollection] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    apiClient.get(`/collections/${id}/`)
      .then(response => {
        setCollection(response.data);
      })
      .catch(error => {
        console.error('Error fetching collection:', error);
      });
  }, [id]);

  if (!collection) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{collection.name}</h1>
      <p>{collection.description}</p>
      {/* Add sharing UI here */}
      <h2>Bookmarks</h2>
      <BookmarkListPage collectionId={id} />
    </div>
  );
};

export default CollectionDetailPage;
