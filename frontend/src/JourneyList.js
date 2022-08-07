import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import { TableFooter } from "@mui/material";

export default function CustomPaginationActionsTable({
  journeys,
  page,
  handleChangePage,
  handleRowsPerPage,
  limit,
}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell>Departure</TableCell>
            <TableCell>Return</TableCell>
            <TableCell>Departure Station ID</TableCell>
            <TableCell>Departure Station Name</TableCell>
            <TableCell>Return Station ID</TableCell>
            <TableCell>Return Station Name</TableCell>
            <TableCell>Distance</TableCell>
            <TableCell>Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {journeys.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.departureTime}
              </TableCell>
              <TableCell style={{ width: 160 }}>{row.returnTime}</TableCell>
              <TableCell style={{ width: 70 }} align="center">
                {row.departureStationId}
              </TableCell>
              <TableCell style={{ width: 160 }}>
                {row.departureStationName}
              </TableCell>
              <TableCell style={{ width: 70 }} align="center">
                {row.returnStationId}
              </TableCell>
              <TableCell style={{ width: 160 }}>
                {row.returnStationName}
              </TableCell>
              <TableCell style={{ width: 160 }}>
                {row.distance} meters
              </TableCell>
              <TableCell style={{ width: 160 }}>
                {row.duration} seconds
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TableFooter>
        <TablePagination
          component="div"
          count={800000}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={limit}
          onRowsPerPageChange={handleRowsPerPage}
        />
      </TableFooter>
    </TableContainer>
  );
}
