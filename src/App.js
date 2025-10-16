import React, { useState, useEffect } from 'react';
import './App.css';
import CertificateForm from './components/CertificateForm';
import CertificateList from './components/CertificateList';

const App = () => {
  const [certificates, setCertificates] = useState([]);
  const [editingCertificate, setEditingCertificate] = useState(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/certificates');
      const data = await response.json();
      setCertificates(data);
    } catch (error) {
      console.error('Error fetching certificates:', error);
    }
  };

  return (
    <div className="App">
      <h1>Certificate Management System</h1>
      <CertificateForm
        fetchCertificates={fetchCertificates}
        editingCertificate={editingCertificate}
        setEditingCertificate={setEditingCertificate}
      />
      <CertificateList
        certificates={certificates}
        fetchCertificates={fetchCertificates}
        setEditingCertificate={setEditingCertificate}
      />
    </div>
  );
};

export default App;