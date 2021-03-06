const express = require('express');
const urlJoin = require('url-join');

const fetchEvents = require('./fetch-events');

const app = express();
const cache = {};

const getMilliseconds = () => (new Date()).getTime(); // Current time of access

// Returns a boolean as to whether the cache is not expired
const isCacheValid = key => {
  const millisecondsInADay = 1000 * 60 * 60 * 24;
  const timeElapsed = getMilliseconds() - cache[key].timeEntered;
  return timeElapsed < millisecondsInADay;
};

// Allow cross-domain requests (security stuff built into browsers that gets in the way)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Happens alongside every request. Browsers 😤
app.get('/favicon.ico', (req, res) => {
  return res.sendStatus(204);
});

function respondWith404(req, res) {
  const error = {
    message: `No season found for "${req.path}". Try "/na-2017" or "/eu-2017" instead.`
  };
  return res.status(404).json(error);
}

app.get('/*', (req, res) => {
  const path = req.path;

  if (path === '/') {
    return respondWith404(req, res);
  }

  const mlhUrl = urlJoin('https://mlh.io/seasons/', path, '/events');
  if (cache[path] && isCacheValid(path)) {
    console.log(`Cache hit for "${mlhUrl}"`);
    return res.json(cache[path].data);
  }
  console.log(`Cache miss for "${mlhUrl}"`);
  if (path !== '/') {
    return fetchEvents(mlhUrl)
      .then(events => {
        cache[path] = {};
        cache[path].data = events;
        cache[path].timeEntered = getMilliseconds();
        return res.json(events);
      })
      .catch(() => respondWith404(req, res));
  }
});

// Clear cache - will reset the array holding cache
app.get('/clear-cache', () => {
  this.cache = {};
});

const port = process.env.PORT || 3000;
// Export the server instance so testing is possible
module.exports = app.listen(port, () => {
  console.log('Listening on port ' + port + '!');
});
