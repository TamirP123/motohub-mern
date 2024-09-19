import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import AdminNotifications from './AdminNotifications';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const profile = Auth.getProfile();

  if (!Auth.loggedIn() || !profile || !profile.isAdmin) {
    return (
      <Container>
        <h4>You need to be logged in as an admin to see this page.</h4>
      </Container>
    );
  }

  return (
    <Container fluid className="admin-dashboard">
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
          <AdminNotifications />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;