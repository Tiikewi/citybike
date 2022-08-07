import React, { useEffect, useState } from "react";
import JourneyList from "./JourneyList";
import axios from "axios";

function App() {
  function createData(dep, ret, depID, depName, retID, retName, dist, dur) {
    return { dep, ret, depID, depName, retID, retName, dist, dur };
  }

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

  return (
    <div>
      <JourneyList journeys={journeys}></JourneyList>
    </div>
  );
}

export default App;
