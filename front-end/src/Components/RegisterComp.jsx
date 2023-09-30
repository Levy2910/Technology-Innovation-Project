/*Main registration component
Justin Li 104138316
Last edited 14/09/2023*/

import React, { useState } from 'react';
import axios from 'axios';
import RegLoginInfo from './RegLoginInfo';
import RegDemoInfo from './RegDemoInfo';
import RegResult from './RegResult';


function Registration() {
  //form data state
  const [formData, setFormData] = useState({
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

  //popup constants
  const [showValidationError, setShowValidationError] = useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = useState('');
  const [hideValidationPopup, setHideValidationPopup] = useState(false);


  //constants for handling form navigation
  const [step, setStep] = useState(1);

  const [regSuccess, setRegSuccess] = useState(false);
  const [regError, setRegError] = useState(false);


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
    //collate request data
    const requestData = {
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
          />
        )}
        {step === 2 && (
          <RegDemoInfo
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            prevStep={prevStep}
            nextStep={nextStep}
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

