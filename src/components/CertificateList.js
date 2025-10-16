import React from 'react';
import './CertificateList.css';

const CertificateList = ({ certificates, fetchCertificates, setEditingCertificate }) => {
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      try {
        await fetch(`http://localhost:8080/api/certificates/${id}`, { 
          method: 'DELETE' 
        });
        fetchCertificates();
      } catch (error) {
        console.error('Error deleting certificate:', error);
      }
    }
  };

  return (
    <div className="certificate-list-container">
      <h2>Certificate Records</h2>
      {certificates.length === 0 ? (
        <p className="no-data">No certificates available.</p>
      ) : (
        <div className="certificate-grid">
          {certificates.map((certificate) => (
            <div key={certificate.id} className="certificate-card">
              <div className="certificate-details">
                <h3>{certificate.studentName}</h3>
                <p><strong>Roll No:</strong> {certificate.rollNo}</p>
                <p><strong>Course:</strong> {certificate.course}</p>
                <p><strong>Branch:</strong> {certificate.branch}</p>
                <p><strong>Company:</strong> {certificate.company}</p>
                <p><strong>Issue Date:</strong> {new Date(certificate.issueDate).toLocaleDateString()}</p>
                <p><strong>Grade:</strong> {certificate.grade}</p>
              </div>
              <div className="card-buttons">
                <button className="edit-btn" onClick={() => setEditingCertificate(certificate)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(certificate.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificateList;