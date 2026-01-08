import React from 'react';
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Typography,
  Box,
  Tabs,
  Tab,
  TextField,
  MenuItem,
  IconButton
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

/* Import components from the components directory */
import AddCostForm from './components/AddCostForm';
import ReportView from './components/ReportView';
import PieChartView from './components/PieChartView';
import BarChartView from './components/BarChartView';
import CurrencySettings from './components/CurrencySettings';
import { getReport } from './idb';

const DEFAULT_RATES_URL = 'https://currency-rates-api.onrender.com/rates.json';

function App() {
  const [mode, setMode] = React.useState(localStorage.getItem('themeMode') || 'light');
  const [tabValue, setTabValue] = React.useState(0);
  const [ratesUrl, setRatesUrl] = React.useState(localStorage.getItem('exchangeRatesUrl') || DEFAULT_RATES_URL);
  const [exchangeRates, setExchangeRates] = React.useState({ "USD": 1 });
  
  // Shared state for filtering (Year/Month/Currency) to keep tabs synced
  const [year, setYear] = React.useState(new Date().getFullYear());
  const [month, setMonth] = React.useState(new Date().getMonth() + 1);
  const [currency, setCurrency] = React.useState('USD');
  const [reportData, setReportData] = React.useState({ costs: [], totalSum: 0 });

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: mode === 'light' ? '#1976d2' : '#90caf9' },
          secondary: { main: mode === 'light' ? '#dc004e' : '#f48fb1' },
        },
      }),
    [mode],
  );

  const toggleColorMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  /* Fetch rates and data */
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(ratesUrl);
        const rates = response.ok ? await response.json() : { "USD": 1, "ILS": 3.4 };
        setExchangeRates(rates);
        
        const data = await getReport(year, month, currency, rates);
        setReportData(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, [ratesUrl, year, month, currency]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Box sx={{ my: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                Cost Manager
              </Typography>
              <IconButton onClick={toggleColorMode} color="inherit">
                {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Box>
            
            <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" sx={{ mb: 4, borderBottom: 1, borderColor: 'divider' }}>
              <Tab label="Add Expense" />
              <Tab label="Table Report" />
              <Tab label="Category Pie" />
              <Tab label="Yearly Bar" />
              <Tab label="Settings" />
            </Tabs>

            <Box sx={{ mt: 2 }}>
              {tabValue === 0 && <AddCostForm />}
              
              {(tabValue === 1 || tabValue === 2 || tabValue === 3) && (
                <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
                   <TextField label="Year" type="number" value={year} onChange={(e) => setYear(e.target.value)} />
                   {(tabValue === 1 || tabValue === 2) && (
                     <TextField select label="Month" value={month} onChange={(e) => setMonth(e.target.value)} sx={{ width: 120 }}>
                        {[...Array(12)].map((_, i) => <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>)}
                     </TextField>
                   )}
                   <TextField select label="Currency" value={currency} onChange={(e) => setCurrency(e.target.value)} sx={{ width: 120 }}>
                      {['USD', 'ILS', 'GBP', 'EURO'].map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                   </TextField>
                </Box>
              )}

              {tabValue === 1 && <ReportView reportData={reportData} currency={currency} />}
              {tabValue === 2 && <PieChartView data={reportData.costs} currency={currency} />}
              {tabValue === 3 && <BarChartView year={year} currency={currency} rates={exchangeRates} />}
              {tabValue === 4 && <CurrencySettings currentUrl={ratesUrl} onSaveUrl={(url) => setRatesUrl(url)} />}
            </Box>
          </Box>
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;