import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Grid, InputAdornment, LinearProgress, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function TableComponent({ columnsData, rowsData, isLoading }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // filter functionality

  const [filterText, setFilterText] = useState("");
  const [filteredRows, setFilteredRows] = useState(rowsData);

  React.useEffect(() => {
    const lowercasedFilter = filterText.toLowerCase();
    const newFilteredRows = rowsData.filter((row) => {
      return columnsData.some((column) => {
        const value = row[column.id];
        return value.toString().toLowerCase().includes(lowercasedFilter);
      });
    });
    setFilteredRows(newFilteredRows);
  }, [filterText, rowsData, columnsData]);

  return (
    <Paper elevation={3} sx={{ width: "100%", overflow: "hidden" }}>
      <Grid container>
        <Grid item xs={12} md={8} lg={5}>
          <TextField
            id="filterInput"
            placeholder="Filter table rows"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            sx={{ padding: 2, width: "100%" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <TableContainer sx={{ maxHeight: 500 }}>
        {isLoading && <LinearProgress />}
        <Table id="myTable" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow className="TableRow">
              {columnsData.map((column) => (
                <TableCell
                  key={column.id}
                  align="left"
                  className="TableCell"
                  style={{
                    minWidth: column.minWidth,
                    background: "#616161",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    className="TableRow"
                  >
                    {columnsData.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align="left"
                          className="TableCell"
                        >
                          {value}
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
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={rowsData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
