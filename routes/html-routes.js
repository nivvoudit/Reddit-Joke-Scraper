const cheerio = require('cheerio');
const request = require('request');
const _ = require('lodash');
const uuid = require('uuid');
const Archive = require('../models/Archive');
const Comment = require('../models/Comment');

module.exports = function(app) {
    app.get('/', function(req, res) {
        request('https://www.reddit.com/r/oneliners/', function(error, response, html) {
            var $ = cheerio.load(html);
            var articles = [];
            var authors = [];

            $('p.tagline').each(function(i, element) {
                authors.push({
                    author: $(element).children('a').text(),
                    time: $(element).children('time').text(),
                });
            });


            $('a.title').each(function(i, element) {
                var title = $(element).text();
                var link  = $(element).attr("href");

                articles.push({
                    uuid: uuid.v4(),
                    title: title,
                    link: link
                });
            });

            var headlines = _.merge(articles, authors);
            req.session.headlines = headlines.splice(0, 2);
            // This line removes the first 2 elements which were not of the same joke format//
            res.render('index', {headlines});
        });
    });

    app.get('/archive', function(req, res) {
        Archive.find({}, function(error, doc) {
            if (error) console.log(error);
            else res.render('archive', {doc});
        });
    });
}
