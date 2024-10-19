const handler = {};
handler.notFoundHandler = (requestedProperties, callback) => {
   callback(404, {
      Message : 'Your requested url was not found'
   })                          
}
module.exports = handler;