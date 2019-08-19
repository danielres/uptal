import request from "supertest";

import server from "../../src/index";
import purgeDb from "../../src/helpers/neo4j/purgeDb";

beforeEach(purgeDb);
afterEach(purgeDb);

const ADD_USER = /* GraphQL */ `
  mutation {
    CreateUser(name: "Bob") {
      id
    }
  }
`;

const GET_USERS = /* GraphQL */ `
  {
    User {
      name
      id
    }
  }
`;

test("Creating a user + getting users", async () => {
  await request(server)
    .post("/graphql")
    .send({ query: ADD_USER });

  const resp = await request(server)
    .post("/graphql")
    .send({ query: GET_USERS });

  expect(JSON.parse(resp.text).data.User.length).toEqual(1);
  expect(JSON.parse(resp.text).data.User[0].name).toEqual("Bob");
});
