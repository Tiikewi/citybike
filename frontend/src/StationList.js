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
import Modal from "./Modal";

export default function StationList({
  stations,
  page,
  handleChangePage,
  handleRowsPerPage,
  limit,
  total = 457,
}) {
  useEffect(() => {
    const keyDownHandler = (event) => {
      // Use arrow keys to change page
      if (event.key === "ArrowRight") {
        event.preventDefault();
        if (page !== Math.floor(total / limit)) {
          handleChangePage(null, page + 1);
        }
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        if (page !== 0) {
          handleChangePage(null, page - 1);
        }
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [total, page]);

  return (
    <div>
      <hr />
      <h1 align="center">STATIONS</h1>
      <hr />
      <Box sx={{ m: 4 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>City</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stations.map((row) => (
                <TableRow key={row.id}>
                  <TableCell style={{ width: 100 }}>{row.id}</TableCell>
                  <TableCell style={{ width: 200 }}>
                    {row.stationName}
                  </TableCell>
                  <TableCell style={{ width: 200 }}>{row.city}</TableCell>
                  <TableCell align="center">{Modal()}</TableCell>
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
