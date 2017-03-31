import test from 'ava';
import urlJoin from 'url-join';
import fetchEvents from './fetch-events';

const buildMLHUrl = season => urlJoin('https://mlh.io/seasons/', season, '/events');

test('f2015', async t => {
  const f2015Response = await fetchEvents(buildMLHUrl('f2015'));
  t.notDeepEqual(f2015Response, []);
  t.is(typeof f2015Response, 'object');
});

test('na-2017', async t => {
  const na2017Response = await fetchEvents(buildMLHUrl('na-2017'));
  t.false(na2017Response[0].isHighSchool); // HackMTY
  t.true(na2017Response[26].isHighSchool); // GlassHacks
  // HackMTY Dates
  t.true(na2017Response[0].startDate === '2016-08-27');
  t.true(na2017Response[0].endDate === '2016-08-28');
});
