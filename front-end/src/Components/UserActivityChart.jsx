/*User Acitivity Chart component
Junaid Saleem 103824753
Last edited 15/10/2023*/

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart,
  registerables
} from 'chart.js';
import 'chart.js/auto';
import '../Css/Chart.css';
import { apiUrl } from '../Contants';
import axios from 'axios';

Chart.register(...registerables);

const UserActivityChart = () => {
  const [users, setUsers] = useState([]);
  const userCountsByDay = [0, 0, 0, 0, 0, 0, 0];
  const [chartData, setChartData] = useState({
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        label: 'Active Users in the Last 7 Days',
        data: userCountsByDay, // Replace with your user activity data
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  const fetchUsers = () => {
    axios.get(apiUrl + '/users')
      .then((response) => {
        // Handle the successful response here
        setUsers(response.data.users);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error:', error);
      });
  };

  const getCounts = () => {
    const sevenDaysAgoTimestamp = Date.now() - 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    // Iterate over the users and count them based on lastLogin
    users.forEach((user) => {
      if (user.last_login) {
        const lastLoginTimestamp = new Date(user.last_login).getTime();
        if (lastLoginTimestamp >= sevenDaysAgoTimestamp) {
          const lastLoginDate = new Date(lastLoginTimestamp);
          const loginDay = lastLoginDate.getDay();
          userCountsByDay[loginDay]++;
        }
      }
    });
    const newChartData = {
      labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      datasets: [
        {
          label: ' Active Users',
          data: userCountsByDay,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
    setChartData(newChartData);
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  useEffect(() => {
    getCounts();
  }, [users]);

  return (
    <div className="chart-container">
      <h2 className="chart-title">User Activity in the Last 7 Days</h2>
      <div>
        <Bar
          data={chartData}
          width={300} // Set the desired width
          height={300} // Set the desired height
          options={{
            animation: {
              duration: 1500, // Animation duration in milliseconds
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  display: false, // Remove -axis gridlines
                },
                title: {
                  display: true,
                  text: 'Number of Users',
                  font: {
                    size: 16,
                    weight: 'bold',
                  },
                },
              },
              x: {
                grid: {
                  display: false, // Remove x-axis gridlines
                },
                title: {
                  display: true,
                  text: 'Days',
                  font: {
                    size: 16,
                    weight: 'bold',
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default UserActivityChart;
