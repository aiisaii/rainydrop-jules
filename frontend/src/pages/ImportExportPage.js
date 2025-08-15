import React, { useRef } from 'react';
import apiClient from '../api/apiClient';

const ImportExportPage = () => {
  const fileInputRef = useRef(null);

  const handleExport = async () => {
    try {
      const response = await apiClient.get('/export/');
      const dataStr = JSON.stringify(response.data, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      const exportFileDefaultName = 'rainydrop_export.json';
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = JSON.parse(e.target.result);
        await apiClient.post('/import/', data);
        alert('Import successful!');
      } catch (error) {
        console.error('Error importing data:', error);
        alert('Import failed.');
      }
    };
    reader.readAsText(file);
  };

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <h1>Import / Export</h1>
      <h2>Export</h2>
      <button onClick={handleExport}>Export Data as JSON</button>

      <h2>Import</h2>
      <button onClick={handleImportClick}>Import Data from JSON</button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImport}
        style={{ display: 'none' }}
        accept=".json"
      />
    </div>
  );
};

export default ImportExportPage;
