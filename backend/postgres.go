package main

import (
	"database/sql"
	"fmt"
	"log"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "postgres"
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
