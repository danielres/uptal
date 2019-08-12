import ApolloClient from "apollo-client";
import fetch from "node-fetch";
import gql from "graphql-tag";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import addUsersAndTags from "./001-addUsersAndTags";

const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.GRAPHQL_URI, fetch }),
  cache: new InMemoryCache()
});

const run = async () => {
  await client.mutate({ mutation: gql(addUsersAndTags) }).then(console.log);
};

try {
  run();
} catch (error) {
  console.error(error);
}
