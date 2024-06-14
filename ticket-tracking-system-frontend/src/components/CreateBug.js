import React, { useState } from 'react';
import axios from 'axios';

const CreateBug = () => {
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://localhost:5001/api/bugs/Create', {
      summary: summary,
      description: description,
      isResolved: false
    })
    .then(response => {
      console.log('Bug created successfully', response.data);
    })
    .catch(error => {
      console.error('There was an error creating the bug!', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Summary:</label>
        <input type="text" value={summary} onChange={(e) => setSummary(e.target.value)} />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <button type="submit">Create Bug</button>
      </div>
    </form>
  );
};

export default CreateBug;
