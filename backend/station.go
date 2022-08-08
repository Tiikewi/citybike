package main

type Station struct {
	FID                int     `json:"fid"`
	ID                 int     `json:"id"`
	StationName        string  `json:"stationName"`
	StationNameSwedish string  `json:"stationNameSwedish"`
	stationNameEnglish string  `json:"stationNameEnglish"`
	Address            string  `json:"address"`
	AddressSwedish     string  `json:"addressSwedish"`
	City               string  `json:"city"`
	CitySwedish        string  `json:"citySwedish"`
	Operator           string  `json:"operator"`
	Capacity           int     `json:"capacity"`
	Xcoord             float32 `json:"xCoord"`
	Ycoord             float32 `json:"yCoord"`
}
