const express = require('express');
const urlJoin = require('url-join');

const fetchEvents = require('./fetch-events');

const app = express();

const cache = {};

const getMilliseconds = () => (new Date()).getTime(); // Current time of access
// Returns a boolean as to whether the cache is not expired
const isValid = key => {
  const millisecondsInADay = 1000 * 60 * 60 * 24;
  const timeElapsed = getMilliseconds() - cache[key].timeEntered;
  return timeElapsed < millisecondsInADay;
};

// Enable cross-domain requests (security stuff built into browsers)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Happens alongside every request. Browsers 😤
app.get('/favicon.ico', (req, res) => {
  res.sendStatus(204);
});

app.get('/*', (req, res) => {
  const path = req.path;

  if (path === '/') {
    const error = {};
    error.message = ('No season found for your provided \'' + path + '\'. Please try /na-2017 or /eu-2017 instead');
    res.status(404).json(error);
  }

  const mlhUrl = urlJoin('https://mlh.io/seasons/', path, '/events');
  if (cache[path] && isValid(path)) {
    console.log(`Cache hit "${mlhUrl}"`);
    res.json(cache[path].data);
  } else {
    console.log(`Cache miss for "${mlhUrl}"`);
    if (path !== '/') {
      fetchEvents(mlhUrl)
          .then(events => {
            cache[path] = {};
            cache[path].data = events;
            cache[path].timeEntered = getMilliseconds();
            res.json(events);
          });
    }
  }
});

// Clear cache - will reset the array holding cache
app.get('/clear-cache', () => {
  this.cache = {};
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on port ' + port + '!');
});
