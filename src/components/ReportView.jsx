/* 
 * ReportView.jsx - Component for displaying expenses in a tabular format.
 * Shows converted sums and the total monthly expenditure.
 */
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

const ReportView = ({ reportData, currency }) => {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Table>
        <TableHead sx={{ backgroundColor: 'action.hover' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Amount ({currency})</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reportData.costs.length > 0 ? (
            reportData.costs.map((cost) => (
              <TableRow key={cost.id} hover>
                <TableCell>{cost.date}</TableCell>
                <TableCell>{cost.category}</TableCell>
                <TableCell>{cost.description}</TableCell>
                <TableCell align="right">
                  {cost.convertedSum.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">No records found for this period.</TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell colSpan={3} sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Total Monthly Expenses</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'primary.main' }}>
              {reportData.totalSum.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currency}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ReportView;
