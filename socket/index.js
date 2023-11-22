const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000"
    }
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find(user=>user.userId === userId)
}

io.on("connection", (socket) => {
  console.log("User connected");

  // add user
  socket.on("addUser", (userId, socketId) => {
    addUser(userId, socketId);
    io.emit("getUsers", users);
  });

  // send and get message
  socket.on("sendMessage", ({senderId, receiverId, text}) => {
    const user = getUser(senderId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    })
  })

  // when disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });

  // when error
  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});
