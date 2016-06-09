var express = require('express');

// Create our app
var app = express();

//this is for heroku
const PORT = process.env.PORT || 3000;

//FOR heroku  redirect all HTTPS to HTTP
app.use(function (req, res, next) {
  if (req.headers['x-forwarded-proto'] === 'https') {
     res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

app.use(express.static('public'));

//THIS IS TO RUN WITH HEROKU
app.listen(PORT, function() {
  console.log('Express server is up on port ' + PORT);
});

//THIS IS TO RUN LOCAL
// app.listen(3000, function() {
//   console.log('Express server is up on port 3000')
// });
