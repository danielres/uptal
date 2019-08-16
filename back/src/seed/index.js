import ApolloClient from "apollo-client";
import fetch from "node-fetch";
import gql from "graphql-tag";
import stoppable from "stoppable";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import httpServer from "../index";
import addUsersAndTags from "./001-addUsersAndTags";

const server = stoppable(httpServer);

const baseUrl = process.env.GRAPHQL_BASE_URL;
const port = process.env.GRAPHQL_LISTEN_PORT_SEEDS;
const uri = `${baseUrl}:${port}/graphql`;

const client = new ApolloClient({
  link: new HttpLink({ uri, fetch }),
  cache: new InMemoryCache()
});

server.listen({ port }, async () => {
  console.log(`==== Temporary server listening on port ${port}`);
  console.log(`Running seeds...`);
  await client.mutate({ mutation: gql(addUsersAndTags) });
  console.log("=== Closing temporary server");
  server.stop();
});
