'use strict'
var express = require('express'),
    bodyParser = require('body-parser'),
    env = process.env,
    recentPosted = null,
    app = express();
var server = require('http').Server(app);
var io = require("socket.io")(server);

app.use(express.static(__dirname + '/public' + '/'));
app.use(express.static(__dirname + '/public' + '/js'));
app.use(express.static(__dirname + '/public' + '/html'));
app.use(express.static(__dirname + '/public' + '/css'));
app.use(express.static(__dirname + '/public' + '/img'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
var router = express.Router();

router.use(function(req, res, next) {
    console.log('Something is happening.');
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
app.listen('3000', 'localhost');
console.log("ok");

io.on('connection', function(socket) { // Incoming connections from clients
    // Greet the newcomer
    socket.emit('hello', {
        greeting: 'Hi socket ' + socket.id + ' this is Server speaking! Let\'s play ping-pong. You pass!'
    });

    socket.on('ping', function(data) { // ping-event from the client to be respond with pong
        console.log("received ping from client: ", data);
        socket.emit('pong', {
            id: data.id
        });
    });
});
