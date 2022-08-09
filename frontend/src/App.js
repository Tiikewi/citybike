import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JourneyList from "./JourneyList";
import MyNavbar from "./MyNavbar";
import StationList from "./StationList";
import SingleStation from "./SingleStation";
import Home from "./Home";

function App() {
  return (
    <Router>
      <div>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/journeys" element={<JourneyList />} />
          <Route path="/stations" element={<StationList />} />
          <Route path="stations/:id" element={<SingleStation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
