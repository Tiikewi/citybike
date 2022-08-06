import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import TableHead from "@mui/material/TableHead";

function createData(dep, ret, depID, depName, retID, retName, dist, dur) {
  return { dep, ret, depID, depName, retID, retName, dist, dur };
}

const rows = [
  createData(
    "21-02-2020 00:01",
    "21-02-2020 00:02",
    "1",
    "Lahto Station",
    "2",
    "Paluu Station",
    "120",
    "500"
  ),
  createData(
    "22-02-2020 00:01",
    "22-02-2020 00:02",
    "1",
    "Lahto Station",
    "2",
    "Paluu Station",
    "122",
    "502"
  ),
  createData(
    "22-02-2020 00:01",
    "23-02-2020 10:02",
    "1",
    "Lahto Station",
    "2",
    "Paluu Station",
    "124",
    "504"
  ),
  createData(
    "22-02-2020 00:01",
    "23-02-2020 10:02",
    "1",
    "Lahto Station",
    "2",
    "Paluu Station",
    "124",
    "504"
  ),
  createData(
    "22-02-2020 00:01",
    "23-02-2020 10:02",
    "1",
    "Lahto Station",
    "2",
    "Paluu Station",
    "124",
    "504"
  ),
  createData(
    "22-02-2020 00:01",
    "23-02-2020 10:02",
    "1",
    "Lahto Station",
    "2",
    "Paluu Station",
    "124",
    "504"
  ),
  createData(
    "22-02-2020 00:01",
    "23-02-2020 10:02",
    "1",
    "Lahto Station",
    "2",
    "Paluu Station",
    "124",
    "504"
  ),
  createData(
    "22-02-2020 00:01",
    "23-02-2020 10:02",
    "1",
    "Lahto Station",
    "2",
    "Paluu Station",
    "124",
    "504"
  ),
  createData(
    "22-02-2020 00:01",
    "23-02-2020 10:02",
    "1",
    "Lahto Station",
    "2",
    "Paluu Station",
    "124",
    "504"
  ),
  createData(
    "22-02-2020 00:01",
    "23-02-2020 10:02",
    "1",
    "Lahto Station",
    "2",
    "Paluu Station",
    "124",
    "504"
  ),
];

export default function CustomPaginationActionsTable() {
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
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.dep}
              </TableCell>
              <TableCell style={{ width: 160 }}>{row.ret}</TableCell>
              <TableCell style={{ width: 70 }} align="center">
                {row.depID}
              </TableCell>
              <TableCell style={{ width: 160 }}>{row.depName}</TableCell>
              <TableCell style={{ width: 70 }} align="center">
                {row.retID}
              </TableCell>
              <TableCell style={{ width: 160 }}>{row.retName}</TableCell>
              <TableCell style={{ width: 160 }}>{row.dist} meters</TableCell>
              <TableCell style={{ width: 160 }}>{row.dur} seconds</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
