import React, { useEffect, useState } from "react";
import JourneyList from "./JourneyList";
import axios from "axios";
import MyNavbar from "./MyNavbar";

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
    <div>
      <MyNavbar></MyNavbar>
      <JourneyList
        journeys={journeys}
        page={journeyPage}
        handleChangePage={handlePageChange}
        handleRowsPerPage={handleRowsPerPage}
        limit={journeyLimit}
        total={totalJourneys}
      ></JourneyList>
    </div>
  );
}

export default App;
