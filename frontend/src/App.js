import React, { useEffect, useState } from "react";
import JourneyList from "./JourneyList";
import axios from "axios";
import MyNavbar from "./MyNavbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import StationList from "./StationList";

function App() {
  const [journeys, setJourneys] = useState([]);
  const [stations, setStations] = useState([]);
  const [journeyPage, setJourneyPage] = useState(0);
  const [stationPage, setStationPage] = useState(0);
  const [journeyLimit, setJourneyLimit] = useState(10);
  const [stationLimit, setStationLimit] = useState(10);
  const [totalJourneys, setTotalJourneys] = useState(0);

  useEffect(() => {
    axios.defaults.baseURL = "http://[::1]:8080/";

    // get 10 first journeys
    async function getJourneys() {
      const journeyRes = await axios.get(
        `api?limit=${journeyLimit}&page=${journeyPage}`
      );
      setJourneys(journeyRes.data);

      const amuntRes = await axios.get("api/journey/rows");
      setTotalJourneys(amuntRes.data);
    }
    getJourneys();

    // get 10 first stations
    async function getStations() {
      const stationRes = await axios.get(
        `api/stations?limit=${stationLimit}&page=${stationPage}`
      );
      setStations(stationRes.data);
    }
    getStations();
  }, [journeyLimit, journeyPage, stationLimit, stationPage]);

  const handlePageChange = (event, newPage) => {
    setJourneyPage(newPage);
  };
  const handleRowsPerPage = (event, newLimit) => {
    setJourneyLimit(newLimit);
  };

  const handleStationPageChange = (event, newPage) => {
    setStationPage(newPage);
  };
  const handleStationRowsPerPage = (event, newLimit) => {
    setStationLimit(newLimit);
  };

  return (
    <Router>
      <div>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<h1>home</h1>} />
          <Route
            path="/journeys"
            element={
              <JourneyList
                journeys={journeys}
                page={journeyPage}
                handleChangePage={handlePageChange}
                handleRowsPerPage={handleRowsPerPage}
                limit={journeyLimit}
                total={totalJourneys}
              ></JourneyList>
            }
          />
          <Route
            path="/stations"
            element={
              <StationList
                stations={stations}
                page={stationPage}
                handleChangePage={handleStationPageChange}
                handleRowsPerPage={handleStationRowsPerPage}
                limit={stationLimit}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
