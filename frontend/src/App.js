import React, { useEffect, useState } from "react";
import JourneyList from "./JourneyList";
import axios from "axios";
import MyNavbar from "./MyNavbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [journeys, setJourneys] = useState([]);
  const [journeyPage, setJourneyPage] = useState(0);
  const [journeyLimit, setJourneyLimit] = useState(10);
  const [totalJourneys, setTotalJourneys] = useState(0);

  useEffect(() => {
    axios.defaults.baseURL = "http://[::1]:8080/";
    async function fetchJourneys() {
      const response = await axios.get(
        `api?limit=${journeyLimit}&page=${journeyPage}`
      );
      setJourneys(response.data);

      const response2 = await axios.get("api/journey/rows");
      setTotalJourneys(response2.data);
    }
    fetchJourneys();
  }, [journeyLimit, journeyPage]);

  const handlePageChange = (event, newPage) => {
    setJourneyPage(newPage);
  };
  const handleRowsPerPage = (event, newLimit) => {
    console.log("new limit:", newLimit);
    setJourneyLimit(newLimit);
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
          <Route path="/stations" element={<h1>stations</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
