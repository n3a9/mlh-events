import test from 'ava';
import urlJoin from 'url-join';
import fetchEvents from '../src/fetch-events';

const buildMLHUrl = season => urlJoin('https://mlh.io/seasons/', season, '/events');

test('fetch-events - f2015 responds with object', async t => {
  const f2015Response = await fetchEvents(buildMLHUrl('f2015'));
  t.notDeepEqual(f2015Response, []);
  t.is(typeof f2015Response, 'object');
});

test('fetch-events - na-2017 contains valid hackathon data', async t => {
  const na2017Response = await fetchEvents(buildMLHUrl('na-2017'));

  const HackMTY = na2017Response[0];
  t.true(HackMTY.startDate === '2016-08-27');
  t.true(HackMTY.endDate === '2016-08-28');
  t.false(HackMTY.isHighSchool);

  t.true(na2017Response[26].isHighSchool); // GlassHacks

  // verify data types of every hackathon in array
  na2017Response.forEach(hackathon => {
    t.is(typeof hackathon.name, 'string');
    t.is(typeof hackathon.url, 'string');
    t.is(typeof hackathon.imageUrl, 'string');
    t.is(typeof hackathon.startDate, 'string');
    t.is(typeof hackathon.endDate, 'string');
    t.is(typeof hackathon.location, 'string');
    t.is(typeof hackathon.isHighSchool, 'boolean');
  });
});
