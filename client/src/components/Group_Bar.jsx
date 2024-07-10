// src/GroupedBarChartComponent.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GroupedBarChartComponent = (datay) => {
    console.log('adswfbieurghf')
    console.log(datay)
    const principal_amount = datay['datay'][0]
    const final_returns = datay['datay'][1]
    const years = datay['datay'][2]
  const data = {
    labels: years,
    datasets: [
      {
        label: 'Invested Amount',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: principal_amount,
      },
      {
        label: 'Final Returns',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: final_returns,
      },
    ],
  };

  const options = {
    indexAxis: 'x',
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Grouped Bar Chart',
      },
    },
    // scales: {
    //   x: {
    //     stacked: true,
    //   },
    //   y: {
    //     stacked: false,
    //   },
    // },
  };

  return <Bar data={data} options={options} />;
};

export default GroupedBarChartComponent;
