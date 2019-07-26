const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

io.on("connection", socket => {
  socket.on("chat message", ({ author, text }) => {
    const msg = { author, text, createdAt: new Date().toISOString() };
    io.emit("chat message", msg);
  });
  console.log("a user connected");
});

http.listen(3000, () => console.log("listening on port http://localhost:3000"));
