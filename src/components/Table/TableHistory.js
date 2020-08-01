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
import {HistoryContext} from '../App';

const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'title', label: 'Title', minWidth: 100 },
  { id: 'details', label: 'Details', minWidth: 100 },
  {
    id: 'flight_number',
    label: 'Flight Number',
    minWidth: 100,
    align: 'right',
  },
  {
    id: 'event_date_utc',
    label: 'Event Date',
    minWidth: 100,
    align: 'right',
  }
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
  const { history } = useContext(HistoryContext);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
    {history && 
      (<Paper className={classes.root}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell
                    style={{ minWidth: 170 }}
                  >
                    Links
                  </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      <ol>
                        { row.links.article && <li><a href={row.links.article}>Article</a></li>}
                        { row.links.reddit && <li><a href={row.links.reddit}>Reddit</a></li>}
                        { row.links.wikipedia && <li><a href={row.links.wikipedia}>Wikipedia</a></li>}
                      </ol>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={history.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>)}
    </>
  );
}
