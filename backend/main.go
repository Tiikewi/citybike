package main

import (
	"log"
	"net/http"

	_ "github.com/lib/pq"
)

func main() {
	// -----UNCOMMENT IF YOU WANT TO ADD CSV FILES TO DATABASE------
	// readCSV()
	http.HandleFunc("/api", GETHandler)
	http.HandleFunc("/api/journey/rows", journeyAmountHandler)
	log.Fatal(http.ListenAndServe("[::1]:8080", nil))
}

func journeyAmountHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	row := getJourneyAmount()
	var amount []byte

	if err := row.Scan(&amount); err != nil {
		panic("Error when fetching amount of journeys!")
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(amount)
}
