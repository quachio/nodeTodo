var ifaces  = require('os').networkInterfaces();
var colors  = require('colors');

module.exports = function(app) {
  /*
    Listen to port
   */
  for (var dev in ifaces) {
    ifaces[dev].filter((details) =>
    details.family === 'IPv4' && details.internal === false
    ? address = details.address : undefined);
  }

  var server = app.listen(3000, 'localhost');

  server.on('listening', function() {
    var port = server.address().port;
    var ip = server.address().address;
    console.log('Express server started on port %s at %s', port, ip);
  });
};
