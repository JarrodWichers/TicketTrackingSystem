import React from 'react';
import axios from 'axios';

const DeleteBug = ({ bug, onClose }) => {

  const handleDelete = () => {
    axios.delete(`https://localhost:5001/api/bugs/DeleteConfirmed/${bug.id}`)
      .then(response => {
        console.log('Bug deleted successfully', response.data);
        onClose(); // Close the modal after successful deletion
        // Optionally, refresh the bug list in the parent component (e.g., by calling a prop function)
        window.location.reload(); // This reloads the entire page, a more elegant solution would be to update state
      })
      .catch(error => {
        console.error('There was an error deleting the bug!', error);
      });
  };

  return (
    <div>
      <p>Are you sure you want to delete the bug "{bug.summary}"?</p>
      <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
      <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
    </div>
  );
};

export default DeleteBug;
