import React, { useState, useEffect, useContext } from 'react';
import apiClient from '../api/apiClient';
import { AuthContext } from '../contexts/AuthContext';
import BookmarkCard from '../components/BookmarkCard';

const BookmarkListPage = ({ categoryId, tagId, influencerId, torrentId, collectionId }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const { authToken } = useContext(AuthContext);

  const fetchBookmarks = () => {
    let url = '/bookmarks/';
    const params = new URLSearchParams();
    if (categoryId) {
      params.append('category', categoryId);
    }
    if (tagId) {
      params.append('tags', tagId);
    }
    if (influencerId) {
      params.append('influencer', influencerId);
    }
    if (torrentId) {
      params.append('torrent', torrentId);
    }
    if (collectionId) {
      params.append('collection', collectionId);
    }
    if (authToken) {
      apiClient.get(url, { params })
        .then(response => {
          setBookmarks(response.data);
        })
        .catch(error => {
          console.error('Error fetching bookmarks:', error);
        });
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, [authToken, categoryId, tagId, influencerId, torrentId, collectionId]);

  const handleDelete = (deletedBookmarkId) => {
    setBookmarks(bookmarks.filter(bookmark => bookmark.id !== deletedBookmarkId));
  };

  return (
    <div>
      <h1>Bookmarks</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {bookmarks.map(bookmark => (
          <BookmarkCard key={bookmark.id} bookmark={bookmark} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default BookmarkListPage;
