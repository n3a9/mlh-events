const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = url => fetch(url)
  .then(res => {
    if (res.status === 404) {
      return Promise.reject(new Error('404, page not found'));
    }
    return res.text();
  })
  .then(res => {
    const $ = cheerio.load(res);
    const events = [];

    $('.event-wrapper').each(function () {
      events.push({
        name: $(this).find('h3').text(),
        url: $(this).find('a').attr('href'),
        startDate: $(this).find('meta[itemprop = \'startDate\']').attr('content'),
        endDate: $(this).find('meta[itemprop = \'endDate\']').attr('content'),
        location: $(this).find('p').last().text().replace(/\s/g, ''),
        isHighSchool: $(this).find($('.ribbon-wrapper')).length !== 0,
        imageUrl: $(this).find($('.image-wrap')).children('img').attr('src')
      });
    });

    return events;
  });
