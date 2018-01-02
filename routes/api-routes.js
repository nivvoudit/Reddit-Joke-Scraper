const Archive = require('../models/Archive');
const Comment = require('../models/Comment');

module.exports = function(app) {
    app.post('/api/save', function(req, res) {
        var headlines = req.session.headlines;
        headlines.forEach(function(headline) {
            if (headline.uuid === req.body.uuid) {
                console.log(headline.uuid);
                var entry = new Archive(headline);

                entry.save(function(err, doc) {
                    if (err) console.log(err);
                    else console.log(doc);
                });
            }
        });
        res.end();
    });

    app.post('/api/add_comment', function(req, res) {
        var entry = new Comment(req.body);
        entry.save(function(err, doc) {
            if (err) console.log(err);
            else console.log(doc);
        });
    });

    app.post('/api/show_comment', function(req, res) {
        Comment.find({'uuid': req.body.uuid}, function(error, doc) {
            //console.log(doc);
            if (error) console.log(error);
            else res.send(doc);
        });
    });

    app.post('/api/delete', function(req, res) {
        Comment.findByIdAndRemove({'_id':req.body.id}, function(error, doc) {
            if (error) console.log(error);
            else res.end();
        });
    });
}
