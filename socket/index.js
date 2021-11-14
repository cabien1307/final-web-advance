const io = require("socket.io")(8080, {
    cors: {
        origin: "http://localhost:3000",
    },
});

io.on("connection", (socket) => {
    console.log("Socket is connected !", socket.id);

    socket.on("new-notify", () => {
        console.log(socket.id);
        socket.broadcast.emit("broadcast-notify");
    });
});
