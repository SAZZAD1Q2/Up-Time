const url = require("url");
const { StringDecoder } = require("string_decoder");
const path = require("path");
const route = require("../route");
const handler = require("../handlers/routehandler/notFoundHandler");

const handle = {};
handle.handleReqRes = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, ""); // More common URL trimming
  const method = req.method.toLowerCase();
  const queryStringObject = parsedUrl.query;
  const headerObject = req.headers;

  const requestedProperties = {
    parsedUrl,
    path,
    trimmedPath,
    method,
    queryStringObject,
    headerObject,
  };

  const choosenHandler = route[trimmedPath]
    ? route[trimmedPath]
    : handler.notFoundHandler;

  const decoder = new StringDecoder("utf-8");
  let realData = "";

  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });

  req.on("end", () => {
    realData += decoder.end();
    requestedProperties.body = realData; // Attach the parsed body to request properties

    // Pass the request properties and a callback to handle the response
    choosenHandler(requestedProperties, (statusCode, payload) => {
      statusCode = typeof statusCode === "number" ? statusCode : 404;
      payload = typeof payload === "object" ? payload : {};
      const payloadString = JSON.stringify(payload);
      res.writeHead(statusCode, { "Content-Type": "application/json" });
      res.end(payloadString);
    });

    // Optionally log the received data
    console.log("Received Data:", realData);
  });
};

module.exports = handle;
