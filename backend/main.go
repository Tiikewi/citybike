package main

import (
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/api/journeys", journeyGETHandler)
	http.HandleFunc("/api/journey/rows", journeyAmountHandler)
	http.HandleFunc("/api/stations", stationGETHandler)
	http.HandleFunc("/api/stations/counts", stationGETdepartures)

	log.Fatal(http.ListenAndServe("[::1]:8080", nil))
}
