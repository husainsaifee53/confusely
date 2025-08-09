const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mutateMessage = require("./messageMutator");
const assignRole = require("./roleplayManager");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

let userRoles = {};

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    userRoles[socket.id] = assignRole();

    socket.on("send_message", (data) => {
    const mutated = mutateMessage(data.message);
    const role = userRoles[socket.id];
    io.emit("receive_message", {
        message: mutated,
        from: role,
    });
    });

socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    delete userRoles[socket.id];
});
});

server.listen(3001, () => console.log("Backend running on port 3001"));
