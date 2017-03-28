[![Travis](https://img.shields.io/travis/n3a9/mlh-events.svg)]()
[![Code Style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)]()

# MLH-events

An official API for MLH hackathons that returns a JSON file containing the hackathons in the current season.

## Usage

Find the current deployment at [https://mlh-events-pwihhihsyf.now.sh](https://mlh-events-pwihhihsyf.now.sh).

Possible endpoints (not an exhaustive list):

* `/na-2017`
* `/eu-2017`
* `/s2015`

## Install

```sh
$ yarn
```

## Start

```sh
$ npm start
```

## Response

An example response:
```
{
  "name":"HackMTY",
  "url":"http://hackmty.com/",
  "date":"August 27th - 28th",
  "location":"Monterrey,MX",
  "isHighSchool":false
},
```

## Built with
[yarn](https://yarnpkg.com/en/) & [cheerio.js](https://cheerio.js.org) & [now](https://zeit.co/now)
