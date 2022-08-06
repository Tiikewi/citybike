package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "github.com/lib/pq"
)

type Journey struct {
	DepTime        string `json:"departureTime"`
	RetTime        string `json:"returnTime"`
	DepStationId   int    `json:"departureStationId"`
	DepStationName string `json:"departureStationName"`
	RetStationId   int    `json:"retStationId"`
	RetStationName string `json:"returnStationName"`
	Distance       int    `json:"distance"`
	Duration       int    `json:"duration"`
}

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "postgres"
	dbname   = "postgres"
)

func OpenConnection() *sql.DB {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)

	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}

	err = db.Ping()
	if err != nil {
		panic(err)
	}

	return db
}

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

func main() {
	http.HandleFunc("/api", GETHandler)
	log.Fatal(http.ListenAndServe("[::1]:8080", nil))
}
