package main

import (
	"log"
	"net/http"

	_ "github.com/lib/pq"
)

func main() {
	// -----UNCOMMENT IF YOU WANT TO ADD CSV FILES TO DATABASE------
	// readJourneyCSV("fileName")
	// readStationCSV("fileName")

	http.HandleFunc("/api/journeys", journeyGETHandler)
	http.HandleFunc("/api/journey/rows", journeyAmountHandler)
	http.HandleFunc("/api/stations", stationGETHandler)

	log.Fatal(http.ListenAndServe("[::1]:8080", nil))
}
