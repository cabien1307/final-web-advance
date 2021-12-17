// Package
// Config env
require("dotenv").config();

const express = require("express");
// const logged = require("morgan");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// new line

// Module
const route = require("./routes");
const db = require("./config/database");

const app = express();

// cors
const corsOptions = {
    exposedHeaders: "Authorization",
};

app.use(cors(corsOptions));

// Socket.io
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on("connection", (socket) => {
    console.log("Socket is connected !", socket.id);

    socket.on("new-notify", () => {
        socket.broadcast.emit("broadcast-notify");
    });

    // Disconnect
    socket.on("disconnect", () => {
        console.log(socket.id, "is disconnected !!!");
    });
});

app.disable("etag");


// Cookies
app.use(cookieParser());

/*assuming an express app is declared here*/
app.use(express.json());

// Connect DB
db.connect();

// Middlewares
// app.use(logged("dev"));

// Path upload img
app.use("/images", express.static(path.resolve(__dirname, "public/images")));

// Path attachment
app.use("/files", express.static(path.join(__dirname, "public/files")));

// Route init
route(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

// Start server
const port = process.env.PORT || 5000;
http.listen(port, () => {
    console.log(`Server is running on port ${port} !`);
});
