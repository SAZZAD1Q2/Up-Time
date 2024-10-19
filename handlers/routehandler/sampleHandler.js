const handler = {};

handler.sampleHandler =(requestedProperties, callback) => {
    console.log(requestedProperties)
   callback(500, {
    message: 'This is a sample Url'
   })
};
module.exports = handler;