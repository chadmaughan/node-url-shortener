var sqlite3 = require('sqlite3').verbose(),
    bijective = require('./bijective.js');

// configure the database
var db = new sqlite3.Database('./db/urls.db');

exports.list = function (req, res) {
    db.all("SELECT * FROM urls", function(err, rows) {
        res.send(rows);
    });
};

// CREATE
exports.post = function (req, res) {

    var url = req.params.url;
    console.log("POST: " + url);

    db.serialize(function() {

        var code = req.params.state;

        // see if it exists
        var stmt = db.prepare("SELECT * FROM urls WHERE url = ?");
        stmt.all([url], function(err, rows) {

            // if the url is already in there, return the shortened url
            if(rows.length > 0) {
                res.send(rows[0].shortened);
            }
            else {
                db.run("INSERT INTO urls (url) VALUES (?)", [url]);
                db.get("SELECT * FROM urls WHERE url = ?", [url], function(err, row) {
                    var encoded = bijective.encode(rows[0].id);
                    db.run("UPDATE urls SET shortened = ? WHERE url = ?", [encoded, url]);
                    res.send(encoded);
                });
            }
        });
    });
};

exports.get = function (req, res) {

    var url = req.params.url;
    console.log("GET: " + url);

    db.serialize(function() {

        var code = req.params.state;

        // see if it exists
        var stmt = db.prepare("SELECT * FROM urls WHERE url = ?");
        stmt.all([url], function(err, rows) {

            // return the shortened url
            if(rows.length > 0) {
                res.send(rows[0].shortened);
            }
            else {
                console.log('Requested url does not exist, sending 404: ' + url);
                res.send(404);
            }
        });
    });
};

exports.delete = function (req, res) {
    var url = req.params.url;
    console.log("DELETE: " + url);
};

exports.redirect = function (req, res) {
//    db.serialize(function () {
        var shortened = req.params.shortened;
        var stmt = db.prepare("SELECT url FROM urls WHERE shortened = ?");
        stmt.all([shortened], function(err, rows) {
            if(rows.length > 0) {
                var url = rows[0].url;
                console.log(shortened + ' to ' + url);
                res.redirect(301, url);
            }
            else {
                console.log('Unknown shortened url, sending 404: ' + shortened);
                res.send(404);
            }
        });
//    });
};
