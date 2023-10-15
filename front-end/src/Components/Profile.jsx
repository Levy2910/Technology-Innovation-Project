import React, { useState } from 'react';
import axios from 'axios';

import "../Css/Profile.css"



function Profile() {
    const user_id = localStorage.getItem('userId');
    
    const [user, setUser] = useState({
        name: localStorage.getItem('name') || '',
        email: localStorage.getItem('email') || '',
        gender: localStorage.getItem('gender') || '',
        nationality: localStorage.getItem('nationality') || '',
        postcode: localStorage.getItem('postcode') || '',
        password: localStorage.getItem('password') || '',
        age: localStorage.getItem('age') || '',
    });

    // State to track whether the form is in edit mode
    const [isEditing, setIsEditing] = useState(false);

    // Function to handle form input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const user_id = localStorage.getItem('userId');
      
        try {
          const response = await axios.post(`http://localhost:8000/api/users/${user_id}`, {
            name: user.name, 
            email: user.email,
            gender: user.gender,
            nationality: user.nationality,
            postcode: user.postcode,
            password: user.password,
            age: user.age,
          });
      
          // Assuming your API responds with updated user data
          const updatedUserData = response.data.user;
      
          // Update the local storage with the new user data
          localStorage.setItem('name', updatedUserData.name);
          localStorage.setItem('email', updatedUserData.email);
          localStorage.setItem('gender', updatedUserData.gender);
          localStorage.setItem('nationality', updatedUserData.nationality);
          localStorage.setItem('postcode', updatedUserData.postcode);
          // Don't forget to update the password if it's changed
          localStorage.setItem('password', updatedUserData.password);
          localStorage.setItem('age', updatedUserData.age);
      
          setIsEditing(false); // Exit edit mode
        } catch (error) {
          console.error('Error updating user data:', error);
          // Handle errors, e.g., show an error message to the user
        }
      };
      

    // Function to handle canceling the edit
    const handleCancelEdit = () => {
        setIsEditing(false);
        // Reset the user state to the data from local storage
        setUser({
            name: localStorage.getItem('name'),
            email: localStorage.getItem('email'),
            gender: localStorage.getItem('gender'),
            nationality: localStorage.getItem('nationality'),
            postcode: localStorage.getItem('postcode'),
            password: localStorage.getItem('password'),
            age: localStorage.getItem('age'),
        });
    };

    return (
        <div className="profile">
            <div className="profile-info">
                {isEditing ? (
                    <form >
                        <div className="inputField">
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="inputField">
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="inputField">
                            Gender:
                            <input
                                type="text"
                                name="gender"
                                value={user.gender}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="inputField">
                            Age:
                            <input
                                type="text"
                                name="age"
                                value={user.age}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="inputField">
                            Postcode:
                            <input
                                type="text"
                                name="postcode"
                                value={user.postcode}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="inputField">
                            Nationality:
                            <input
                                type="text"
                                name="nationality"
                                value={user.nationality}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="inputField">
                            Password:
                            <input
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Add more fields for editing */}
                        <button type="submit" onClick={handleSubmit}>Save</button>
                        <button type="button" onClick={handleCancelEdit}>Cancel</button>
                    </form>
                ) : (
                    <div>
                        <h2>Your Information: </h2>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Gender: {user.gender}</p>
                        <p>Age: {user.age}</p>
                        <p>Postcode: {user.postcode}</p>
                        <p>Nationality: {user.nationality}</p>
                        {/* Display other user information */}
                        <button onClick={() => {
                            const pass = prompt("Please enter the password to edit: ");
                            if (pass === user.password) {
                                setIsEditing(true);
                            } else {
                                alert("Your password is incorrect!");
                            }
                        }}>Edit</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;
