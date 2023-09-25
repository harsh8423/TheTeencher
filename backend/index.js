const express = require("express");
const mongooseConnection = require("./models/mongooseConnection");
const app = express();
const cors = require("cors");

const io = require("socket.io")(8080, {
  cors: {
    origin: "http://localhost:3000", // Allow connections from this origin
  },
});

// Array to store online users
let onlineUsers = [];

// Socket.IO connection event
io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  // Event to add a new user to the onlineUsers array
  socket.on("addNewUser", (userID) => {
    const isUserExist = onlineUsers.find((user) => user.userID === userID);
    if (!isUserExist) {
      onlineUsers.push({
        userID,
        socketId: socket.id,
      });
    }
    // Emit the updated list of online users to all connected clients
    io.emit("getOnlineUsers", onlineUsers);
    console.log("onlineUsers", onlineUsers);
  });

  // Event to send a message
  socket.on("sendMessage", async ({ senderID, message }) => {
    console.log("received request to send the message");
    const sender = await onlineUsers.find((user) => user.userID == senderID);

    io.to(sender.socketId).emit("getMessage", {
      senderID,
      message,
      dateStamp: Date.now(),
    });
  });
  // Event for user disconnect
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    console.log("onlineUsers", onlineUsers);

    // Emit the updated list of online users to all connected clients
    io.emit("getOnlineUsers", onlineUsers);
  });
});

app.use(
  cors({
    origin: "http://localhost:3000", // Only allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Only allow specified HTTP methods
  })
);

// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
// })

app.use(express.json());

app.use("/api", require("./routes/student/CreateUser"));
app.use("/api", require("./routes/student/PracticeTest"));
app.use("/api", require("./routes/student/Test"));
app.use("/api", require("./routes/student/SaveResult"));
app.use("/api", require("./routes/student/TestMarks"));
app.use("/api", require("./routes/student/myTask"));
app.use("/api", require("./routes/student/ActivateTest"));
app.use("/api", require("./routes/student/SendMessage"));
app.use("/api", require("./routes/student/CreateTeacher"));
app.use("/api", require("./routes/student/chatRoom"));
app.use("/api", require("./routes/student/Transaction"));

app.get("/", async (req, res) => {
  res.send("harsh");
});

app.listen(5000, () => {
  console.log(" listening to the port at 5000");
});
