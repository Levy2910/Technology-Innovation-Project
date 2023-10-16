/*User Management Page
Junaid Saleem 103824753
Last edited 15/10/2023*/
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
  MenuItem
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { apiUrl } from '../Contants';
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
  getUsers: '/users',
  addUser: '/add-user',
  updateUser: '/users/',
  deleteUser: '/users/'
}


function UserManagement() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({
    email: '',
    password: '',
    name: '',
    age: '',
    gender: '',
    nationality: '',
    postcode: '',
    username: '',
  });
  const [modalUser, setModalUser] = useState({
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
    name: '',
    age: '',
    gender: '',
    nationality: '',
    postcode: '',
    role: 0
  });
  const [currentUser, setCurrentUser] = useState({
    user_id: null,
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
    name: '',
    age: null,
    gender: '',
    nationality: '',
    postcode: '',
    role: 0
  });

  const fetchUsers = () => {
    axios.get(apiUrl + apiPaths.getUsers)
      .then((response) => {
        // Handle the successful response here
        setUsers(response.data.users);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error:', error);
      });
  };

  const addUsers = () => {
    const newUser = {
      ...modalUser,
    };

    axios.post(apiUrl + apiPaths.addUser, newUser)
      .then((response) => {
        fetchUsers();
        closeModal(); // Close the modal after adding the user
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error:', error);
      });
  };

  const updateUser = (updatedUser, userID) => {
    axios.post(apiUrl + apiPaths.updateUser + userID, updatedUser)
      .then((response) => {
        fetchUsers();
        closeModal(); // Close the modal after adding the user
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error:', error);
      });
  };

  const deleteUser = (userID) => {
    axios.delete(apiUrl + apiPaths.deleteUser + userID)
      .then((response) => {
        fetchUsers();
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, [])

  //Modal state
  const [isModalOpen, setModalOpen] = useState(false);

  const validateFields = () => {
    const errors = {};

    // Validate email using a regular expression
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!modalUser.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(modalUser.email)) {
      errors.email = 'Invalid email address';
    }

    // Validate password (minimum 8 characters)
    if (!modalUser.password) {
      errors.password = 'Password is required';
    } else if (modalUser.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    // Validate password (minimum 8 characters)
    if (modalUser.password != modalUser.password_confirmation) {
      errors.password = 'Confirm Password should be same as password';
    } else if (modalUser.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const handleEdit = (userId) => {
    setEditingUserId(userId);
    const userToEdit = users.find((user) => user.user_id === userId);
    setCurrentUser(userToEdit);
  };

  // Function to delete a user
  const handleDeleteUser = (userId) => {
    deleteUser(userId);
  };

  const handleSave = (userId) => {
    const updatedUser = {
      email: currentUser.email,
      name: currentUser.name,
      age: currentUser.age,
      gender: currentUser.gender,
      nationality: currentUser.nationality,
      postcode: currentUser.postcode,
    }
    updateUser(updatedUser, userId);
    setEditingUserId(null);
    setCurrentUser({
      user_id: null,
      email: '',
      username: '',
      password: '',
      password_confirmation: '',
      name: '',
      age: null,
      gender: '',
      nationality: '',
      postcode: ''
    });
  };

  // Function to open the modal
  const openModal = () => {
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
    // Clear modalUser state when the modal is closed
    setModalUser({
      email: '',
      username: '',
      password: '',
      name: '',
      age: '',
      gender: '',
      nationality: '',
      postcode: '',
    });
  };

  // Function to add a new user
  const addUser = () => {
    if (validateFields()) {
      addUsers();
    }
  };

  const renderUserRow = (user) => {
    const isEditing = user.user_id === editingUserId;

    return (
      <TableRow key={user.user_id}>
        <TableCell>{user.user_id}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>
          {isEditing ? (
            <TextField label="Username" defaultValue={user.username} onChange={(e) => setCurrentUser({ ...currentUser, username: e.target.value })} />
          ) : (
            user.username
          )}
        </TableCell>
        <TableCell>{isEditing ? <TextField label="Name" defaultValue={user.name} onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })} /> : user.name}</TableCell>
        <TableCell>{isEditing ? <TextField label="Age" defaultValue={user.age} onChange={(e) => setCurrentUser({ ...currentUser, age: e.target.value })} /> : user.age}</TableCell>
        <TableCell>
          {isEditing ? (
            <TextField
              select
              fullWidth
              label="Gender"
              defaultValue={user.gender}
              onChange={(e) => setCurrentUser({ ...currentUser, gender: e.target.value })}
            >
              <MenuItem value={'Male'}>Male</MenuItem>
              <MenuItem value={'Female'}>Female</MenuItem>
            </TextField>
          ) : (
            user.gender
          )}
        </TableCell>
        <TableCell>
          {isEditing ? (
            <TextField label="Nationality" defaultValue={user.nationality} onChange={(e) => setCurrentUser({ ...currentUser, nationality: e.target.value })} />
          ) : (
            user.nationality
          )}
        </TableCell>
        <TableCell>
          {isEditing ? (
            <TextField label="Postcode" defaultValue={user.postcode} onChange={(e) => setCurrentUser({ ...currentUser, postcode: e.target.value })} />
          ) : (
            user.postcode
          )}
        </TableCell>
        <TableCell>
          {isEditing ? (
            <Button onClick={() => handleSave(user.user_id, user)}>Save</Button>
          ) : (
            <>
              <Button onClick={() => handleEdit(user.user_id)}>Edit</Button>
              <IconButton
                onClick={() => handleDeleteUser(user.user_id)}
                style={{ color: 'lightcoral' }}
              >
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
      <h2>User Management</h2>

      {/* Button to open the modal for adding a user */}
      <Button variant="outlined" onClick={openModal} style={{ marginBottom: 10 }}>
        Add User
      </Button>

      {/* Modal for adding a user */}
      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        fullWidth
        maxWidth="sm"  // Adjust this value to your desired width
      >
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <form className={classes.form}>
            <TextField
              label="Email"
              fullWidth
              value={modalUser.email}
              onChange={(e) => setModalUser({ ...modalUser, email: e.target.value })}
            />
            <TextField
              label="Username"
              fullWidth
              value={modalUser.username}
              onChange={(e) => setModalUser({ ...modalUser, username: e.target.value })}
            />
            <TextField
              label="Password"
              fullWidth
              value={modalUser.password}
              type="password"
              onChange={(e) => setModalUser({ ...modalUser, password: e.target.value })} s
            />
            <TextField
              label="Confirm Password"
              fullWidth
              value={modalUser.password_confirmation}
              type="password"
              onChange={(e) => setModalUser({ ...modalUser, password_confirmation: e.target.value })}
              error={!!fieldErrors.password}
              helperText={fieldErrors.password}
            />
            <TextField
              label="Name"
              fullWidth
              value={modalUser.name}
              onChange={(e) => setModalUser({ ...modalUser, name: e.target.value })}
            />
            <TextField
              label="Age"
              fullWidth
              value={modalUser.age}
              onChange={(e) => setModalUser({ ...modalUser, age: e.target.value })}
            />
            <TextField
              select
              label="Gender"
              fullWidth
              value={modalUser.gender}
              onChange={(e) => setModalUser({ ...modalUser, gender: e.target.value })}
            >
              <MenuItem value={'Male'}>Male</MenuItem>
              <MenuItem value={'Female'}>Female</MenuItem>
            </TextField>
            <TextField
              label="Nationality"
              fullWidth
              value={modalUser.nationality}
              onChange={(e) => setModalUser({ ...modalUser, nationality: e.target.value })}
            />
            <TextField
              label="Postcode"
              fullWidth
              value={modalUser.postcode}
              onChange={(e) => setModalUser({ ...modalUser, postcode: e.target.value })}
            />
            <TextField
              select
              label="Role"
              fullWidth
              value={modalUser.role}
              onChange={(e) => setModalUser({ ...modalUser, role: parseInt(e.target.value, 10) })}
            >
              <MenuItem value={0}>User</MenuItem>
              <MenuItem value={1}>Admin</MenuItem>
            </TextField>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="primary">
            Cancel
          </Button>
          <Button onClick={addUser} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>


      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="User table">
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Nationality</TableCell>
              <TableCell>Postcode</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => renderUserRow(user))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UserManagement;
