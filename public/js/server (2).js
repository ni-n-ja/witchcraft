'use strict'
var express = require('express'),
    bodyParser = require('body-parser'),
    env = process.env,
    recentPosted = null,
    app = express();
var request = require('request');

var face = faceSelect("smile");
var motion = {
    r: [90, 90, 90, 90],
    l: [90, 90, 90, 90]
};

app.use('/', express.static('__dirname'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
var router = express.Router();

router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

router.get('/', function(req, res) {

});

router.route('/api').get(function(req, res) {
    var rot = Math.floor(Math.random() * 60) + 60;

    res.writeHead(200, {
        'content-type': 'application/json'
    });
    res.end(JSON.stringify({
        "face": face,
        "r": motion.r,
        "l": motion.l
    }));
});

router.route('/api/post').post(function(req, res) {
    if (req.result == "succsess") {

        face = faceSelect("ok");
        motion = {
            r: [30, 150, 30, 150],
            l: [150, 30, 150, 30]
        };
    }
    else if (req.result == "fail") {
        face = faceSelect("ng");
        motion = {
            r: [90, 90, 90, 90],
            l: [90, 90, 90, 90]
        };
    }
    res.writeHead(200, {
        'content-type': 'text/plain'
    });
    res.end(JSON.stringify(req.body));
    if (req.body) {

    }
});

router.route('/api/recent').post(function(req, res) {
    recentPosted = req.body;
    res.writeHead(200, {
        'content-type': 'application/json'
    });
    res.end(JSON.stringify(recentPosted));
});

router.route('/api/recent').get(function(req, res) {
    res.writeHead(200, {
        'content-type': 'application/json'
    });
    res.end(JSON.stringify(recentPosted));
});

app.use('/', router);

if (process.env.PORT) {
    app.listen(process.env.PORT || '8080');
}
else {
    app.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost');
}
