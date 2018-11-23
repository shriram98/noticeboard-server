const express = require('express'),
    app = express(),
    passport = require('passport'),
    auth = require('./auth'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session')
    path = require('path');


//SQL connection
// connecct with database
var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'lab',
  password : 'lab',
  database : 'events'
});
connection.connect();


auth(passport);
app.use(passport.initialize());

app.use(cookieSession({
    name: 'session',
    keys: ['SECRECT KEY'],
    maxAge: 24 * 60 * 60 * 1000
}));
app.use(cookieParser());

app.get('/', (req, res) => {
    if (req.session.token) {
        res.cookie('token', req.session.token);
        res.json({
            status: 'session cookie set'
        });
    } else {
        res.cookie('token', '')
        res.json({
            status: 'session cookie not set'
        });
    }
});

app.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/');
});

app.get('/auth/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/'
    }),
    (req, res) => {
        console.log(req.user.token);
        req.session.token = req.user.token;
        res.redirect('/');
    }
);

// define queries to use
var queries = {
    getEvent: 'SELECT * FROM event WHERE evt_name = ?',
    getEventDetails: 'SELECT * FROM event_details WHERE details_id = ?',
    addEvent: 'INSERT INTO event VALUES(?, ?, ?, ?)',
    addEventDetails: 'INSERT INTO event_details VALUES(?, ?, ?, ?, ?)',
    getCategory: 'SELECT cat_id FROM category WHERE cat_name = ?',
    getElementOfCategory: 'SELECT * FROM event WHERE evt_cat_id = ?',
}

// To get Event Details based on category
app.get('/getevent', function(req,res) {
    res.send('Hello World');
});

app.get('/category/:catName', function(req, res) {
    var cat_id;
    connection.query(queries.getCategory, req.params.catName, function(err, rows, fields) {
        if(err) throw err;
        connection.query(queries.getElementOfCategory, rows[0].cat_id, function(err, rows, fields) {
            if(err) throw err;
            console.log(rows);
            res.send(rows)
        })
    });
})


app.listen(8080, () => {
    console.log('Server is running on port 8080');
});