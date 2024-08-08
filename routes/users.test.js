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

  test("Error 404 for user that does not exist", async function () {
    const resp = await request(app)
        .get("/users/user99")
    expect(resp.statusCode).toEqual(404);
  });

});

/************************************** PATCH /users/ */

describe("PATCH /users/:username", () => {
  test("works for admins", async function () {
    const resp = await request(app)
        .patch(`/users/u1`)
        .send({
          firstName: "New",
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.body).toEqual({
      user: {
        username: "u1",
        firstName: "New",
        lastName: "U1L",
        email: "user1@user.com",
        isAdmin: false,
      },
    });
  });

//   test("works for same user", async function () {
//     const resp = await request(app)
//         .patch(`/users/u1`)
//         .send({
//           firstName: "New",
//         })
//         .set("authorization", `Bearer ${u1Token}`);
//     expect(resp.body).toEqual({
//       user: {
//         username: "u1",
//         firstName: "New",
//         lastName: "U1L",
//         email: "user1@user.com",
//         isAdmin: false,
//       },
//     });
//   });

//   test("unauth if not same user", async function () {
//     const resp = await request(app)
//         .patch(`/users/u1`)
//         .send({
//           firstName: "New",
//         })
//         .set("authorization", `Bearer ${u2Token}`);
//     expect(resp.statusCode).toEqual(401);
//   });

//   test("unauth for anon", async function () {
//     const resp = await request(app)
//         .patch(`/users/u1`)
//         .send({
//           firstName: "New",
//         });
//     expect(resp.statusCode).toEqual(401);
//   });

//   test("not found if no such user", async function () {
//     const resp = await request(app)
//         .patch(`/users/nope`)
//         .send({
//           firstName: "Nope",
//         })
//         .set("authorization", `Bearer ${adminToken}`);
//     expect(resp.statusCode).toEqual(404);
//   });

//   test("bad request if invalid data", async function () {
//     const resp = await request(app)
//         .patch(`/users/u1`)
//         .send({
//           firstName: 42,
//         })
//         .set("authorization", `Bearer ${adminToken}`);
//     expect(resp.statusCode).toEqual(400);
//   });

//   test("works: can set new password", async function () {
//     const resp = await request(app)
//         .patch(`/users/u1`)
//         .send({
//           password: "new-password",
//         })
//         .set("authorization", `Bearer ${adminToken}`);
//     expect(resp.body).toEqual({
//       user: {
//         username: "u1",
//         firstName: "U1F",
//         lastName: "U1L",
//         email: "user1@user.com",
//         isAdmin: false,
//       },
//     });
//     const isSuccessful = await User.authenticate("u1", "new-password");
//     expect(isSuccessful).toBeTruthy();
//   });
});

// /************************************** DELETE /users/:username */

// describe("DELETE /users/:username", function () {
//   test("works for admin", async function () {
//     const resp = await request(app)
//         .delete(`/users/u1`)
//         .set("authorization", `Bearer ${adminToken}`);
//     expect(resp.body).toEqual({ deleted: "u1" });
//   });

//   test("works for same user", async function () {
//     const resp = await request(app)
//         .delete(`/users/u1`)
//         .set("authorization", `Bearer ${u1Token}`);
//     expect(resp.body).toEqual({ deleted: "u1" });
//   });

//   test("unauth if not same user", async function () {
//     const resp = await request(app)
//         .delete(`/users/u1`)
//         .set("authorization", `Bearer ${u2Token}`);
//     expect(resp.statusCode).toEqual(401);
//   });

//   test("unauth for anon", async function () {
//     const resp = await request(app)
//         .delete(`/users/u1`);
//     expect(resp.statusCode).toEqual(401);
//   });

//   test("not found if user missing", async function () {
//     const resp = await request(app)
//         .delete(`/users/nope`)
//         .set("authorization", `Bearer ${adminToken}`);
//     expect(resp.statusCode).toEqual(404);
//   });
// });

// /************************************** POST /users/:username/jobs/:id */

// describe("POST /users/:username/jobs/:id", function () {
//   test("works for admin", async function () {
//     const resp = await request(app)
//         .post(`/users/u1/jobs/${testJobIds[1]}`)
//         .set("authorization", `Bearer ${adminToken}`);
//     expect(resp.body).toEqual({ applied: testJobIds[1] });
//   });

//   test("works for same user", async function () {
//     const resp = await request(app)
//         .post(`/users/u1/jobs/${testJobIds[1]}`)
//         .set("authorization", `Bearer ${u1Token}`);
//     expect(resp.body).toEqual({ applied: testJobIds[1] });
//   });

//   test("unauth for others", async function () {
//     const resp = await request(app)
//         .post(`/users/u1/jobs/${testJobIds[1]}`)
//         .set("authorization", `Bearer ${u2Token}`);
//     expect(resp.statusCode).toEqual(401);
//   });

//   test("unauth for anon", async function () {
//     const resp = await request(app)
//         .post(`/users/u1/jobs/${testJobIds[1]}`);
//     expect(resp.statusCode).toEqual(401);
//   });

//   test("not found for no such username", async function () {
//     const resp = await request(app)
//         .post(`/users/nope/jobs/${testJobIds[1]}`)
//         .set("authorization", `Bearer ${adminToken}`);
//     expect(resp.statusCode).toEqual(404);
//   });

//   test("not found for no such job", async function () {
//     const resp = await request(app)
//         .post(`/users/u1/jobs/0`)
//         .set("authorization", `Bearer ${adminToken}`);
//     expect(resp.statusCode).toEqual(404);
//   });

//   test("bad request invalid job id", async function () {
//     const resp = await request(app)
//         .post(`/users/u1/jobs/0`)
//         .set("authorization", `Bearer ${adminToken}`);
//     expect(resp.statusCode).toEqual(404);
//   });
// });