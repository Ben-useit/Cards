'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type DataSet = {
  label: string;
  data: number[]; // Y-axis data
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
};

const BarChart = ({
  statusData,
}: {
  statusData: { [key: number]: number };
}) => {
  // Data for the bar chart
  const keys = Object.keys(statusData);
  const values = Object.values(statusData);
  const data: { labels: string[]; datasets: DataSet[] } = {
    labels: keys, // X-axis labels
    datasets: [
      {
        label: '',
        data: values, // Y-axis data
        backgroundColor: 'rgba(85, 212, 0, 0.8)', // Bar color
        borderColor: 'rgba(108, 99, 255, 1)', // Bar border color
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        display: false,
      },
      title: {
        display: false,
        text: 'Bar Chart Example',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
