CREATE TABLE users (
    username VARCHAR(25) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    password TEXT NOT NULL,
    picture TEXT NOT NULL DEFAULT 'https://static.vecteezy.com/system/resources/previews/004/204/251/large_2x/men-travelgraphy-on-the-mountain-tourist-on-summer-holiday-vacation-landscape-beautiful-mountain-on-sea-at-samet-nangshe-viewpoint-phang-nga-bay-travel-thailand-travel-adventure-nature-free-photo.jpg'
);

CREATE TABLE mytrips (
    id SERIAL PRIMARY KEY,
    username VARCHAR(25)
        REFERENCES users ON DELETE CASCADE,
    destination TEXT NOT NULL,
    duration INTEGER,
    itinerary TEXT NOT NULL
);