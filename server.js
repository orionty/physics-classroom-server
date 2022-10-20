const express = require('express')
const app = express()
const cors = require('cors')
const http = require("http");
const { Server } = require("socket.io");


const server = http.createServer(app);

const port = process.env.PORT || 3001


app.use(cors())

// Chat app

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});


app.use(express.json())
app.use(express.urlencoded({ extended: false }));




  server.listen(port, ()=> console.log('server running on port 3001'))





