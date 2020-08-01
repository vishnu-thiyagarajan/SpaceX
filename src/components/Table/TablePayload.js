import React, {useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {PayloadContext} from '../App';

const columns = [
    {
        id: 'orbit',
        label: 'Orbit',
        minWidth: 100,
    },
    {
        id: 'payload_id',
        label: 'Payload ID',
        minWidth: 100,
        },
    {
        id: 'payload_type',
        label: 'Payload Type',
        minWidth: 100,
        },
    { id: 'customers', label: 'Customers', minWidth: 50 },
    { id: 'manufacturer', label: 'Manufacturer', minWidth: 100 },
    { id: 'nationality', label: 'Nationality', minWidth: 100 },
    {
        id: 'norad_id',
        label: 'Norad ID',
        minWidth: 100,
    },
    {
        id: 'payload_mass_kg',
        label: 'Payload Mass Kg',
        minWidth: 100,
        align: 'right',
    },
    {
        id: 'payload_mass_lbs',
        label: 'Payload Mass Lbs',
        minWidth: 100,
        align: 'right',
    },
    {
        id: 'reused',
        label: 'Reused',
        minWidth: 100,
    },
  
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export default function TableHistory() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { payload } = useContext(PayloadContext);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
    {payload && <Paper className={classes.root}>
      <TableContainer>
        <Table size="small" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                  style={{ minWidth: 250 }}
                >
                  Orbit Params
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {payload.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.payload_id}>
                    <TableCell>
                    <ol>
                        {Object.keys(row.orbit_params).map((key)=>{
                            if(row.orbit_params[key]){
                                return (
                                    <li>{key} : {row.orbit_params[key]}</li>
                                )
                            }
                            return (<></>)
                        })}
                    </ol>
                  </TableCell>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={payload.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>}
    </>
  );
}
