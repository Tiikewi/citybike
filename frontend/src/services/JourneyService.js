import axios from "axios";

export const getJourneys = async () => {
  try {
    const response = axios.get("http://localhost:8080/api/journeys");
    return await response;
  } catch (e) {
    console.log("Error on JourneyService:", e);
    return [];
  }
};
