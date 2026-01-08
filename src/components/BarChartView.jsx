import React, { useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getReport } from '../idb';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartView = ({ year, currency, rates }) => {
  const [monthlyTotals, setMonthlyTotals] = useState(Array(12).fill(0));

  useEffect(() => {
    const fetchYearlyData = async () => {
      const totals = await Promise.all(
        [...Array(12)].map(async (_, i) => {
          const report = await getReport(year, i + 1, currency, rates);
          return report.totalSum;
        })
      );
      setMonthlyTotals(totals);
    };
    fetchYearlyData();
  }, [year, currency, rates]);

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: `Total Costs in ${currency}`,
      data: monthlyTotals,
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
    }],
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" align="center">Monthly Trend ({year})</Typography>
      <Bar data={chartData} />
    </Paper>
  );
};

export default BarChartView;
