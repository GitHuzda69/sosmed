const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000"
    }
});

let users = []

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId})
}

io.on("connection", (socket) => {
    console.log("User connected");
    // take userId and sokcketId from User
    socket.on("addUser", (userId, socketId) =>{
        addUser(userId, socketId);
        io.emit("getUsers", users)
    })
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });

    socket.on("error", (error) => {
        console.error("Socket error:", error);
    });
});
