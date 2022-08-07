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
  total,
}) {
  const formatDuration = (time) => {
    var seconds = time % 60;
    var minutes = (time / 60).toFixed(0);

    return `${minutes} min ${seconds} s`;
  };

  const formatDate = (dateString) => {
    // Format the date hard way because in data, month starts from 1 and in js-date from 0.
    const dts = dateString.split("T");
    const dateSplit = dts[0].split("-");
    // Remove trailing 'Z'
    const time = dts[1].slice(0, -1);

    const year = dateSplit[0];
    const month = dateSplit[1];
    const day = dateSplit[2];

    return `${day}.${month}.${year} ${time}`;
  };
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
                {formatDate(row.departureTime)}
              </TableCell>
              <TableCell style={{ width: 160 }}>
                {formatDate(row.returnTime)}
              </TableCell>
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
                {(row.distance / 100).toFixed(2)} km
              </TableCell>
              <TableCell style={{ width: 160 }}>
                {formatDuration(row.duration)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10]}
              count={total}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={limit}
              onRowsPerPageChange={handleRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
