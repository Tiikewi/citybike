package main

import (
	"fmt"
	"log"
)

func main() {
	fmt.Println("Enter filename:")
	var filename string
	_, err := fmt.Scanln(&filename)
	if err != nil {
		log.Fatal(err)
	}

	readJourneyCSV(filename)
}
