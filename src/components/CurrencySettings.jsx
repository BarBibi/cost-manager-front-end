import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert } from '@mui/material';

const CurrencySettings = ({ onSaveUrl, currentUrl }) => {
  const [url, setUrl] = useState(currentUrl || 'https://currency-rates-api.onrender.com/rates.json');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem('exchangeRatesUrl', url);
    onSaveUrl(url);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>Settings</Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        Provide an alternative URL for exchange rates API.
      </Typography>
      {saved && <Alert severity="success" sx={{ mb: 2 }}>Settings saved!</Alert>}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField 
          fullWidth 
          label="Exchange Rates API URL" 
          value={url} 
          onChange={(e) => setUrl(e.target.value)} 
        />
        <Button variant="contained" onClick={handleSave}>Update</Button>
      </Box>
    </Paper>
  );
};

export default CurrencySettings;
