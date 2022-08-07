CREATE TABLE journey (id SERIAL primary key, departure_time timestamp, return_time timestamp, departure_station_id int, departure_station_name varchar(60), return_station_id int, return_station_name varchar(60), distance int, duration int);

INSERT INTO journey VALUES ('01-01-2020T00:00:00', '01-01-2020T01:01:01', '1', 'lahto', '2', 'paluu', '100', '200');

CREATE TABLE station 
(fid int primary key, id int, station_name varchar(60),
station_name_swedish varchar(60), address varchar(60),
address_swedish varchar(60), city_name varchar(60),
city_name_swedish varchar(60), operator varchar(60),
capacity int, x_coord float, y_coord float);