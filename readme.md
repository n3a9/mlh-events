[![Travis](https://img.shields.io/travis/n3a9/mlh-events.svg)]()
[![Code Style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)]()

# mlh-events

> 💻 ☕️ An unofficial http API for [Major League Hacking events](https://mlh.io/seasons/na-2017/events)

As an example, visit [mlh-events-pwihhihsyf.now.sh/na-2017](https://mlh-events-pwihhihsyf.now.sh/na-2017) to see all the North American 2017 hackathons.

## Usage

mlh-events provides a `GET` http endpoint which returns an `array`. You can request any of the following endpoints at `https://mlh-events-pwihhihsyf.now.sh`:

* `/na-2017`
* `/eu-2017`
* `/s2016`
* `/f2015`
* `/s2015`
* `/f2014`
* `/s2014`
* `/f2013`

### Programmatic Example

We've chosen JavaScript here since it's approachable and most folks can reason about it:

```js
// print the full response
fetch('https://mlh-events-pwihhihsyf.now.sh/na-2017')
  .then(res => res.json())
  .then(hackathons => console.log(hackathons));

// [ { name: 'HackMTY',
//    url: 'http://hackmty.com/',
//    date: 'August 27th - 28th',
//    location: 'Monterrey,MX',
//    isHighSchool: false },
//  { name: 'BigRed//Hacks',
//    url: 'https://www.bigredhacks.com/',
//    date: 'September 16th - 18th',
//    location: 'Ithaca,NY',
//    isHighSchool: false },
//    ...
// ]
```

Here's an example counting the amount of high-school hackathons in North America's 2017 season:
```js
// print the full response
fetch('https://mlh-events-pwihhihsyf.now.sh/na-2017')
  .then(res => res.json())
  .then(hackathons => {
    const highSchoolHackathons = hackathons.filter(hackathon => hackathon.isHighSchool);
    console.log(`There were ${highSchoolHackathons.length} hackathons in "na-2017"`);
  });

// There were 12 hackathons in "na-2017"
```

## API Documentation

The API response is an `array` of json `object`'s, where the schema is as follows:

| Key | Value Type             | Example|
|-----|------------------------|------------|
| `name` | `string`            |`'HackCU III'`
| `url` | `string`             |`'https://2017.hackcu.org'`
| `date` | `string`            |`'April 22nd - 23rd'`
| `location` | `string`        |`'Boulder,CO'`
| `isHighSchool` | `boolean`   |`false`

## History & Technical Details

For years, folks have made hacks to hack an API together from the MLH event page. This implementation is different because of several things.

* The API performs caching daily, so the MLH page receives traffic only once per day, even if our endpoint is hit hundreds of times

* The deployment url is static and will be there forever thanks to [nowjs](https://zeit.co/now).

<!--todo add more bullets here-->

## Development

### Install

```sh
$ yarn
```

### Start

```sh
$ npm start
```

## License

MIT © with ❤️ from [Neeraj Aggarwal](http://neerajaggarwal.com/) & [Dawson Botsford](https://dawsbot.com)
