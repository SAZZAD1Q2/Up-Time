const sampleHandler = require("./handlers/routehandler/sampleHandler");
const notFoundHandler = require("./handlers/routehandler/notFoundHandler");

const route = {
  sample: sampleHandler.sampleHandler,
};

module.exports = route;
