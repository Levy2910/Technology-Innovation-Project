/*Second registration page
Justin Li 104138316
Last edited 6/10/2023*/

import React from 'react';

function RegDemoInfo({ formData, handleInputChange, handleSubmit, prevStep, nextStep, validationErrors}) {
  return (
    <div className="form registration-form">
      <h2>Demographic Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
        {validationErrors.age && (
            <p className="error-message">{validationErrors.age}</p>
          )}
          <label htmlFor="age" className="form-field-optional">
            Age*
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
        {validationErrors.gender && (
            <p className="error-message">{validationErrors.gender}</p>
          )}
          <label htmlFor="gender" className="form-field-optional">
            Gender*
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="form-input"
          >
            <option value="na">Prefer not to say</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
        {validationErrors.nationality && (
            <p className="error-message">{validationErrors.nationality}</p>
          )}
          <label htmlFor="nationality" className="form-field-optional">
            Nationality*
          </label>
          <input
            type="text"
            id="nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
        {validationErrors.postcode && (
            <p className="error-message">{validationErrors.postcode}</p>
          )}
          <label htmlFor="postcode" className="form-field-optional">
            Postcode*
          </label>
          <input
            type="text"
            id="postcode"
            name="postcode"
            value={formData.postcode}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <p>*Fields marked with * are optional.</p>
        <div>
        <button type="button" onClick={prevStep} className="login-button">
            Back
          </button>
          <button type="submit" className="login-button">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegDemoInfo;
