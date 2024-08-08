"use strict";

const request = require("supertest");

const db = require("../db.js");
const app = require("../app");
// const User = require("../models/user");
const pictureURL = 'https://static.vecteezy.com/system/resources/previews/004/204/251/large_2x/men-travelgraphy-on-the-mountain-tourist-on-summer-holiday-vacation-landscape-beautiful-mountain-on-sea-at-samet-nangshe-viewpoint-phang-nga-bay-travel-thailand-travel-adventure-nature-free-photo.jpg';

// const {
//   commonBeforeAll,
//   commonBeforeEach,
//   commonAfterEach,
//   commonAfterAll,
//   testJobIds,
//   u1Token,
//   u2Token,
//   adminToken,
// } = require("./_testCommon");

// beforeAll(commonBeforeAll);
beforeEach(async () => {
    db.query('DELETE FROM users');
    await request(app)
        .post("/users")
        .send({
          username: "user0",
          firstName: "first0",
          lastName: "last0",
          password: "password0",
          email: "user0@email.com"
        });
    }
);
afterEach(() => (db.query('ROLLBACK')));
afterAll(() => (db.end()));

/************************************** POST /users */

describe("POST /users", function () {
  test("creates new user", async function () {
    const resp = await request(app)
        .post("/users")
        .send({
          username: "user1",
          firstName: "first1",
          lastName: "last1",
          password: "password1",
          email: "user1@email.com"
        });
    expect(resp.statusCode).toEqual(200);
    // console.log('------------', resp)
    expect(resp.body).toEqual({ username: "user1" });
  });

  test("bad request if duplicate username", async function () {
    const resp = await request(app)
        .post("/users")
        .send({
          username: "user1",
          firstName: "first1",
          lastName: "last1",
          password: "password1",
          email: "user1@email.com"
        });
    expect(resp.statusCode).toEqual(200);
    const resp2 = await request(app)
        .post("/users")
        .send({
          username: "user1",
          firstName: "first2",
          lastName: "last2",
          password: "password2",
          email: "user1@email.com"
        });    
    // console.log('------------', resp)
    expect(resp2.statusCode).toEqual(400);
    expect(resp2.res.text).toEqual('Username already taken.');
  });

  test("bad request if missing data", async function () {
    const resp = await request(app)
        .post("/users")
        .send({
          username: "user1",
        });
    expect(resp.statusCode).toEqual(500);
  });

});

/************************************** GET /users/:username */

describe("GET /users/:username", function () {
  test("retrieves user data", async function () {
    const resp = await request(app)
        .get("/users/user0");
    expect(resp.body).toEqual({
        firstName: "first0",
        lastName: "last0",
        email: "user0@email.com",
        picture: pictureURL
    });
  });

  test("error 404 for user that does not exist", async function () {
    const resp = await request(app)
        .get("/users/user99")
    expect(resp.statusCode).toEqual(404);
  });

});

/************************************** PATCH /users/ */

describe("PATCH /users/:username", () => {
  test("update user profile", async function () {
    const resp = await request(app)
        .patch(`/users/user0`)
        .send({
            username: "user0",
            firstName: "firstName0",
            lastName: "lastName0",
            email: "username0@email.com",
            picture: pictureURL
        });
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({ username: "user0" });
  });

  test("404 - not found if no such user", async function () {
    const resp = await request(app)
        .patch(`/users/user00`)
        .send({
            username: "user00",
            firstName: "firstName0",
            lastName: "lastName0",
            email: "username0@email.com",
            picture: pictureURL
        });
    expect(resp.statusCode).toEqual(404);
  });
});

/************************************** POST /users/login */

describe("POST /users/login", () => {
    test("can successfully login", async function () {
        const resp = await request(app)
          .post(`/users/login`)
          .send({
              username: "user0",
              password: "password0"
        });
        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toEqual({ username: "user0" });
    });
  
    test("unsuccessfully login for user that does not exist", async function () {
        const resp = await request(app)
          .post(`/users/login`)
          .send({
              username: "user0000",
              password: "password0"
        });
        expect(resp.statusCode).toEqual(400);
        expect(resp.res.text).toEqual("Invalid login credentials.");
    });

    test("unsuccessfully login for user with incorrect password", async function () {
        const resp = await request(app)
          .post(`/users/login`)
          .send({
              username: "user0",
              password: "Password0"
        });
        expect(resp.statusCode).toEqual(400);
        expect(resp.res.text).toEqual("Invalid login credentials.");
    });    
});

/************************************** POST /users/:username/trips */

describe("POST /users/:username/trips", () => {
    test("add trip itinerary to user profile", async function () {
      const resp = await request(app)
          .post(`/users/user0/trips`)
          .send({
              destination: "Mexico",
              duration: "5",
              itinerary: "have fun"
          });
      expect(resp.statusCode).toEqual(200);
      expect(resp.body).toEqual({ username: "user0" });
    });
  });

/************************************** GET /users/:username/trips */

describe("GET /users/:username/trips", () => {
    test("get all trip itineraries for user profile", async function () {
        const resp = await request(app)
          .post(`/users/user0/trips`)
          .send({
              destination: "Mexico",
              duration: "5",
              itinerary: "have fun"
        });
        const resp2 = await request(app)
        .post(`/users/user0/trips`)
        .send({
            destination: "Italy",
            duration: "9",
            itinerary: "eat pizza"
        });
        const result = await request(app).get('/users/user0/trips');
        delete result.body[0].id;
        delete result.body[1].id;
        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual([{
            destination: "Italy",
            duration: 9,
            itinerary: "eat pizza",
            username: "user0"
            }, {
            destination: "Mexico",
            duration: 5,
            itinerary: "have fun",
            username: "user0"
            }
        ]);
    });
});  

/************************************** DELETE /users/trips/:tripID */

describe("DELETE /users/trips/:tripID", () => {
    test("remove trip itinerary from profile", async function () {
        const resp = await request(app)
          .post(`/users/user0/trips`)
          .send({
              destination: "Mexico",
              duration: "5",
              itinerary: "have fun"
        });
        const resp2 = await request(app).get('/users/user0/trips');
        let tripID = resp2.body[0].id;

        const result = await request(app)
            .delete(`/users/trips/${tripID}`)
        expect(result.statusCode).toEqual(200);
        expect(result.res.text).toEqual('deleted');
    });
});