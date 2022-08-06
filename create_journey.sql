CREATE TABLE journey (departure_time timestamp, return_time timestamp, departure_station_id int, departure_station_name varchar(60), return_station_id int, return_station_name varchar(60), distance int, duration int);

INSERT INTO journey VALUES ('01-01-2020T00:00:00', '01-01-2020T01:01:01', '1', 'lahto', '2', 'paluu', '100', '200');