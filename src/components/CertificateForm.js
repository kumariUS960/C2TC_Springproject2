import React, { useState, useEffect } from 'react';
import './CertificateForm.css';

const CertificateForm = ({ fetchCertificates, editingCertificate, setEditingCertificate }) => {
  const [studentName, setStudentName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [course, setCourse] = useState('');
  const [branch, setBranch] = useState('');
  const [company, setCompany] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [grade, setGrade] = useState('');

  useEffect(() => {
    if (editingCertificate) {
      setStudentName(editingCertificate.studentName);
      setRollNo(editingCertificate.rollNo);
      setCourse(editingCertificate.course);
      setBranch(editingCertificate.branch);
      setCompany(editingCertificate.company);
      setIssueDate(editingCertificate.issueDate);
      setGrade(editingCertificate.grade);
    } else {
      clearForm();
    }
  }, [editingCertificate]);

  const clearForm = () => {
    setStudentName('');
    setRollNo('');
    setCourse('');
    setBranch('');
    setCompany('');
    setIssueDate('');
    setGrade('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const certificate = {
      studentName,
      rollNo,
      course,
      branch,
      company,
      issueDate,
      grade
    };

    try {
      if (editingCertificate) {
        await fetch(`http://localhost:8080/api/certificates/${editingCertificate.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(certificate),
        });
      } else {
        await fetch('http://localhost:8080/api/certificates', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(certificate),
        });
      }
      fetchCertificates();
      setEditingCertificate(null);
      clearForm();
    } catch (error) {
      console.error('Error saving certificate:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>{editingCertificate ? 'Edit Certificate' : 'Add Certificate'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="Student Name"
          required
        />
        <input
          type="text"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          placeholder="Roll Number"
          required
        />
        <input
          type="text"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          placeholder="Course"
          required
        />
        <input
          type="text"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          placeholder="Branch"
          required
        />
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company"
          required
        />
        <input
          type="date"
          value={issueDate}
          onChange={(e) => setIssueDate(e.target.value)}
          placeholder="Issue Date"
          required
        />
        <input
          type="text"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          placeholder="Grade"
          required
        />
        <button type="submit">
          {editingCertificate ? 'Update Certificate' : 'Add Certificate'}
        </button>
        {editingCertificate && (
          <button type="button" onClick={() => { setEditingCertificate(null); clearForm(); }}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default CertificateForm;