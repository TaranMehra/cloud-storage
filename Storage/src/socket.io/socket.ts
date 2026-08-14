import { io } from "../server.js";

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});
