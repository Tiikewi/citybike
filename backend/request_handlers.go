package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

func GETHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	limit := r.URL.Query().Get("limit")
	page := r.URL.Query().Get("page")

	var paginationReq PaginationReq = getUrlParams(limit, page)
	var pag Pagination = pagination(paginationReq)

	rows := getJourneys(pag)

	var journeys []Journey

	for rows.Next() {
		var journey Journey
		rows.Scan(
			&journey.ID,
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
}

func getUrlParams(limit string, page string) PaginationReq {
	limitInt, err := strconv.Atoi(limit)
	if err != nil {
		fmt.Println("Incorrect limit param")
	}
	pageInt, err := strconv.Atoi(page)
	if err != nil {
		fmt.Println("Incorrect page param")
	}

	fmt.Printf("limit: %v, page: %v\n", limitInt, pageInt)

	var paginationReq PaginationReq
	paginationReq.Limit = limitInt
	paginationReq.Page = pageInt

	return paginationReq
}
