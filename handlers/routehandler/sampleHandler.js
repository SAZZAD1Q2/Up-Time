const handler = {};
handler.sampleHandler = (requestedProperties, callback) => {
  console.log(requestedProperties);
  callback(200, {
    message: "This is a sample URL",
  });
};
module.exports = handler;
