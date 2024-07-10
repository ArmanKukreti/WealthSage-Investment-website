// src/PieChartComponent.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = (datay) => {
  var datax = datay["datay"][0];
  var labelx = datay["datay"][1];
  var data = {
    labels: labelx,
    datasets: [
        {
            data: datax,
            backgroundColor: [
                 "#878BB6", 
                 "#4ACAB4", 
                 "#FF8153", 
                 "#FFEA88"
            ]  
        }]
};

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Annual Data Pie Chart",
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChartComponent;
