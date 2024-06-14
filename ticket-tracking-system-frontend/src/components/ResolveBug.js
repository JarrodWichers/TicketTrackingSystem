import React from 'react';
import axios from 'axios';

const ResolveBug = ({ bug, onClose }) => {

  const handleResolve = () => {
    axios.put(`https://localhost:5001/api/bugs/${bug.id}`, {
      ...bug,
      isResolved: true
    })
    .then(response => {
      console.log('Bug resolved successfully', response.data);
      onClose(); // Close the modal after successful resolving
      window.location.reload(); // This reloads the entire page, a more elegant solution would be to update state
    })
    .catch(error => {
      console.error('There was an error resolving the bug!', error);
    });
  };

  return (
    <div>
      <p>Are you sure you want to resolve the bug "{bug.summary}"?</p>
      <button className="btn btn-success" onClick={handleResolve}>Resolve</button>
      <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
    </div>
  );
};

export default ResolveBug;
