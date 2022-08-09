package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/joho/godotenv/autoload"
	_ "github.com/lib/pq"
)

var (
	host     = os.Getenv("DB_URL")
	port     = 5432
	user     = os.Getenv("DB_USERNAME")
	password = os.Getenv("DB_PASSWORD")
	dbname   = "postgres"
)

func OpenConnection() *sql.DB {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)

	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}

	err = db.Ping()
	if err != nil {
		panic(err)
	}

	return db
}

func getJourneys(p Pagination) *sql.Rows {
	db := OpenConnection()

	sqlStatement := `SELECT * FROM journey WHERE id > $1 ORDER BY id LIMIT $2;`
	rows, err := db.Query(sqlStatement, p.Offset, p.Limit)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	log.Println("GET journeys")

	return rows
}
func getStations(p Pagination) *sql.Rows {
	db := OpenConnection()

	sqlStatement := `SELECT * FROM station WHERE fid > $1 ORDER BY fid LIMIT $2;`
	rows, err := db.Query(sqlStatement, p.Offset, p.Limit)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	log.Println("GET stations")

	return rows
}

func getJourneyAmount() *sql.Row {
	db := OpenConnection()

	row := db.QueryRow("SELECT count(*) AS exact_count FROM journey;")
	defer db.Close()

	log.Println("GET journey amount")

	return row
}
func getDepartureCount(stationId string, typeOf string) *sql.Row {
	db := OpenConnection()

	var row *sql.Row

	if typeOf == "return" {
		row = db.QueryRow(`SELECT count(*) from journey INNER JOIN station ON journey.return_station_id = station.id AND station.id = $1;`, stationId)
	} else {
		row = db.QueryRow(`SELECT count(*) from journey INNER JOIN station ON journey.departure_station_id = station.id AND station.id = $1;`, stationId)
	}

	defer db.Close()

	log.Println("GET dep / ret amount")

	return row
}
