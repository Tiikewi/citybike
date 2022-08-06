package main

import (
	"encoding/json"
	"log"
	"net/http"
)

func GETHandler(w http.ResponseWriter, r *http.Request) {
	db := OpenConnection()

	rows, err := db.Query("SELECT * FROM journey")
	if err != nil {
		log.Fatal(err)
	}
	log.Println("GET")

	var journeys []Journey

	for rows.Next() {
		var journey Journey
		rows.Scan(
			&journey.DepTime,
			&journey.RetTime,
			&journey.DepStationId,
			&journey.DepStationName,
			&journey.RetStationId,
			&journey.RetStationName,
			&journey.Distance,
			&journey.Duration)
		journeys = append(journeys, journey)
	}

	journeyBytes, _ := json.MarshalIndent(journeys, "", "\t")

	w.Header().Set("Content-Type", "application/json")
	w.Write(journeyBytes)

	defer rows.Close()
	defer db.Close()
}
