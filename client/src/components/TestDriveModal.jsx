import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import TestDriveNotification from './TestDriveNotification';
import '../styles/TestDriveModal.css';

const TestDriveModal = ({ show, onHide, car }) => {
  const [selectedSlot, setSelectedSlot] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const generateTimeSlots = () => {
    const slots = [];
    const currentDate = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000);
      const daySlots = [
        { time: '10:00 AM', available: Math.random() > 0.3 },
        { time: '2:00 PM', available: Math.random() > 0.3 },
        { time: '5:00 PM', available: Math.random() > 0.3 },
      ];
      slots.push({ date, slots: daySlots });
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call to schedule test drive
    console.log(`Test drive scheduled for ${car.name} on ${selectedSlot}`);
    console.log(`Contact info: ${contactInfo}`);
    
    onHide();
    
    // Show the notification
    setShowNotification(true);
    
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered size="lg" className="test-drive-modal">
        <Modal.Header closeButton>
          <Modal.Title>Schedule Test Drive for {car.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Select a time slot:</Form.Label>
              <div className="time-slots-container">
                {timeSlots.map((day, index) => (
                  <div key={index} className="day-slots">
                    <h6>{day.date.toLocaleDateString()}</h6>
                    {day.slots.map((slot, slotIndex) => (
                      <Button
                        key={slotIndex}
                        variant={slot.available ? 'outline-primary' : 'outline-secondary'}
                        disabled={!slot.available}
                        active={selectedSlot === `${day.date.toLocaleDateString()} ${slot.time}`}
                        onClick={() => setSelectedSlot(`${day.date.toLocaleDateString()} ${slot.time}`)}
                        className="mb-2 time-slot-button"
                      >
                        {slot.time}
                      </Button>
                    ))}
                  </div>
                ))}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact Information:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name and phone number"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                required
              />
            </Form.Group>
            <div className="text-center">
              <Button variant="primary" type="submit" disabled={!selectedSlot || !contactInfo}>
                Schedule Test Drive
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <TestDriveNotification
        show={showNotification}
        message="Test drive scheduled successfully! We will contact you shortly to confirm."
      />
    </>
  );
};

export default TestDriveModal;