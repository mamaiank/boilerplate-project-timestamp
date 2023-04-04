// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function (req, res) {
  const dateParam = req.params.date
  console.log((dateParam))
  let newDate;
  if(dateParam){
    if (/^\d+$/.test(dateParam)) {
      newDate = new Date(parseInt(dateParam));
    } else {
      newDate = new Date(dateParam);
    }
    if (isNaN(newDate.getTime())) {
      return res.json({ error: 'Invalid Date' });
    }
    if (/^\d+$/.test(dateParam)) {
      return res.json({unix: newDate.getTime(), utc: newDate.toUTCString()});
    } else {
      return res.json({unix: newDate.getTime(), utc: newDate.toUTCString()});
    }
  }
   newDate = new Date();
  res.json({unix: newDate.getTime(), utc: newDate.toUTCString()});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
