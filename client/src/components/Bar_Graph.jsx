// src/YearlyChartComponent.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const YearlyChartComponent = (datay) => {
    var datax = datay['datay'][1]
    var labelx = datay['datay'][0]
  const data = {
    labels: labelx,
    datasets: [
      {
        label: 'Annual Data',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: datax,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Annual Data Bar Chart',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default YearlyChartComponent;
