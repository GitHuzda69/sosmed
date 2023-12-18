const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
  console.log(socketId);
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("User connected");

  // add user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  socket.on("uploadPostFollow", ({ userId, desc, img, file }) => {
    // Base64 encode gambar dan file jika belum diencode
    const encodedImg = img instanceof Buffer ? img.toString("base64") : img;
    const encodedFile = file instanceof Buffer ? file.toString("base64") : file;

    // Emit postingan yang telah diencode
    io.emit("getPostFollow", {
      userId,
      desc,
      img: encodedImg,
      file: encodedFile,
    });
  });

  //Endpoint Notification
  socket.on("sendNotification", ({ senderId, receiverId, type }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getNotification", {
      senderId,
      type,
    });
  });

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

// NOTIF TYPE 1 = LIKE
// NOTIF TYPE 2 = COMMENTS
// NOTIF TYPE 3 = FOLLOW
// NOTIF TYPE 4 = POST A POST
