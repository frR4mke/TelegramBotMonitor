// var express = require('express');
// var packageInfo = require('./package.json');
// var bodyParser = require('body-parser');

// var app = express();
// app.use(bodyParser.json());

// app.get('/', function (req, res) {
//   res.json({ version: packageInfo.version });
// });

// var server = app.listen(process.env.PORT, function () {
//   var host = server.address().address;
//   var port = server.address().port;

//   console.log('Web server started at http://%s:%s', host, port);
// });

// module.exports = function (bot) {
//   app.post('/' + bot.token, function (req, res) {
//     bot.processUpdate(req.body);
//     res.sendStatus(200);
//   });
// };

require('https').createServer().listen(process.env.PORT || 5000).on('request', function(req, res){
    res.end('')
  });