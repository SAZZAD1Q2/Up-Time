const http = require("http");
const handle = require("./helpers/handleReqRes");

const app = {};

app.config = {
  port: 3000,
};

app.createServer = () => {
  const server = http.createServer(handle.handleReqRes);
  server.listen(app.config.port, () => {
    console.log(`The app is running on port ${app.config.port}`);
  });
};

app.createServer();
