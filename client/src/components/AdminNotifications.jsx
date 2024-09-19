import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TEST_DRIVE_REQUESTS } from '../utils/queries';
import { Card, ListGroup, Badge, Button, Modal } from 'react-bootstrap';

const AdminNotifications = ({ onDeleteTestDrive }) => {
  const { loading, error, data } = useQuery(GET_TEST_DRIVE_REQUESTS, {
    pollInterval: 5000, // Refresh every 5 seconds
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  if (loading) return <p>Loading notifications...</p>;
  if (error) return <p>Error loading notifications: {error.message}</p>;

  const handleDelete = (requestId) => {
    setSelectedRequestId(requestId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    console.log('Attempting to delete test drive request with ID:', selectedRequestId);
    onDeleteTestDrive(selectedRequestId);
    setShowModal(false);
  };

  return (
    <>
      <Card className="notifications-card">
        <Card.Header as="h5">Test Drive Requests</Card.Header>
        <ListGroup variant="flush">
          {data.testDriveRequests && data.testDriveRequests.length > 0 ? (
            data.testDriveRequests.map((request) => (
              <ListGroup.Item key={request._id} className="notification-item">
                <h6>{request.car.name}</h6>
                <p className="mb-1"><strong>Name:</strong> {request.name}</p>
                <p className="mb-1"><strong>Phone:</strong> {request.phone}</p>
                <p className="mb-1"><strong>Date:</strong> {new Date(request.date).toLocaleDateString()}</p>
                <Badge bg={request.status === 'Pending' ? 'warning' : 'success'}>
                  {request.status}
                </Badge>
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={() => handleDelete(request._id)}
                  className="mt-2"
                >
                  Delete
                </Button>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>No test drive requests at the moment.</ListGroup.Item>
          )}
        </ListGroup>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this test drive request?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminNotifications;