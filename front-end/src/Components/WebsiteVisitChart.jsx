/*Website Visits Chart component
Junaid Saleem 103824753
Last edited 15/10/2023*/
import React, { useEffect, useState } from 'react';
import Speedometer from "react-d3-speedometer";
import '../Css/Chart.css';
import { apiUrl } from '../Contants';
import axios from 'axios';

const WebsiteVisitsChart = () => {
    const [visits, setVisits] = useState('');

    const getVisitsData = () => {
        axios.get(apiUrl + '/websiteVisitsInLastNDays/30')
            .then((response) => {
                setVisits(response.data.no_of_website_visits_in_last_30_days);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        getVisitsData();
    }, []);

    return (
        <div className="chart-speedo-container">
            <h2 className="chart-title">Website Visits in Last 30 Days</h2>
            <div className="centered-chart">
                <Speedometer
                    value={visits}
                    minValue={0}
                    maxValue={100}
                    needleColor="blue" // Customize the needle color
                    startColor="green" // Customize the start color
                    endColor="red" // Customize the end color
                    options={{
                        maintainAspectRatio: false,
                    }}
                />
            </div>
        </div>
    );
};

export default WebsiteVisitsChart;
