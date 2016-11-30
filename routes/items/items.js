/**
 * Created by James on 11/14/2016.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/add', function (req, res, next) {
    var request = require('./itemAddFunctions');
    request.add(req,res);
});

router.post('/getByCategory', function (req, res, next) {
    var request = require('./itemGetFunctions');
    request.getByCategory(req,res);
});

router.post('/getByItemID', function (req, res, next) {
    var request = require('./itemGetFunctions');
    request.getByItemID(req,res);
});

router.post('/getByUserID', function (req, res, next) {
    var request = require('./itemGetFunctions');
    request.getByUserID(req,res);
});

router.post('/getAll', function (req, res, next) {
    var request = require('./itemGetFunctions');
    request.getAll(req,res);
});

router.post('/getCategories', function (req, res, next) {
    var request = require('./itemGetFunctions');
    request.getCategories(req,res);
});

router.post('/uploadImage', function (req, res, next) {
    console.log(req);
    res.send("uploaded");
});


module.exports = router;
