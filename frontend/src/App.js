import React, { useEffect, useState } from "react";
import JourneyList from "./JourneyList";
import axios from "axios";

function App() {
  const [journeys, setJourneys] = useState([]);
  const [journeyPage, setJourneyPage] = useState(0);
  const [journeyLimit, setJourneyLimit] = useState(10);

  useEffect(() => {
    axios.defaults.baseURL = "http://[::1]:8080/";
    async function fetchJourneys() {
      const response = await axios.get(
        `api?limit=${journeyLimit}&page=${journeyPage}`
      );
      setJourneys(response.data);
    }
    fetchJourneys();
  }, [journeyLimit, journeyPage]);

  const handlePageChange = (event, newPage) => {
    setJourneyPage(newPage);
  };
  const handleRowsPerPage = (event, newLimit) => {
    setJourneyLimit(newLimit);
  };

  return (
    <div>
      <JourneyList
        journeys={journeys}
        page={journeyPage}
        handleChangePage={handlePageChange}
        handleRowsPerPage={handleRowsPerPage}
        limit={journeyLimit}
      ></JourneyList>
    </div>
  );
}

export default App;
