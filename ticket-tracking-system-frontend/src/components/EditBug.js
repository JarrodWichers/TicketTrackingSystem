import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditBug = ({ bug, onClose }) => {
  const [summary, setSummary] = useState(bug.summary);
  const [description, setDescription] = useState(bug.description);
  const [isResolved, setIsResolved] = useState(bug.isResolved);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`https://localhost:5001/api/bugs/Edit/${bug.id}`, {
      id: bug.id,
      summary: summary,
      description: description,
      isResolved: isResolved
    })
    .then(response => {
      console.log('Bug updated successfully', response.data);
      onClose(); // Close the modal after successful submission
    })
    .catch(error => {
      console.error('There was an error updating the bug!', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Summary:</label>
        <input type="text" className="form-control" value={summary} onChange={(e) => setSummary(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Is Resolved:</label>
        <input type="checkbox" className="form-check-input" checked={isResolved} onChange={(e) => setIsResolved(e.target.checked)} />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-primary">Update Bug</button>
      </div>
    </form>
  );
};

export default EditBug;
