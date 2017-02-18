var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var Db = require('mongodb').Db;
var router = express.Router();

var app = express();
app.set ('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/'));
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

var categoriesJson;
var filmsJson;

app.get('/', function(req,res){
    MongoClient.connect('mongodb://localhost:8080/testdb', function (err, db) {
        if (err) throw err

        db.collection('films').group(['Category'],{}, {"count":0}, "function (obj, prev) { prev.count++; }", function(err, results) {
              categoriesJson = results;
              console.log(categoriesJson);
        });

        db.collection('films').find({},{fields: {Category:1,Title:1,Description:1,Rating:1,Length:1}}).toArray(function(err,filmResults) {
              filmsJson = filmResults;
              console.log(filmResults);
        });
        res.render('index', { "categories" : categoriesJson, "films" : filmsJson });
    })
});

app.get('/:category', function(req,res){
    MongoClient.connect('mongodb://localhost:8080/testdb', function (err, db) {
        if (err) throw err

        db.collection('films').find({Category:req.params.category},{fields: {Category:1,Title:1,Description:1,Rating:1,Length:1}}).toArray(function(err,filmSearch) {
            if (err) throw err;
            filmsJson = filmSearch;
            //console.log(filmsJson);
            res.render('index', { "categories" : categoriesJson, "films" : filmsJson });
        });
    });
});

app.use(function(req,res){
    res.set ('Content-type','text/html');
    res.status(404);
    res.send('<html><body><h1>404 - We cannot find the page you are looking for!</h1></body></html>');
})

app.use(function(req,res){
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Oops, something went terribly wrong!');
})

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; Press Ctrl-C to terminate.');
});
