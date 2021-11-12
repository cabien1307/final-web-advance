const io = require("socket.io")(5000, {
    cors: {
        origin: "http://localhost:8080",
    },
});

io.on('connection', (socket) => {
    console.log('Socket is connected !', socket.id);

    socket.on("new-notify", () => {
        console.log(socket.id);
        socket.broadcast.emit('broadcast-notify')
    })
})
