/*services page
Justin Li 104138316
Last edited 2/10/2023*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/Services.css';
import Header from '../Components/ServicesHeader';
import Image from '../Components/ServicesImage';
import List from '../Components/ServicesList';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

function ServicesPage() {
  const [healthServices, sethealthServices] = useState([]);
  const [supportServices, setSupportServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //send postcode to servicecontroller
  useEffect(() => {
    const url = 'http://localhost:8000/api/services/sort';
    const userPostcode = localStorage.getItem('postcode');

    axios
    //get sorted services from response
      .post(url, { postcode: userPostcode })
      .then((response) => {
        const healthServices = response.data.healthServices;
        const supportServices = response.data.supportServices;
        sethealthServices(healthServices);
        setSupportServices(supportServices);
        setLoading(false);

      })
      //err
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    //needs loading screen to allow time for api response. would be better to replace with spinner.
    return <div>Loading...</div>;
  }

  //err
  if (error) {
    return <div>Error: {error}</div>;
  }
//return page with list entry fields showing if not null
  return (
    <div className="page">
      <Navbar />
      <div className="services">
        <div className="topRow">
          <div className="top">
          <div className="servicestext">
          <Header />
          </div>
          <div className='servicesimage'>
          <Image />
          </div>
          </div>
        </div>
        <div className="bottomRow">
          <div className="bottom">
            <List title="HIV Health Services" items={healthServices}>
              {healthServices &&
                healthServices.map((service) => (
                  <div key={service.id}>
                    <strong>Name:</strong> {service.name}<br />
                    {service.type && (
                      <>
                        <strong>Service Type:</strong> {service.type}<br />
                      </>
                    )}
                    {service.phone && (
                      <>
                        <strong>Phone:</strong> {service.phone}<br />
                      </>
                    )}
                    {service.email && (
                      <>
                        <strong>Email:</strong> {service.email}<br />
                      </>
                    )}
                    {service.address && (
                      <>
                        <strong>Address:</strong> {service.address}<br />
                      </>
                    )}
                    {service.email && (
                    <><strong>Distance:</strong> {service.distance} km<br /></>
                    )}

                    {service.url && (
                      <>
                        <strong>URL:</strong> <a href={service.url} target="_blank">{service.url}</a><br />
                      </>
                    )}
                    <hr />
                  </div>
                ))}
            </List>
          </div>
          <div className="bottom">
            <List title="HIV Support Services" items={supportServices}>
              {supportServices &&
                supportServices.map((service) => (
                  <div key={service.id}>
                    <strong>Name:</strong> {service.name}<br />
                    {service.type && (
                      <>
                        <strong>Service Type:</strong> {service.type}<br />
                      </>
                    )}
                    {service.phone && (
                      <>
                        <strong>Phone:</strong> {service.phone}<br />
                      </>
                    )}
                    {service.email && (
                      <>
                        <strong>Email:</strong> {service.email}<br />
                      </>
                    )}
                    {service.address && (
                      <>
                        <strong>Address:</strong> {service.address}<br />
                      </>
                    )}
                    {service.email && (
                    <><strong>Distance:</strong> {service.distance} km<br /></>
                    )}
                    {service.url && (
                      <>
                        <strong>URL:</strong> <a href={service.url} target="_blank">{service.url}</a><br />
                      </>
                    )}
                    <hr />
                  </div>
                ))}
            </List>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ServicesPage;
