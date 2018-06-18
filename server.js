const express = require('express');
require('dotenv').config();
const app = express();
const geocoder = require('geocoder');
const layouts = require('express-ejs-layouts');
const bp = require('body-parser');
const db = require('./models');

app.set('view engine', 'ejs');
app.use(layouts);
app.use(bp.urlencoded({extended: false}));
app.use(express.static(__dirname + '/static'));
var port = process.env.PORT || 2000;

app.get('/', function(req,res) {
    console.log("GET - /");
    db.place.findAll().then(function(places) {
        res.render('index', {places});
    })
})

app.get('/new', function(req,res) {
    console.log('GET - /new');
    res.render('new');
})

app.post('/', function(req,res) {
    db.place.create({
        name: req.body.name,
        address: req.body.address
    }).then( function(data) {
        console.log(data);
        res.redirect('/');
    })
})


app.listen( port, function() {
    console.log('server running on ' + port);
})