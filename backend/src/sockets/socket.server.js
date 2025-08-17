const { Server } = require("socket.io")


function initSokcetServer(httpServer) {
    const io = new Server(httpServer, {})

    io.on("connection", (socket) => {
        console.log("New socket connection: ", socket.id);
    })
}

module.exports = initSokcetServer