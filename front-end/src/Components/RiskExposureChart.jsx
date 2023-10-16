/*Risk Exposure Chart component
Junaid Saleem 103824753
Last edited 15/10/2023*/
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import '../Css/Chart.css';
import { apiUrl } from '../Contants';
import axios from 'axios';

const RiskExposureChart = () => {
    const [riskData, setRiskData] = useState([]);
    const [chartData, setChartData] = useState(null);

    const getRiskData = () => {
        axios.get(apiUrl + '/risk-exposure-pie-chart')
            .then((response) => {
                setRiskData(response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        getRiskData();
    }, []);

    useEffect(() => {
        //Convert risk data to chart data format
        if (riskData.length > 0) {
            const labels = riskData.map((item) => item.label);
            const percentages = riskData.map((item) => item.percentage);

            //generate dynamic background colors based on data length
            const backgroundColor = generateRandomColors(riskData.length);

            const chartData = {
                labels: labels,
                datasets: [
                    {
                        data: percentages,
                        backgroundColor: backgroundColor,
                    },
                ],
            };
            setChartData(chartData);
        }
    }, [riskData]);

    const initialChartData = {
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: [],
            },
        ],
    };

    //function to generate random colors
    const generateRandomColors = (count) => {
        const colors = [];
        for (let i = 0; i < count; i++) {
            const color = `rgba(${getRandomValue(0, 255)}, ${getRandomValue(0, 255)}, ${getRandomValue(0, 255)}, 0.6)`;
            colors.push(color);
        }
        return colors;
    };

    //function to generate a random value within a range
    const getRandomValue = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    return (
        <div className="chart-container">
            <h2 className="chart-title">Reasons of Risk Exposure</h2>
            <div>
                <Pie
                    data={chartData || initialChartData}
                    options={{
                        maintainAspectRatio: false,
                    }}
                    width={300}
                    height={300}
                />
            </div>
        </div>
    );
};

export default RiskExposureChart;