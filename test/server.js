import test from 'ava';
import fetch from 'node-fetch';

test.cb('server responds with 404 on invalid base path', t => {
  // Expect 3 tests (important in callback-based tests)
  t.plan(3);

  // Start server
  const server = require('../src/server');

  const fetchArray = [
    fetch('http://localhost:3000/')
      .then(res => t.is(res.status, 404)),
    fetch('http://localhost:3000/bad-url')
      .then(res => t.is(res.status, 404)),
    fetch('http://localhost:3000/s2015')
      .then(res => t.is(res.status, 200))];

  Promise.all(fetchArray)
    .then(() => server.close(t.end));
});
