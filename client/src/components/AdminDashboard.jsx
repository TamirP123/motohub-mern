import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { DELETE_TEST_DRIVE_REQUEST } from '../utils/mutations';
import { GET_TEST_DRIVE_REQUESTS } from '../utils/queries';
import Auth from '../utils/auth';
import AdminNotifications from './AdminNotifications';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const profile = Auth.getProfile();
  const [notification, setNotification] = useState(null);

  const [deleteTestDriveRequest] = useMutation(DELETE_TEST_DRIVE_REQUEST, {
    refetchQueries: [{ query: GET_TEST_DRIVE_REQUESTS }],
    onError: (error) => {
      console.error('Error deleting test drive request:', error);
      console.error('GraphQL Errors:', error.graphQLErrors);
      console.error('Network Error:', error.networkError);
      if (error.networkError && error.networkError.result) {
        console.error('Error result:', error.networkError.result);
      }
      setNotification({ type: 'danger', message: `Failed to delete test drive request: ${error.message}` });
    },
  });

  if (!Auth.loggedIn() || !profile || !profile.isAdmin) {
    return (
      <Container>
        <h4>You need to be logged in as an admin to see this page.</h4>
      </Container>
    );
  }

  const handleDeleteTestDrive = async (requestId) => {
    try {
      const { data } = await deleteTestDriveRequest({
        variables: { id: requestId },
      });
      console.log('Delete response:', data);
      
      if (!data || !data.deleteTestDriveRequest) {
        throw new Error('No data returned from server');
      }
      
      if (data.deleteTestDriveRequest.error) {
        throw new Error(data.deleteTestDriveRequest.error);
      }
      
      setNotification({ type: 'success', message: 'Test drive request deleted successfully.' });
    } catch (error) {
      console.error('Error in handleDeleteTestDrive:', error);
      setNotification({ type: 'danger', message: `Failed to delete test drive request: ${error.message}` });
    }
  };

  return (
    <Container fluid className="admin-dashboard">
      {notification && (
        <Alert variant={notification.type} onClose={() => setNotification(null)} dismissible>
          {notification.message}
        </Alert>
      )}
      <Row>
        <Col lg={8} className="mb-4">
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title as="h2">Welcome, Admin</Card.Title>
              <Card.Text>
                Manage your inventory and view test drive requests from this dashboard.
              </Card.Text>
              <Button as={Link} to="/admin/inventory" variant="primary" className="mt-3">
                Manage Inventory
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <AdminNotifications onDeleteTestDrive={handleDeleteTestDrive} />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;