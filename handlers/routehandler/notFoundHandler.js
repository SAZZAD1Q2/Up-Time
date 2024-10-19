const handler = {};
handler.notFoundHandler = (requestedProperties, callback) => {
  callback(404, {
    Message: "Your requested URL was not found vi",
  });
};
module.exports = handler;
