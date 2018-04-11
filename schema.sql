CREATE TABLE flights (
  id serial PRIMARY KEY,
  airline character varying(50) NOT NULL,
  flightNumber character varying(6) NOT NULL, 
  origin character varying(30) NOT NULL,
  destination character varying(30) NOT NULL,
  adultPrice int NOT NULL,
  childPrice int NOT NULL,
  duration int NOT NULL,
  disabilityAccess boolean NOT NULL,
  animalTransfer boolean NOT NULL,
  departure Date NOT NULL,
  arrival Date NOT NULL,
  handLuggagePrice int NOT NULL,
  luggagePrice int NOT NULL,
  availableSeatList  text[]
);

CREATE TABLE bookings (
  bookingNumber serial PRIMARY KEY,
  flightNumber character varying(6) NOT NULL,
  numberAdults int NOT NULL,
  numberChildren int NOT NULL,
  passengers int[] NOT NULL,
  cardHolder character varying(200) NOT NULL,
  cardNumber character varying(19) NOT NULL,
  expirationDate Date NOT NULL,
  csv character varying(3) NOT NULL
);

CREATE TABLE passengers (
  id serial PRIMARY KEY,
  firstName character varying(100) NOT NULL,
  lastName character varying(100) NOT NULL,
  email character varying(100),
  birthDate Date NOT NULL,
  nationality character varying(100) NOT NULL,
  numberHandLuggage int NOT NULL,
  numberLuggage int NOT NULL,
  seatNumber character varying(3) NOT NULL
);

CREATE TABLE reviews (
  id serial PRIMARY KEY,
  airline character varying(50) NOT NULL,
  description text,
  date Date NOT NULL
);

CREATE TABLE destinations (
  iata character varying(3) PRIMARY KEY,
  name character varying(50) NOT NULL
);
