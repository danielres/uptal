const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const { ApolloServer } = require("apollo-server-express");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const graphQlServer = new ApolloServer({ typeDefs, resolvers });
graphQlServer.applyMiddleware({ app });

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

io.on("connection", socket => {
  console.log("a user connected", socket.id);
  socket.on("chat message", ({ author, text }) => {
    const msg = { author, text, createdAt: new Date().toISOString() };
    io.emit("chat message", msg);
  });
});

http.listen(3000, () => {
  console.log("🚀 listening on port http://localhost:3000");
  console.log(
    `🚀 GraphQl server ready at http://localhost:3000${
      graphQlServer.graphqlPath
    }`
  );
});
