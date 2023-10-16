/*Test Result Chart component
Junaid Saleem 103824753
Last edited 15/10/2023*/

import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { apiUrl } from '../Contants';
import axios from 'axios';

const TestResultChart = ({ data }) => {
  const [selectedPostcode, setSelectedPostcode] = useState('');
  const [postcodes, setPostcodes] = useState([]);
  const [chartData, setChartData] = useState(null);
  const initialChartData = {
    labels: ['Postcode1', 'Postcode2', 'Postcode3', 'Postcode4'],
    datasets: [
      {
        data: [50, 30, 20, 10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
      },
    ],
  };

  const fetchTestResults = () => {
    axios.get(apiUrl + '/positiveCasesByPostcodes')
      .then((response) => {
        setPostcodes(response.data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const filterTopResults = () => {
    const postcodeArray = Object.keys(postcodes).map((postcode) => ({
      postcode: postcode,
      count: postcodes[postcode]
    }));
    postcodeArray.sort((a, b) => b.count - a.count);
    //get the top 3 postcodes
    const top3Postcodes = postcodeArray.slice(0, 3);
    const countsOfTop3Postcodes = top3Postcodes.map((postcodeObj) => postcodeObj.count);
    const codesOfTop3Postcodes = top3Postcodes.map((postcodeObj) => postcodeObj.postcode);

    const backgroundColor = generateRandomColors(codesOfTop3Postcodes.length);

    const chartData = {
      labels: codesOfTop3Postcodes,
      datasets: [
        {
          data: countsOfTop3Postcodes, 
          backgroundColor: backgroundColor,
        },
      ],
    };
    setChartData(chartData);
  }

  useEffect(() => {
    fetchTestResults();
  }, [])

  useEffect(() => {
    filterTopResults();
  }, [postcodes])

  const handleSearch = (event) => {
    const { value } = event.target;
    if (value == "") {
      filterTopResults();
      setSelectedPostcode("");
    } else {
      setSelectedPostcode(value);
      const postcodeArray = Object.keys(postcodes).map((postcode) => ({
        postcode: postcode,
        count: postcodes[postcode]
      }));
      const filteredData = postcodeArray.filter((item) => item.postcode === value);

      //generate dynamic background colors based on data length
      const backgroundColor = generateRandomColors(filteredData.length);

      //Updating chart data with the filtered data
      setChartData({
        labels: filteredData.map((item) => item.postcode),
        datasets: [
          {
            data: filteredData.map((item) => item.count),
            backgroundColor: backgroundColor,
          },
        ],
      });
    }
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
      <h2 className="chart-title">Positive Cases by Postcode</h2>
      <div>
        <Pie
          data={chartData || initialChartData}
          options={{
            maintainAspectRatio: false,
          }}
          width={300} // Set the desired width
          height={300} // Set the desired height
        />
      </div>
      <input
        type="text"
        placeholder="Search by Postcode"
        value={selectedPostcode}
        onChange={handleSearch}
        className="search-bar"
      />
    </div>
  );
};

export default TestResultChart;