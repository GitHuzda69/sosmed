const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on("connection", (socket) => {
    console.log("User connected");
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });

    socket.on("error", (error) => {
        console.error("Socket error:", error);
    });
});
