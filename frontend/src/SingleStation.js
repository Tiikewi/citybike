import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Spinner from "react-bootstrap/Spinner";

const SingleStation = () => {
  const [station, setStation] = useState({});
  const [departures, setDepartures] = useState(0);
  const [returns, setRetuns] = useState(0);

  const stationID = useParams();

  useEffect(() => {
    // TODO: Change to use only one api call.

    axios.defaults.baseURL = "http://[::1]:8080/";
    const getData = async () => {
      const stationRes = await axios.get(`api/stations?id=${stationID.id}`);
      setStation(stationRes.data);

      const depRes = await axios.get(
        `api/stations/counts?id=${stationID.id}&type=departure`
      );
      setDepartures(depRes.data);

      const retRes = await axios.get(
        `api/stations/counts?id=${stationID.id}&type=return`
      );

      setRetuns(retRes.data);
    };
    getData();
  }, []);

  return (
    <div>
      <Box sx={{ mt: 2, ml: 12, mr: 12, mb: 2 }}>
        {returns !== 0 ? (
          <div>
            <Typography align="center" variant="h2">
              {station.stationName}
            </Typography>
            <hr />
            <Typography variant="h5" align="center">
              Address: {station.address}
            </Typography>
            <Typography variant="h5" align="center">
              Amount of returns to this station: {returns}
            </Typography>
            <Typography variant="h5" align="center">
              Amount of departures from this station: {departures}
            </Typography>
          </div>
        ) : (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </Box>
    </div>
  );
};

export default SingleStation;
