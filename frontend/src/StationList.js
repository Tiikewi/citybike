import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

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
import Button from "@mui/material/Button";
import axios from "axios";

export default function StationList({}) {
  const [stations, setStations] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(457); // TODO get amount

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      axios.defaults.baseURL = "http://[::1]:8080/";
      // get 10 first stations
      const stationRes = await axios.get(
        `api/stations?limit=${limit}&page=${page}`
      );
      setStations(stationRes.data);
    };
    getData();
  }, [limit, page]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

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

  const stationBtnHandler = (s) => {
    navigate(`/stations/${s.id}`);
  };

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
                  <TableCell align="center">
                    <Button
                      onClick={(event) => stationBtnHandler(row)}
                      variant="outlined"
                    >
                      More
                    </Button>
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
                  onPageChange={handlePageChange}
                  rowsPerPage={limit}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}
