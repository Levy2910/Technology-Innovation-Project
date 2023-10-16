/*Service Management Page
Junaid Saleem 103824753
Last edited 10/10/2023*/
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { apiUrl } from '../Constants';
import axios from 'axios';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    margin: '1rem',
  },
});

const apiPaths = {
  getServices: '/services',
  addService: '/add-service',
  updateService: '/services/',
  deleteService: '/services/',
};

function ServiceManagement() {
  const classes = useStyles();
  const [services, setServices] = useState([]);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    type: '',
    phone: '',
    email: '',
    address: '',
    url: '',
  });
  const [modalService, setModalService] = useState({
    name: '',
    type: '',
    phone: '',
    email: '',
    address: '',
    url: '',
  });
  const [currentService, setCurrentService] = useState({
    service_id: null,
    name: '',
    type: '',
    phone: '',
    email: '',
    address: '',
    url: '',
  });

  const fetchServices = () => {
    axios
      .get(apiUrl + apiPaths.getServices)
      .then((response) => {
        setServices(response.data.services);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const addService = () => {
    const newService = {
      ...modalService,
    };

    axios
      .post(apiUrl + apiPaths.addService, newService)
      .then((response) => {
        fetchServices();
        closeModal();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const updateService = (updatedService, serviceId) => {
    axios
      .put(apiUrl + apiPaths.updateService + serviceId, updatedService)
      .then((response) => {
        fetchServices();
        closeModal();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const deleteService = (serviceId) => {
    axios
      .delete(apiUrl + apiPaths.deleteService + serviceId)
      .then((response) => {
        fetchServices();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const [isModalOpen, setModalOpen] = useState(false);

  const validateFields = () => {
    const errors = {};

    if (!modalService.name) {
      errors.name = 'Name is required';
    }

    if (!modalService.type) {
      errors.type = 'Type is required';
    }

    if (!modalService.phone) {
      errors.phone = 'Phone is required';
    }

    if (!modalService.email) {
      errors.email = 'Email is required';
    }

    if (!modalService.address) {
      errors.address = 'Address is required';
    }

    if (!modalService.url) {
      errors.url = 'URL is required';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEdit = (serviceId) => {
    setEditingServiceId(serviceId);
    const serviceToEdit = services.find((service) => service.service_id === serviceId);
    setCurrentService(serviceToEdit);
  };

  const handleDeleteService = (serviceId) => {
    deleteService(serviceId);
  };

  const handleSave = (serviceId) => {
    const updatedService = {
      name: currentService.name,
      type: currentService.type,
      phone: currentService.phone,
      email: currentService.email,
      address: currentService.address,
      url: currentService.url,
    };
    updateService(updatedService, serviceId);
    setEditingServiceId(null);
    setCurrentService({
      service_id: null,
      name: '',
      type: '',
      phone: '',
      email: '',
      address: '',
      url: '',
    });
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalService({
      name: '',
      type: '',
      phone: '',
      email: '',
      address: '',
      url: '',
    });
  };

  const handlAddService = () => {
    if (validateFields()) {
      addService();
    }
  };

  const renderServiceRow = (service) => {
    const isEditing = service.service_id === editingServiceId;

    return (
      <TableRow key={service.service_id}>
        <TableCell>{service.service_id}</TableCell>
        <TableCell>
          {isEditing ? (
            <TextField label="Name" defaultValue={service.name} onChange={(e) => setCurrentService({ ...currentService, name: e.target.value })} />
          ) : (
            service.name
          )}
          {fieldErrors.name && fieldErrors.name}
        </TableCell>
        <TableCell>
          {isEditing ? (
            <TextField label="Type" defaultValue={service.type} onChange={(e) => setCurrentService({ ...currentService, type: e.target.value })} />
          ) : (
            service.type
          )}
          {fieldErrors.type && fieldErrors.type}
        </TableCell>
        <TableCell>
          {isEditing ? (
            <TextField label="Phone" defaultValue={service.phone} onChange={(e) => setCurrentService({ ...currentService, phone: e.target.value })} />
          ) : (
            service.phone
          )}
          {fieldErrors.phone && fieldErrors.phone}
        </TableCell>
        <TableCell>
          {isEditing ? (
            <TextField label="Email" defaultValue={service.email} onChange={(e) => setCurrentService({ ...currentService, email: e.target.value })} />
          ) : (
            service.email
          )}
          {fieldErrors.email && fieldErrors.email}
        </TableCell>
        <TableCell>
          {isEditing ? (
            <TextField label="Address" defaultValue={service.address} onChange={(e) => setCurrentService({ ...currentService, address: e.target.value })} />
          ) : (
            service.address
          )}
          {fieldErrors.address && fieldErrors.address}
        </TableCell>
        <TableCell>
          {isEditing ? (
            <TextField label="URL" defaultValue={service.url} onChange={(e) => setCurrentService({ ...currentService, url: e.target.value })} />
          ) : (
            service.url
          )}
          {fieldErrors.url && fieldErrors.url}
        </TableCell>
        <TableCell>
          {isEditing ? (
            <Button onClick={() => handleSave(service.service_id, service)}>Save</Button>
          ) : (
            <>
              <Button onClick={() => handleEdit(service.service_id)}>Edit</Button>
              <IconButton onClick={() => handleDeleteService(service.service_id)} style={{ color: 'lightcoral' }}>
                <Delete />
              </IconButton>
            </>
          )}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div>
      <h2>Service Management</h2>
      <Button variant="outlined" onClick={openModal} style={{ marginBottom: 10 }}>
        Add Service
      </Button>
      <Dialog open={isModalOpen} onClose={closeModal} fullWidth maxWidth="sm">
        <DialogTitle>Add Service</DialogTitle>
        <DialogContent>
          <form className={classes.form}>
            <TextField
              label="Name"
              fullWidth
              value={modalService.name}
              onChange={(e) => setModalService({ ...modalService, name: e.target.value })}
            />
            <TextField
              label="Type"
              fullWidth
              value={modalService.type}
              onChange={(e) => setModalService({ ...modalService, type: e.target.value })}
            />
            <TextField
              label="Phone"
              fullWidth
              value={modalService.phone}
              onChange={(e) => setModalService({ ...modalService, phone: e.target.value })}
            />
            <TextField
              label="Email"
              fullWidth
              value={modalService.email}
              onChange={(e) => setModalService({ ...modalService, email: e.target.value })}
            />
            <TextField
              label="Address"
              fullWidth
              value={modalService.address}
              onChange={(e) => setModalService({ ...modalService, address: e.target.value })}
            />
            <TextField
              label="URL"
              fullWidth
              value={modalService.url}
              onChange={(e) => setModalService({ ...modalService, url: e.target.value })}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddService} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="Service table">
          <TableHead>
            <TableRow>
              <TableCell>Service ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{services.map((service) => renderServiceRow(service))}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ServiceManagement;