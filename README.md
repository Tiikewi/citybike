# Citybike

This is the pre-assignment for Solita Dev Academy 2022.

Citybike is app for displaying data of journeys made with city bikes in Helsinki Capital area.

## Installation

To install and run frontend, run from this app's root directory:

```bash
cd frontend/
npm install
npm start
```

Frontend should now be up and running. You can access it from **localhost:3000**
Backend of this app is running in cloud.

## Technologies

### Go

Backend is build with Go, and it serves as simple API endpoint for fetching journey and station data from backend.
Backend also includes csv file handler for validating journey data, as instructed in exercise insturctions.
This Go backend is running in cloud using AWS EC2.

### Postgres

Postgres in running in cloud using AWS RDS.

Validated journey csv files were imported to the database with pgAdmin.

### React

Frontend is made with React

## TODOS

- Make code more modular. Including the moving of frontend api calls to own service.
- Improve api calls on front.
- Implement better error handling, especially on frontend.
- Implement more features
