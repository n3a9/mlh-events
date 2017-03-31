const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = url => fetch(url)
  .then(res => res.text())
  .then(res => {
    const $ = cheerio.load(res);

    const events = [];

    $('.event-wrapper').each(function () {
      const event = {};

      event.name = $(this).find('h3').text();
      event.url = $(this).find('a').attr('href');
      event.startDate = $(this).find('meta[itemprop = \'startDate\']').attr('content');
      event.endDate = $(this).find('meta[itemprop = \'endDate\']').attr('content');
      event.location = $(this).find('p').last().text().replace(/\s/g, '');
      event.isHighSchool = $(this).find($('.ribbon-wrapper')).length !== 0;
      event.imageUrl = $(this).find($('.image-wrap')).children('img').attr('src');

      events.push(event);
    });

    return events;
  });
