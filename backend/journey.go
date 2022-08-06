package main

type Journey struct {
	ID             int    `json:"id"`
	DepTime        string `json:"departureTime"`
	RetTime        string `json:"returnTime"`
	DepStationId   int    `json:"departureStationId"`
	DepStationName string `json:"departureStationName"`
	RetStationId   int    `json:"retStationId"`
	RetStationName string `json:"returnStationName"`
	Distance       int    `json:"distance"`
	Duration       int    `json:"duration"`
}
