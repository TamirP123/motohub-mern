import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Container, Row, Col, Card, Button, Form, Modal, Toast } from 'react-bootstrap';
import { GET_ALL_CARS } from '../utils/queries';
import { ADD_CAR, UPDATE_CAR, DELETE_CAR } from '../utils/mutations';
import { openUploadWidget } from '../utils/cloudinary';
import { getImagePath } from '../utils/imageHelpers';
import '../styles/AdminInventoryPage.css';

const AdminInventoryPage = () => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_CARS);
  const [addCar] = useMutation(ADD_CAR);
  const [updateCar] = useMutation(UPDATE_CAR);
  const [deleteCar] = useMutation(DELETE_CAR);

  const [showModal, setShowModal] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [newCar, setNewCar] = useState({
    name: '', make: '', model: '', year: '', price: '', mileage: '',
    exteriorColor: '', interiorColor: '', fuelType: '', transmission: '',
    engine: '', vin: '', featured: false, images: [], description: ''
  });

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar({ ...newCar, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setNewCar({ ...newCar, [name]: checked });
  };

  const handleImageUpload = () => {
    const uploadOptions = {
      cloudName: 'dcscmcd7q',
      uploadPreset: 'ml_default',
      folder: 'car_images',
      cropping: true,
      multiple: true
    };

    openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        if(photos.event === 'success'){
          setNewCar(prevState => ({
            ...prevState,
            images: [...prevState.images, photos.info.secure_url]
          }));
        }
      } else {
        console.log(error);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const carData = {
        ...newCar,
        year: parseInt(newCar.year),
        price: parseFloat(newCar.price),
        mileage: parseInt(newCar.mileage),
      };

      if (editingCar) {
        await updateCar({ variables: { _id: editingCar._id, carData } });
        setNotificationMessage('Car updated successfully!');
      } else {
        await addCar({ variables: { carData } });
        setNotificationMessage('New car added successfully!');
      }
      setShowModal(false);
      setEditingCar(null);
      setNewCar({
        name: '', make: '', model: '', year: '', price: '', mileage: '',
        exteriorColor: '', interiorColor: '', fuelType: '', transmission: '',
        engine: '', vin: '', featured: false, images: [], description: ''
      });
      refetch();
      setNotificationType('success');
      setShowNotification(true);
    } catch (err) {
      console.error('Error saving car:', err);
      setNotificationMessage('Error saving car. Please try again.');
      setNotificationType('danger');
      setShowNotification(true);
    }
  };

  const handleEdit = (car) => {
    setEditingCar(car);
    setNewCar({ ...car });
    setShowModal(true);
  };

  const handleDeleteConfirmation = (car) => {
    setCarToDelete(car);
    setShowDeleteConfirmation(true);
  };

  const handleDelete = async () => {
    try {
      await deleteCar({ variables: { _id: carToDelete._id } });
      refetch();
      setNotificationMessage('Car deleted successfully!');
      setNotificationType('success');
      setShowNotification(true);
    } catch (err) {
      console.error('Error deleting car:', err);
      setNotificationMessage('Error deleting car. Please try again.');
      setNotificationType('danger');
      setShowNotification(true);
    }
    setShowDeleteConfirmation(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="admin-inventory-page">
      <Container fluid>
        <h1 className="inventory-title">Admin Inventory Management</h1>
        <Button variant="primary" className="add-car-btn" onClick={() => setShowModal(true)}>
          Add New Car
        </Button>
        <Row>
          {data.cars.map((car) => (
            <Col lg={3} md={4} sm={6} key={car._id} className="mb-4">
              <Card className="car-card h-100">
                <Card.Img variant="top" src={getImagePath(car, car.images[0])} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{car.name}</Card.Title>
                  <Card.Text>
                    {car.make} {car.model} - {car.year}
                    <br />
                    Price: ${car.price.toLocaleString()}
                  </Card.Text>
                  <div className="mt-auto">
                    <Button variant="info" onClick={() => handleEdit(car)} className="me-2">Edit</Button>
                    <Button variant="danger" onClick={() => handleDeleteConfirmation(car)}>Delete</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Toast 
          show={showNotification} 
          onClose={() => setShowNotification(false)} 
          delay={3000} 
          autohide
          className={`notification-toast ${notificationType}`}
          style={{
            position: 'fixed',
            top: 20,
            right: 20,
            zIndex: 9999
          }}
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>{notificationMessage}</Toast.Body>
        </Toast>

        <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete {carToDelete?.name}? This action cannot be undone.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteConfirmation(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showModal} onHide={() => {
          setShowModal(false);
          setEditingCar(null);
          setNewCar({
            name: '', make: '', model: '', year: '', price: '', mileage: '',
            exteriorColor: '', interiorColor: '', fuelType: '', transmission: '',
            engine: '', vin: '', featured: false, images: [], description: ''
          });
        }} size="lg" centered className="admin-modal">
          <Modal.Header closeButton>
            <Modal.Title>{editingCar ? 'Edit Car' : 'Add New Car'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={newCar.name} onChange={handleInputChange} required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Make</Form.Label>
                    <Form.Control type="text" name="make" value={newCar.make} onChange={handleInputChange} required />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Model</Form.Label>
                    <Form.Control type="text" name="model" value={newCar.model} onChange={handleInputChange} required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Year</Form.Label>
                    <Form.Control type="number" name="year" value={newCar.year} onChange={handleInputChange} required />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" name="price" value={newCar.price} onChange={handleInputChange} required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Mileage</Form.Label>
                    <Form.Control type="number" name="mileage" value={newCar.mileage} onChange={handleInputChange} required />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Exterior Color</Form.Label>
                    <Form.Control type="text" name="exteriorColor" value={newCar.exteriorColor} onChange={handleInputChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Interior Color</Form.Label>
                    <Form.Control type="text" name="interiorColor" value={newCar.interiorColor} onChange={handleInputChange} />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Fuel Type</Form.Label>
                    <Form.Control type="text" name="fuelType" value={newCar.fuelType} onChange={handleInputChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Transmission</Form.Label>
                    <Form.Control type="text" name="transmission" value={newCar.transmission} onChange={handleInputChange} />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Engine</Form.Label>
                    <Form.Control type="text" name="engine" value={newCar.engine} onChange={handleInputChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>VIN</Form.Label>
                    <Form.Control type="text" name="vin" value={newCar.vin} onChange={handleInputChange} />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Check 
                  type="checkbox" 
                  label="Featured" 
                  name="featured" 
                  checked={newCar.featured} 
                  onChange={handleCheckboxChange} 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Images</Form.Label>
                <div>
                  <Button onClick={handleImageUpload} variant="secondary">Upload Images</Button>
                </div>
                {newCar.images.length > 0 && (
                  <div className="mt-2">
                    {newCar.images.map((image, index) => (
                      <img 
                        key={index} 
                        src={getImagePath(newCar, image)} 
                        alt={`Uploaded ${index + 1}`} 
                        style={{width: '150px', height: '150px', objectFit: 'cover', margin: '5px'}}
                      />
                    ))}
                  </div>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" name="description" value={newCar.description} onChange={handleInputChange} />
              </Form.Group>
              <Button variant="primary" type="submit">
                {editingCar ? 'Update Car' : 'Add Car'}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default AdminInventoryPage;