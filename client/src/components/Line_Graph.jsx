// src/ChartComponent.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartComponent = (datay) => {
    const datax = datay['datay'][0]
    console.log('hello');
    console.log(datay)
    console.log(datax);
    const labelx = datay['datay'][1]
  const data = {
    labels: labelx,
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
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
        text: 'Chart.js Line Chart',
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default ChartComponent;
