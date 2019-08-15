import express from "express";
import http from "http";
import socketIo from "socket.io";
import { ApolloServer } from "apollo-server-express";
import { makeAugmentedSchema } from "neo4j-graphql-js";

import { typeDefs } from "./graphql/schema";
import neo4jDriver from "./helpers/neo4j/driver";

// create graphql schema
const schema = makeAugmentedSchema({ typeDefs });

// setup graphql server & connect with neo4j
const graphQlServer = new ApolloServer({
  context: ({ req }) => ({ driver: neo4jDriver, req }),
  schema,
  introspection: true,
  playground: true
});

// wire up all
const app = express();
const httpServer = http.createServer(app);
const io = socketIo(httpServer);
graphQlServer.applyMiddleware({ app });

// setup socket.io
io.on("connection", socket => {
  console.log("a user connected", socket.id);
  socket.on("chat message", ({ author, text }) => {
    const msg = { author, text, createdAt: new Date().toISOString() };
    io.emit("chat message", msg);
  });
});

// start http server with graphql + socket.io
const port = process.env.GRAPHQL_LISTEN_PORT;
httpServer.listen({ port }, () => {
  console.log(`🚀 Socket.io ready at http://localhost:${port}`);
  console.log(
    `🚀 GraphQl ready at http://localhost:${port}${graphQlServer.graphqlPath}`
  );
});
