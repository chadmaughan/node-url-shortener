var express = require('express'),
    routes = require('./scripts/api.js'),
    http = require('http'),
    path = require('path');

// configure the app
var app = express();
app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.static(path.join(__dirname, 'public')));
});

// add scripts
app.get('/api/urls', routes.list);

// CRUD operations for urls
app.post('/api/urls/:url', routes.post);
app.get('/api/urls/:url', routes.get);
app.delete('/api/urls/:url', routes.delete);

app.get('/:shortened', routes.redirect);

// start the application
http.createServer(app).listen(app.get('port'), function () {
    console.log("Listening on port " + app.get('port'));
});
