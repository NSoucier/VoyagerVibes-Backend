CREATE TABLE users (
    username VARCHAR(25) PRIMARY KEY,
    email TEXT NOT NULL
        CHECK (position('@' IN email) > 1),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE myTrips (
    id SERIAL PRIMARY KEY,
    username VARCHAR(25)
        REFERENCES users ON DELETE CASCADE,
    destination TEXT NOT NULL,
    duration INTEGER,
    itinerary TEXT NOT NULL
);