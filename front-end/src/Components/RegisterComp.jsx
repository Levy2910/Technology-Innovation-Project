/*Main registration component
Justin Li 104138316
Last edited 6/10/2023*/

import React, { useState } from 'react';
import axios from 'axios';
import RegLoginInfo from './RegLoginInfo';
import RegDemoInfo from './RegDemoInfo';
import RegResult from './RegResult';


function Registration() {
  //form data state
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: 'na',
    nationality: '',
    postcode: '',
  });

  //constants for handling form navigation
  const [step, setStep] = useState(1);

  const [regSuccess, setRegSuccess] = useState(false);
  const [regError, setRegError] = useState(false);

  //validation

  const [validationErrors, setValidationErrors] = useState({});
  const validateForm = () => {
    const errors = {};

    //validate each field and add errors 
    if (formData.firstName.trim() === '') {
      errors.firstName = 'First name is required';
    } else if (errors.firstName) {
      delete errors.firstName; 
    }

    if (formData.lastName.trim() === '') {
      errors.lastName = 'Last name is required';
    }else if (errors.lastName) {
      delete errors.lastName; 
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    } else if (errors.email) {
      delete errors.email;
    }

    if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    } else if (errors.password) {
      delete errors.password; 
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }else if (errors.confirmPassword) {
      delete errors.confirmPassword; 
    }
    // Validate Age (optional)
    if (formData.age !== '' && (isNaN(formData.age) || parseInt(formData.age) < 0)) {
      errors.age = 'Invalid age';
    } else if (errors.age) {
      delete errors.age; 
    }

    // Validate Nationality (optional)
    if (formData.nationality.trim() !== '') {
      if (!/^[a-zA-Z]+$/.test(formData.nationality)) {
        errors.nationality = 'Nationality should contain only letters';
      }else if (errors.nationality) {
        delete errors.nationality; 
      }
    }

    // Validate Postcode (optional)
    if (formData.postcode.trim() !== '') {
      if (!/^\d{4}$/.test(formData.postcode)) {
        errors.postcode = 'Postcode must be a 4-digit value';
      } else {
        delete errors.postcode; 
      }
    }
    setValidationErrors(errors);

    return Object.keys(errors).length === 0;

  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const resetStep = () => {
    setStep(1);
    setRegSuccess(false);
    setRegError(false);
  };

  //posts to backend
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the form
    if (!validateForm()) {
      return;
    }
    //collate request data
    const requestData = {
      username: formData.username,
      name: formData.firstName + ' ' + formData.lastName, 
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.confirmPassword,
      age: formData.age,
      gender: formData.gender,
      nationality: formData.nationality,
      postcode: formData.postcode,
    };
  
    //post and set regresult boolean triggers. after post set to regresult page
    axios
      .post('http://localhost:8000/api/register', requestData)
      .then((response) => {
        console.log('Registration successful:', response.data);
        setRegError(false);
        setRegSuccess(true);
        nextStep();
      })
      .catch((error) => {
        console.error('Registration error:', error);
        setRegSuccess(false);
        setRegError(true);
        nextStep();
      });
  };

  //returns navigation logic
  return (
    <div className="layout">
      <div className="container">
        {step === 1 && (
          <RegLoginInfo
            formData={formData}
            handleInputChange={handleInputChange}
            nextStep={nextStep}
            validationErrors={validationErrors}
          />
        )}
        {step === 2 && (
          <RegDemoInfo
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            prevStep={prevStep}
            nextStep={nextStep}
            validationErrors={validationErrors}
          />
          )}
          {step === 3 && (
          <RegResult
            regSuccess={regSuccess}
            regError={regError}
            resetStep={resetStep}
          />
          )}
      </div>
    </div>
  );
}

export default Registration;

