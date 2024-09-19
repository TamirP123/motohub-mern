import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_TEST_DRIVE_REQUEST } from '../utils/mutations';

const TestDriveModal = ({ show, onHide, car }) => {
  const [formState, setFormState] = useState({ name: '', phone: '', date: '' });
  const [addTestDriveRequest] = useMutation(ADD_TEST_DRIVE_REQUEST);
  const [availableDates, setAvailableDates] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Generate 5 random dates in the next 30 days
    const dates = Array.from({ length: 5 }, () => {
      const date = new Date();
      date.setDate(date.getDate() + Math.floor(Math.random() * 30) + 1);
      return date.toISOString().split('T')[0];
    }).sort();
    setAvailableDates(dates);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const { data } = await addTestDriveRequest({
        variables: {
          carId: car._id,
          ...formState,
          date: new Date(formState.date).toISOString() // Ensure date is in ISO format
        }
      });
      onHide();
      alert('Test drive scheduled successfully!');
    } catch (e) {
      console.error('Error scheduling test drive:', e);
      setError(`Error scheduling test drive: ${e.message}`);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Schedule Test Drive for {car.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={formState.name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="tel" name="phone" value={formState.phone} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Preferred Date</Form.Label>
            <Form.Control as="select" name="date" value={formState.date} onChange={handleChange} required>
              <option value="">Select a date</option>
              {availableDates.map((date) => (
                <option key={date} value={date}>{new Date(date).toLocaleDateString()}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Schedule Test Drive
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TestDriveModal;