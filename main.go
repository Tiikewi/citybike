package main

import (
	"log"
	"net/http"

	_ "github.com/lib/pq"
)

func main() {
	http.HandleFunc("/api", GETHandler)
	log.Fatal(http.ListenAndServe("[::1]:8080", nil))
}
