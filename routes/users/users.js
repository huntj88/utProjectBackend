var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/register', function (req, res, next) {
    var request = require('./userFunctions');
    console.log(req.body);
    request.register(req, res);
});

router.post('/login', function (req, res, next) {
    var request = require('./userFunctions');
    request.login(req, res);
});

module.exports = router;
