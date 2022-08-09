package main

import (
	"log"
	"net/http"
)

func main() {
	// -----UNCOMMENT IF YOU WANT TO ADD CSV FILES TO DATABASE------
	//readJourneyCSV("2021-05.csv")
	// readStationCSV("fileName")

	http.HandleFunc("/api/journeys", journeyGETHandler)
	http.HandleFunc("/api/journey/rows", journeyAmountHandler)
	http.HandleFunc("/api/stations", stationGETHandler)
	http.HandleFunc("/api/stations/counts", stationGETdepartures)

	log.Fatal(http.ListenAndServe("[::1]:8080", nil))
}
