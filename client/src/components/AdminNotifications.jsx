import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_TEST_DRIVE_REQUESTS } from '../utils/queries';
import { Card, ListGroup, Badge } from 'react-bootstrap';

const AdminNotifications = () => {
  const { loading, error, data } = useQuery(GET_TEST_DRIVE_REQUESTS, {
    pollInterval: 5000, // Refresh every 5 seconds
  });

  if (loading) return <p>Loading notifications...</p>;
  if (error) return <p>Error loading notifications: {error.message}</p>;

  return (
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
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>No test drive requests at the moment.</ListGroup.Item>
        )}
      </ListGroup>
    </Card>
  );
};

export default AdminNotifications;