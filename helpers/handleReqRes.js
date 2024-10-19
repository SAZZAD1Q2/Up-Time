const url = require("url");
const { StringDecoder } = require("string_decoder"); // Correct import
const path = require("path");
const route = require('route')
const handler = require('../handlers/routehandler/notFoundHandler')

const handle = {};
handle.handleReqRes = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/[\s,.!?]+/g, "");
  const method = req.method.toLowerCase();
  const queryStringObject = parsedUrl.query;
  const headerObject = req.headers;
  const requestedProperties = {
    parsedUrl,path,trimmedPath,method,queryStringObject,headerObject
  }
  const choosenHandler = route[trimmedPath] ? route[trimmedPath] : handler.notFoundHandler;

  choosenHandler(requestedProperties, (statusCode, payload) => {
    statusCode = typeof(statusCode) === 'number' ? statusCode : 404;
    payload = typeof(payload) === 'object' ? payload : {};
    const payloadString = JSON.stringify(payload);
    res.writeHead(statusCode);
    res.end(payloadString);
  })
  const decoder = new StringDecoder("utf-8");
  let realData = "";
  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });
  req.on("end", () => {
    realData += decoder.end();
    console.log(realData);
    res.end("Hello Saif");
  });
};
module.exports = handle;
