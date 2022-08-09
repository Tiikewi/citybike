# Citybike

This is the pre-assignment for Solita Dev Academy 2022.

Citybike is app for displaying data of journeys made with city bikes in Helsinki Capital area.

## Installation

To install and run backend, you need to have go compiler installed and **insert .env file** to backend/ directory. Then from root directory, run:

```bash
cd backend/
go install
go run *.go
```

Backend is now running and ready for connections from frontend.

---

To install and run frontend, run from root directory:

```bash
cd frontend/
npm install
npm start
```

Frontend should now be up and running. You can access it from **localhost:3000**

## Technologies

### Go

Backend is build with Go, and it serves as simple API endpoint for fetching journey and station data from backend.

Backend also includes csv file handler for validating journey data, as instructed in .

### Postgres

Postgres in running in cloud using AWS RDS.

Validated journey csv files were imported to the database with pgAdmin.

### React

Frontend is made with React

## TODOS

- Make code more modular.
- Improve api calls on front.
- Implement better error handling, especially on frontend.
- Implement more features
