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

	csvFile, err := os.Create("journey.csv")
	if err != nil {
		log.Fatalf("failed creating file: %s", err)
	}

	csvwriter := csv.NewWriter(csvFile)

	csvReader := csv.NewReader(f)
	// skip first line
	if _, err := csvReader.Read(); err != nil {
		panic(err)
	}

	defer f.Close()
	defer csvFile.Close()

	var journey Journey

	for {
		line, err := csvReader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatal(err)
		}

		inputNums := [4]string{line[2], line[4], line[6], line[7]}

		// if line data format is ok, add to journey table
		if validateInt(inputNums[:]) && validateTime(line[0]) && validateTime(line[1]) {

			journey.DepTime = line[0]
			journey.RetTime = line[1]
			journey.DepStationName = line[3]
			journey.RetStationName = line[5]

			journey.Distance, err = strconv.Atoi(line[6])
			if err != nil {
				log.Fatal(err)
			}
			journey.Duration, err = strconv.Atoi(line[7])
			if err != nil {
				log.Fatal(err)
			}
			journey.DepStationId, err = strconv.Atoi(line[2])
			if err != nil {
				log.Fatal(err)
			}
			journey.RetStationId, err = strconv.Atoi(line[4])
			if err != nil {
				log.Fatal(err)
			}

			if journey.Distance < 10 || journey.Duration < 10 {
				continue
			}

			// write new csv with valitated data

			row := []string{journey.DepTime, journey.RetTime,
				strconv.Itoa(journey.DepStationId), journey.DepStationName,
				strconv.Itoa(journey.RetStationId), journey.RetStationName,
				strconv.Itoa(journey.Distance), strconv.Itoa(journey.Duration)}

			if err := csvwriter.Write(row); err != nil {
				log.Fatalln("error writing record to file", err)
			}
			defer csvwriter.Flush()
		}
	}
	fmt.Println("journey.csv created and valitaded.")
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
