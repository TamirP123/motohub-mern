import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import '../styles/TestDriveNotification.css';

const TestDriveNotification = ({ show, message }) => {
  if (!show) return null;

  return (
    <div className="test-drive-notification">
      <FaCheckCircle className="notification-icon" />
      <p>{message}</p>
    </div>
  );
};

export default TestDriveNotification;