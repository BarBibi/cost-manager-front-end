import React, { useState } from 'react';
import { Box, TextField, MenuItem, Button, Typography, Paper, Alert } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addCost } from '../idb';
import dayjs from 'dayjs';

const categories = ['Food', 'Health', 'Housing', 'Sport', 'Education', 'Transportation', 'Other'];
const currencies = ['USD', 'ILS', 'GBP', 'EURO'];

const AddCostForm = () => {
  const [sum, setSum] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [category, setCategory] = useState('Food');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(dayjs());
  const [status, setStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addCost({
        sum: parseFloat(sum),
        currency,
        category,
        description,
        date: date ? date.format('YYYY-MM-DD') : null
      });
      setStatus({ type: 'success', message: 'Cost added successfully!' });
      setSum('');
      setDescription('');
    } catch {
      setStatus({ type: 'error', message: 'Failed to save cost.' });
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>Add New Expense</Typography>
      {status && <Alert severity={status.type} sx={{ mb: 2 }}>{status.message}</Alert>}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
        <TextField label="Sum" type="number" value={sum} onChange={(e) => setSum(e.target.value)} required />
        <TextField select label="Currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
          {currencies.map((option) => (<MenuItem key={option} value={option}>{option}</MenuItem>))}
        </TextField>
        <TextField select label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((option) => (<MenuItem key={option} value={option}>{option}</MenuItem>))}
        </TextField>
        <DatePicker label="Date" value={date} onChange={(newDate) => setDate(newDate)} />
        <TextField label="Description" multiline rows={2} value={description} onChange={(e) => setDescription(e.target.value)} required />
        <Button type="submit" variant="contained">Save Expense</Button>
      </Box>
    </Paper>
  );
};

export default AddCostForm;
