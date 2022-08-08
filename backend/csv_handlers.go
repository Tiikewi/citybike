package main

import (
	"encoding/csv"
	"fmt"
	"io"
	"log"
	"os"
	"strconv"
	"time"
)

func readJourneyCSV(fileName string) {
	// open file
	f, err := os.Open(fileName)
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
	fmt.Println("journey CSV file added to db")
	defer db.Close()
}

func readStationCSV(fileName string) {
	// open file
	f, err := os.Open(fileName)
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

		fID := line[0]
		ID := line[1]
		stationName := line[2]
		stationNameSwedish := line[3]
		stationNameEnglish := line[4]
		address := line[5]
		addressSwedish := line[6]
		city := line[7]
		citySwedish := line[8]
		operator := line[9]
		capacity := line[10]
		xCoord := line[11]
		yCoord := line[12]

		sqlStatement := `INSERT INTO station
				VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);`

		_, err = db.Exec(sqlStatement,
			fID,
			ID,
			stationName,
			stationNameSwedish,
			stationNameEnglish,
			address,
			addressSwedish,
			city,
			citySwedish,
			operator,
			capacity,
			xCoord,
			yCoord)

		if err != nil {
			panic(err)
		}

	}

	fmt.Println("Station CSV file added to db")
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
