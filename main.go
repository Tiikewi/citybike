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
	log.Fatal(http.ListenAndServe("[::1]:8080", nil))
}
