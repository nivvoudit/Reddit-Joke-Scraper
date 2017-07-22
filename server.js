const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
var mongoose = require('mongoose');

const app = express();
const PORT = (process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

mongoose.Promise = Promise;
mongoose.connect('mongodb://heroku_ztjfjzcx:a74vo0na64igv4j0cg5e773orj@ds127391.mlab.com:27391/heroku_ztjfjzcx')
var db = mongoose.connection;

db.on('error', function(error) {
    console.log('Mongoose Error: ' + error);
});
db.once('open', function() {
    console.log('Mongoose connection successful');
});

app.set('trust proxy', 1);
app.use(session({
    secret: 'cat',
    resave: false,
    saveUninitialized: false
}));

require('./routes/html-routes')(app);
require('./routes/api-routes')(app);

app.listen(PORT, function() {
    console.log('Listening to ' + PORT);
});
