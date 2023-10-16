/*test logging comp
Justin Li 104138316
Last edited 6/10/2023*/
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Css/Forms.css';
function LogTest() {
  //state management
  const [testResult, setTestResult] = useState('negative');
  const [riskExposure, setRiskExposure] = useState('none');
  const [reasonForTest, setReasonForTest] = useState('');
  const [receivePDF, setReceivePDF] = useState('no');
  const [sendToServices, setSendToServices] = useState('no')
  const navigate = useNavigate();
  const handleTestResultChange = (e) => {
    setTestResult(e.target.value);
  };
  const handleReceivePDFChange = (e) => {
    setReceivePDF(e.target.value);
  };
  const handleSendToServicesChange = (e) => {
    setSendToServices(e.target.value);
  };
  const handleRiskExposureChange = (e) => {
    setRiskExposure(e.target.value);
  };

  const [reasonForTestError, setReasonForTestError] = useState('');
  //reason for test validation and change
  const handleReasonForTestChange = (e) => {
    if (e.target.value.length > 255) {
      setReasonForTestError('Reason for Testing must be 255 characters or less.');
    } else {
      setReasonForTestError('');
    }
    setReasonForTest(e.target.value);
  };
  //state to track form submission status
  const [submitted, setSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);
  //sends to server
  const handleSubmit = async (e) => {
    e.preventDefault();
    //dont submit if reasonfortest too long
    if (reasonForTestError) {
      return; 
    }
    const formData = {
      user_id: localStorage.getItem('userId'),
      test_result: testResult,
      risk_exposure: riskExposure,
      reason_for_test: reasonForTest,
      receive_pdf: receivePDF,
      send_to_services: sendToServices,
    };
    try {
      console.log('formData:', formData);
      const response = await axios.post('http://127.0.0.1:8000/api/logTest', JSON.stringify(formData),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
      if (formData.receive_pdf === 'yes') { // Fix the typo in formData.receive_pdf
        const urlPDF = response.data.pdf_url;
        window.open(urlPDF, '_blank');
      }
      setSubmitted(true);
    } catch (error) {
      setSubmissionError(true);
    }
  };
  const riskExposureOptions = [
    { value: 'none', label: 'None' },
    { value: 'Unprotected Sex', label: 'Unprotected Sex' },
    { value: 'Sharing Needles', label: 'Sharing Needles' },
    { value: 'Blood Transfusions', label: 'Blood Transfusions' },
    { value: 'Occupational Exposure', label: 'Occupational Exposure' },
    { value: 'Needlestick Injury', label: 'Needlestick Injury' },
    { value: 'Other', label: 'Other' },
  ];
  useEffect(() => {
    //check if the user is not authenticated and navigate to the login page
    if (localStorage.getItem('userId') == null) {
      navigate('/login');
    }
  }, [navigate]);
  //render the success message if the form is submitted successfully
  if (submitted) {
    return (
      <div className="layout">
        <div className="container">
          <div className="form">
            <h2>Test Results Submitted Successfully</h2>
          </div>
        </div>
      </div>
    );
  }
  //render the error message if there was a submission error
  if (submissionError) {
    return (
      <div className="layout">
        <div className="container">
          <div className="form">
            <h2>Something went wrong! Please try again later.</h2>
          </div>
        </div>
      </div>
    );
  }
  //render the form if it hasn't been submitted or if there's no submission error
  return (
    <div className="layout">
      <div className="container">
        <div className="form">
          <h2>Log Test Results</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="testResult">Test Result</label>
              <select
                id="testResult"
                name="testResult"
                value={testResult}
                onChange={handleTestResultChange}
                required
                className="form-input"
              >
                <option value="positive">Positive</option>
                <option value="negative">Negative</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="risk_exposure" className='form-field-optional'>Risk Exposure*</label>
              <select
                id="risk_exposure"
                name="risk_exposure"
                value={riskExposure}
                onChange={handleRiskExposureChange}
                className="form-input"
              >
                {riskExposureOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="reasonForTest">Reason for Testing*</label>
              <textarea
                id="reasonForTest"
                name="reasonForTest"
                value={reasonForTest}
                onChange={handleReasonForTestChange}
                className="form-input"
                rows="4"
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="receivePDF" className='form-field-optional'>Would you like to download a certificate of your result?*</label>
              <select
                id="receivePDF"
                name="receivePDF"
                value={receivePDF}
                onChange={handleReceivePDFChange}
                className="form-input"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="sendToServices" className='form-field-optional'>Would you like us to get local services to contact you?*</label>
              <select
                id="sendToServices"
                name="sendToServices"
                value={sendToServices}
                onChange={handleSendToServicesChange}
                className="form-input"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <p>*Fields marked with * are optional.</p>
            <div className="form-button-group">
              <button type="submit" className="login-button">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default LogTest;
