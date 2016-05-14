'use strict'
var express = require('express'),
    bodyParser = require('body-parser'),
    env = process.env,
    recentPosted = null,
    app = express();
var router = express.Router();
var config = require(__dirname + '/public/js/config');

app.use(express.static(__dirname + '/public' + '/'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

router.use(function(req, res, next) {
    next();
});

router.route('/api').get(function(req, res) {
    res.writeHead(200, {
        'content-type': 'application/json'
    });
    res.end(JSON.stringify({
        "message": "hello!!!sss"
    }));
});

app.use('/', router);
app.get('/api/config', function(req, res) {
    res.send('var config = ' + JSON.stringify(config));
});

var server = app.listen('3000', 'localhost');
var io = require("socket.io")(server, {
    path: '/ws'
});
io.on('connection', function(socket) {
    socket.emit('hello', {
        greeting: 'Hi socket ' + socket.id + ' this is Server speaking! Let\'s play ping-pong. You pass!'
    });
    socket.on('ping', function(data) {
        console.log("received ping from client: ", data);
        socket.emit('pong', {
            id: data.id
        });
    });
});
console.log("ok");
