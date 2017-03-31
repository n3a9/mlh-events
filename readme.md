[![Travis](https://img.shields.io/travis/n3a9/mlh-events.svg)]()
[![Code Style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)]()

# mlh-events

> An unofficial http API for [Major League Hacking](https://mlh.io/) events

## Usage

mlh-events provides a `GET` http endpoint which returns an `array`. You can request any of the following endpoints at `https://mlh-events-pwihhihsyf.now.sh`:

* `/na-2017`
* `/eu-2017`
* `/s2015`
<!--todo add more event example endpoints-->

As an example, visit [https://mlh-events-pwihhihsyf.now.sh/na-2017](https://mlh-events-pwihhihsyf.now.sh/na-2017) to see all the North American 2017 hackathons.

### Programmatic Example

We've chosen JavaScript here since it's approachable and most folks can reason about it:

```js
fetch('https://mlh-events-pwihhihsyf.now.sh/na-2017')
  .then(res => res.json())
  .then(res => console.log(res));

// [ { name: 'HackMTY',
//    url: 'http://hackmty.com/',
//    startDate: '2016-08-27',
//    endDate: '2016-08-28',
//    location: 'Monterrey,MX',
//    isHighSchool: false,
//    imageUrl: 'https://s3.amazonaws.com/assets.mlh.io/events/splashes/000/000/392/thumb/930adc5ed398-hackmtyMLH_300x300.png?1467906271' },
//  { name: 'BigRed//Hacks',
//    url: 'https://www.bigredhacks.com/',
//    startDate: '2016-09-16',
//    endDate: '2016-09-18',
//    location: 'Ithaca,NY',
//    isHighSchool: false,
//    imageUrl: 'https://s3.amazonaws.com/assets.mlh.io/events/splashes/000/000/398/thumb/1367a835fd31-mlh_splash_page.png?1469112017' },
//    ...
// ]
```

## Technical Details

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

## Built with
[yarn](https://yarnpkg.com/en/) & [cheerio.js](https://cheerio.js.org) & [now](https://zeit.co/now)
