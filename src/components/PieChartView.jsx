/* 
 * PieChartView.jsx - Visualizes expense distribution by category for a specific month.
 */
import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartView = ({ data, currency }) => {
  /* Aggregate total costs per category for the chart dataset */
  const categoryTotals = data.reduce((acc, cost) => {
    acc[cost.category] = (acc[cost.category] || 0) + cost.convertedSum;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(categoryTotals),
    datasets: [{
      data: Object.values(categoryTotals),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF'],
    }],
  };

  return (
    <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h5" gutterBottom>Expense Distribution ({currency})</Typography>
      <Box sx={{ width: '100%', maxWidth: '500px', mt: 2 }}>
        <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: true }} />
      </Box>
    </Paper>
  );
};

export default PieChartView;
