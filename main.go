package main

import (
	"encoding/csv"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	_ "github.com/lib/pq"
)

func main() {
	// readCSV()
	http.HandleFunc("/api", GETHandler)
	log.Fatal(http.ListenAndServe("[::1]:8080", nil))
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

	db := OpenConnection()

	for {
		line, err := csvReader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatal(err)
		}

		// validate line
		departureTime := line[0]
		returnTime := line[1]
		depID := line[2]
		depName := line[3]
		returnID := line[4]
		returnName := line[5]
		distance := line[6]
		duration := line[7]

		inputNums := [4]string{depID, returnID, distance, duration}

		// if line data format is ok, add to journey table
		if validateInt(inputNums[:]) && validateTime(departureTime) && validateTime(returnTime) {
			distanceInt, err := strconv.Atoi(distance)
			if err != nil {
				log.Fatal(err)
			}
			durationInt, err := strconv.Atoi(duration)
			if err != nil {
				log.Fatal(err)
			}

			if distanceInt < 10 || durationInt < 10 {
				continue
			}

			sqlStatement := `INSERT INTO journey (departure_time, return_time, departure_station_id,
				 departure_station_name, return_station_id, return_station_name, distance, duration)
				VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`

			_, err = db.Exec(
				sqlStatement,
				departureTime,
				returnTime,
				depID,
				depName,
				returnID,
				returnName,
				distance,
				duration)
			if err != nil {
				panic(err)
			}

		}
	}
	fmt.Println("CSV file added to db")
	defer db.Close()
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
