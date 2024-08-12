# Voyager Vibes (Backend)

## DEPLOYED AT
Visit Voyager Vibes at: https://voyagervibes.onrender.com

## GOAL OF APPLICATION
Have you ever found yourself spending countless hours online browsing a multitude of blogs and pinterest posts for the best activities to schedule on your upcoming vacation? Cut that time down to a fraction with your new best travel buddy - Voyager Vibes. The goal of this app is to reduce time spent sifting through countless websites by providing you with the perfect travel itinerary, tailored to your own personal preferences. You input your destination, trip length and your ideal type of activities and Voyager Vibes will give you a perfect itinerary. The app will also let you register your own account and keep track of your favorite itineraries for future use and past itineraries for sharing on social media.

## Users
Target demographic is anyone who likes to travel, locally or abroad.

## USER FLOW
When visiting the site, the user will be brought to the home page where they can either login or create an account. Once logged in, the user can proceed to the explore page where they can input their destination and travel preferences into a form. Upong submission of the form, the Google AI API will return a travel itinerary tailored to the users preferences. The user can then either begin a new search or save that itinerary for future use. On their profile page, the use can update their information, as well as view their saved itineraries. If they no longer need an itinerary, they also have the option to delete it from their history.

## TECH STACK USED
The following tech stack was used for this project: React, Node, Express, PostreSQL, JavaScript, RESTful APIs, HTML, CSS, ReactStrap, Bcrypt, SuperTest, Jest, and the React Testing Library.

## API
This project uses Google's Gemini AI API. It provide access to all of Google's AI capabilities. An authentication key is required.
https://ai.google.dev/

## SETUP
To get this application running, make sure you do the following:
1. Get frontend: https://github.com/NSoucier/VoyagerVibes-Frontend
2. Create database: *createdb voyagervibes*
3. Run: *psql < voyagervibes.sql*
4. Install dependencies: *npm i*
5. Start backend (on port 8080): *npm start*
6. Install frontend dependencies: *npm i*
7. Start frontend (on port 3000): *npm start*
8. To run tests: *npm test*

## Initial Project Proposal
https://docs.google.com/document/d/1pxxa9x_qmstFLQ9SQQjLhCKeGw7GsuxlZbt-BPugXj0/edit?usp=sharing

## NOTES
Please leave a comment for any future features you would like to see implemented.

## Future Features (in the works)
1. Allow user to manually edit itinerary
2. Create link to share itinerary on social media
3. Allow user to follow other users accounts and view their favorite itineraries
4. Include section for user to share their photos associated with past trip itineraries


