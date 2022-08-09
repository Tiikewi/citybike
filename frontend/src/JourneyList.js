import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TablePagination,
  TableHead,
  TableFooter,
  Box,
} from "@mui/material/";

import axios from "axios";

export default function JourneyList({}) {
  const [journeys, setJourney] = useState([]);
  const [totalJourneys, setTotalJourneys] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    axios.defaults.baseURL = "http://[::1]:8080/";
    const getData = async () => {
      // get 10 first journey
      const journeyRes = await axios.get(
        `api/journeys?limit=${limit}&page=${page}`
      );
      setJourney(journeyRes.data);
    };
    getData();
  }, [page, limit]);

  useEffect(() => {
    axios.defaults.baseURL = "http://[::1]:8080/";
    const getData = async () => {
      const amountRes = await axios.get("api/journey/rows");
      setTotalJourneys(amountRes.data);
    };
    getData();
  }, []);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const formatDuration = (time) => {
    var seconds = time % 60;
    var minutes = (time / 60).toFixed(0);

    return `${minutes} min ${seconds} s`;
  };

  // Listen arrow keys
  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        if (page !== Math.floor(totalJourneys / limit)) {
          handlePageChange(page + 1);
        }
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        if (page !== 0) {
          handlePageChange(page - 1);
        }
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [totalJourneys, page]);

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
                  count={totalJourneys}
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
