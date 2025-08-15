import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PasswordResetRequestPage from './pages/PasswordResetRequestPage';
import PasswordResetConfirmPage from './pages/PasswordResetConfirmPage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryDetailPage from './pages/CategoryDetailPage';
import TagsPage from './pages/TagsPage';
import TagDetailPage from './pages/TagDetailPage';
import CreateBookmarkPage from './pages/CreateBookmarkPage';
import InfluencersPage from './pages/InfluencersPage';
import InfluencerDetailPage from './pages/InfluencerDetailPage';
import TorrentsPage from './pages/TorrentsPage';
import TorrentDetailPage from './pages/TorrentDetailPage';
import CollectionsPage from './pages/CollectionsPage';
import CollectionDetailPage from './pages/CollectionDetailPage';
import ImportExportPage from './pages/ImportExportPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/password-reset" element={<PasswordResetRequestPage />} />
        <Route path="/reset-password/:uid/:token" element={<PasswordResetConfirmPage />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-bookmark" element={<CreateBookmarkPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:id" element={<CategoryDetailPage />} />
          <Route path="/tags" element={<TagsPage />} />
          <Route path="/tags/:id" element={<TagDetailPage />} />
          <Route path="/influencers" element={<InfluencersPage />} />
          <Route path="/influencers/:id" element={<InfluencerDetailPage />} />
          <Route path="/torrents" element={<TorrentsPage />} />
          <Route path="/torrents/:id" element={<TorrentDetailPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/collections/:id" element={<CollectionDetailPage />} />
          <Route path="/import-export" element={<ImportExportPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
