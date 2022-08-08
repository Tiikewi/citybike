package main

import (
	"encoding/json"
	"log"
	"net/http"

	_ "github.com/lib/pq"
)

func main() {
	// -----UNCOMMENT IF YOU WANT TO ADD CSV FILES TO DATABASE------
	// readJourneyCSV("fileName")
	// readStationCSV("fileName")
	http.HandleFunc("/api", GETHandler)
	http.HandleFunc("/api/journey/rows", journeyAmountHandler)
	http.HandleFunc("/api/stations", stationGETHandler)
	log.Fatal(http.ListenAndServe("[::1]:8080", nil))
}

func stationGETHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	limit := r.URL.Query().Get("limit")
	page := r.URL.Query().Get("page")

	var paginationReq PaginationReq = getUrlParams(limit, page)
	var pag Pagination = pagination(paginationReq)

	rows := getStations(pag)

	var stations []Station

	for rows.Next() {
		var station Station
		rows.Scan(
			&station.FID,
			&station.ID,
			&station.StationName,
			&station.StationNameSwedish,
			&station.StationNameEnglish,
			&station.Address,
			&station.AddressSwedish,
			&station.City,
			&station.CitySwedish,
			&station.Operator,
			&station.Capacity,
			&station.Xcoord,
			&station.Ycoord,
		)

		stations = append(stations, station)
	}

	stationBytes, _ := json.MarshalIndent(stations, "", "\t")

	w.Header().Set("Content-Type", "application/json")
	w.Write(stationBytes)

	defer rows.Close()
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
