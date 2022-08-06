package main

import (
	"encoding/csv"
	"fmt"
	"io"
	"log"
	"os"
	"strconv"
	"time"

	_ "github.com/lib/pq"
)

func main() {
	// http.HandleFunc("/api", GETHandler)
	// log.Fatal(http.ListenAndServe("[::1]:8080", nil))
	readCSV()
}

func readCSV() {
	// open file
	f, err := os.Open("2021-05.csv")
	if err != nil {
		log.Fatal(err)
	}

	defer f.Close()

	csvReader := csv.NewReader(f)
	// skip first line
	if _, err := csvReader.Read(); err != nil {
		panic(err)
	}

	for {
		line, err := csvReader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatal(err)
		}

		// validate line
		fmt.Println(len(line))
		departureTime := line[0]
		returnTime := line[1]
		depID := line[2]
		// depName := line[3]
		returnID := line[4]
		// returnName := line[5]
		distance := line[6]
		duration := line[7]

		inputNums := [4]string{depID, returnID, distance, duration}

		// if line data format is ok, add to journey table
		if validateInt(inputNums[:]) && validateTime(departureTime) && validateTime(returnTime) {
			fmt.Println(line)
		}

	}

}

func validateTime(timeString string) bool {
	// check if times are in correct format
	_, err := time.Parse("2006-01-02T15:04:05", timeString)
	return err == nil
}

func validateInt(numbers []string) bool {
	for _, num := range numbers {
		if kk, err := strconv.ParseInt(num, 10, 64); err != nil {
			return false
		} else if kk < 0 {
			return false
		}
	}
	return true
}
