import React from 'react';
import { useParams } from 'react-router-dom';
import BookmarkListPage from './BookmarkListPage';

const CategoryDetailPage = () => {
  const { id } = useParams();

  return (
    <div>
      <BookmarkListPage categoryId={id} />
    </div>
  );
};

export default CategoryDetailPage;
