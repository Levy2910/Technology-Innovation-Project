/*First registration page
Justin Li 104138316
Last edited 6/10/2023*/
import React from 'react';
import '../Css/Forms.css';


function RegLoginInfo({ formData, handleInputChange, nextStep, validationErrors }) {
  return (
    <div className="form registration-form">
      <h2>Account Information</h2>
      <form onSubmit={nextStep}>
      <div className="form-group">
  <label htmlFor="username">Username:</label>
  <input
    type="text"
    id="username"
    name="username"
    value={formData.username}
    onChange={handleInputChange}
    required
    className="form-input"
  />
</div>
        <div className="form-group">
          {validationErrors.firstName && (
            <p className="error-message">{validationErrors.firstName}</p>
          )}
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          {validationErrors.lastName && (
            <p className="error-message">{validationErrors.lastName}</p>
          )}
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
        {validationErrors.email && (
            <p className="error-message">{validationErrors.email}</p>
          )}
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          {validationErrors.password && (
            <p className="error-message">{validationErrors.password}</p>
          )}
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
        {validationErrors.confirmPassword && (
            <p className="error-message">{validationErrors.confirmPassword}</p>
          )}
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
        <div>
          <button type="button" onClick={nextStep} className="login-button">
            Next
          </button>
        </div>
        <p>
            <a href="/Login" className="link">
              Already have an account? Click here to login!
            </a>
          </p>
      </form>
    </div>
  );
}

export default RegLoginInfo;
