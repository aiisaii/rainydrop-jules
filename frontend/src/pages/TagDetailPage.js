import React from 'react';
import { useParams } from 'react-router-dom';
import BookmarkListPage from './BookmarkListPage';

const TagDetailPage = () => {
  const { id } = useParams();

  return (
    <div>
      <BookmarkListPage tagId={id} />
    </div>
  );
};

export default TagDetailPage;
