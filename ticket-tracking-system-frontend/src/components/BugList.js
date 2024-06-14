import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateBug from './CreateBug'; // Make sure to import the CreateBug component
import EditBug from './EditBug'; // Import the EditBug component
import DeleteBug from './DeleteBug'; // Import the DeleteBug component
import ResolveBug from './ResolveBug'; // Import the ResolveBug component
import { Modal, Button } from 'react-bootstrap'; // Import Modal and Button from react-bootstrap

const BugList = () => {
  const [bugs, setBugs] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false); // State to control create modal visibility
  const [showEditModal, setShowEditModal] = useState(false); // State to control edit modal visibility
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State to control delete modal visibility
  const [showResolveModal, setShowResolveModal] = useState(false); // State to control resolve modal visibility
  const [selectedBug, setSelectedBug] = useState(null); // State to manage selected bug for editing/deleting
  const [userType, setUserType] = useState('QA'); // State to manage selected user type

  useEffect(() => {
    axios.get('https://localhost:5001/api/bugs/GetBugs')
      .then(response => {
        setBugs(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the bugs!', error);
      });
    
  }, []);

  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => setShowCreateModal(false);

  const handleShowEditModal = (bug) => {
    setSelectedBug(bug);
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => setShowEditModal(false);

  const handleShowDeleteModal = (bug) => {
    setSelectedBug(bug);
    setShowDeleteModal(true);
  };
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleShowResolveModal = (bug) => {
    setSelectedBug(bug);
    setShowResolveModal(true);
  };
  const handleCloseResolveModal = () => setShowResolveModal(false);


  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  return (
    <div>
        <Button variant="outline-primary" onClick={() => handleUserTypeChange('QA')}>
        QA
      </Button>
      <Button variant="outline-primary" onClick={() => handleUserTypeChange('RD')}>
        RD
      </Button>
      <h2>Bug List</h2>
      <Button variant="primary" onClick={handleShowCreateModal}>
        Create Bug
      </Button>
      <ul>
        {bugs.map(bug => (
          <li key={bug.id}>
            Summary: {bug.summary} - Description: {bug.description} - Is Resolved: {bug.isResolved ? 'Yes' : 'No'}
            {userType === 'QA' && (
              <>
                <Button variant="secondary" onClick={() => handleShowEditModal(bug)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleShowDeleteModal(bug)}>
                  Delete
                </Button>
              </>
            )}
            {userType === 'RD' && !bug.isResolved && (
              <Button variant="success" onClick={() => handleShowResolveModal(bug)}>
                Resolve
              </Button>
            )}
          </li>
        ))}
      </ul>

      {/* Create Bug Modal */}
      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Bug</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateBug onClose={handleCloseCreateModal} />
        </Modal.Body>
      </Modal>

      {/* Edit Bug Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Bug</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBug && <EditBug bug={selectedBug} onClose={handleCloseEditModal} />}
        </Modal.Body>
      </Modal>

      {/* Delete Bug Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Bug</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBug && <DeleteBug bug={selectedBug} onClose={handleCloseDeleteModal} />}
        </Modal.Body>
      </Modal>

      {/* Resolve Bug Modal */}
      <Modal show={showResolveModal} onHide={handleCloseResolveModal}>
        <Modal.Header closeButton>
          <Modal.Title>Resolve Bug</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBug && <ResolveBug bug={selectedBug} onClose={handleCloseResolveModal} />}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BugList;
