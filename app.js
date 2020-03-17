var config = require("./config.json");
var jwt = require('jsonwebtoken');
var bodyparser = require('body-parser');
var express = require("express");
var app = express();
var port = config.port;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: false
}));

app.post('/api/users/sts', function(req, res) {
        var identity = req.body.identity;
        var clientId = config.credentials.appId//req.body.clientId;
        var clientSecret = config.credentials.apikey//req.body.clientSecret;
        var isAnonymous = req.body.isAnonymous || false;
        var aud = req.body.aud || "https://idproxy.kore.com/authorize";
        var fName = req.body.fName;
        var lName = req.body.lName;
        var options = {
            "iat": new Date().getTime(),
            "exp": new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getTime(),
            "aud": aud,
            "iss": clientId,
            "sub": identity,
            "isAnonymous": isAnonymous
        }
        var headers = {};
        if(fName || lName) {
        headers.header = {
        "fName" : fName,
        "lName" : lName
        }
        }
        var token = jwt.sign(options, clientSecret, headers);
        res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Referrer-Policy","origin-when-cross-origin, strict-origin-when-cross-origin");
	res.header("Content-Security-Policy","default-src 'none'");
        res.send({"jwt":token});
        });

console.log("JWT service request received" + port);
app.listen(port);
