import React, { useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import { TableFooter } from "@mui/material";
import Box from "@mui/material/Box";

export default function JourneyList({
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

  useEffect(() => {
    const keyDownHandler = (event) => {
      // Use arrow keys to change page
      if (event.key === "ArrowRight") {
        event.preventDefault();
        if (page != Math.ceil(total / limit)) {
          handleChangePage(null, page + 1);
        }
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        if (page != 0) {
          handleChangePage(null, page - 1);
        }
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [total]);

  return (
    <div>
      <hr />
      <h1 align="center">JOURNEYS</h1>
      <hr />
      <Box sx={{ m: 4 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
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
                  <TableCell style={{ width: 50 }} align="center">
                    {row.departureStationId}
                  </TableCell>
                  <TableCell style={{ width: 100 }}>
                    {row.departureStationName}
                  </TableCell>
                  <TableCell style={{ width: 50 }} align="center">
                    {row.returnStationId}
                  </TableCell>
                  <TableCell style={{ width: 100 }}>
                    {row.returnStationName}
                  </TableCell>
                  <TableCell style={{ width: 50 }}>
                    {(row.distance / 100).toFixed(2)} km
                  </TableCell>
                  <TableCell style={{ width: 50 }}>
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
      </Box>
    </div>
  );
}
