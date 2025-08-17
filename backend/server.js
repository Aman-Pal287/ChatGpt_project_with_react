require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/db/db");
const initSokcetServer = require("./src/sockets/socket.server")
const httpServer = require("http").createServer(app)

connectToDB();
initSokcetServer(httpServer)



httpServer.listen(3000, () => {
  console.log("server is running on port 3000");
});
