/**
 * Created by James on 11/14/2016.
 */
module.exports =
{

    register: function (req, res) {

        var bcrypt = require('bcryptjs');

        bcrypt.hash(req.body.password, 10, function (err, hash) {

            var baseChipQuery = "INSERT INTO users (password, name, email,phone,city,address,username,zip,imageName) VALUES (?,?,?,?,?,?,?,?,?)";
            var mysqlPool = require("../../utils/mysqlPool");
            mysqlPool.getConnection(function (err, connection) {
                connection.query(baseChipQuery, [hash, req.body.name, req.body.email,req.body.phone,req.body.city,req.body.address,req.body.username,req.body.zip,req.body.imageName], function (error, results, fields) {
                    if (error) {
                        console.log("Error is in register");
                        //throw error;
                        res.send(error);
                    }
                    else {

                        connection.release();
                        var jsonStr = [];
                        //var obj = JSON.parse(jsonStr);
                        jsonStr.push({
                            "email": req.body.email,
                            "userID": results.insertId,
                            "apiKey": hash.substring(35)
                        });

                        //jsonStr = JSON.stringify(obj);
                        res.send(jsonStr);
                    }
                });
            });

        });

    },


    login: function (req, res) {

        var bcrypt = require('bcryptjs');

        var baseChipQuery = "select * from users where email = ?";
        var mysqlPool = require("../../utils/mysqlPool");
        mysqlPool.getConnection(function (err, connection) {
            connection.query(baseChipQuery, [req.body.email], function (error, results, fields) {
                if (error) {
                    console.log("Error is in register");
                    //throw error;
                    res.send(error);
                }
                else {
                    connection.release();

                    bcrypt.compare(req.body.password, results[0].password, function (err, hashRes) {
                        if (hashRes == true) {
                            var jsonStr = [];
                            //var obj = JSON.parse(jsonStr);
                            jsonStr.push({
                                "email": results[0].email,
                                "userID": results[0].userID,
                                "apiKey": results[0].password.substring(35),
                                "imageName":results[0].imageName
                            });

                            //jsonStr = JSON.stringify(obj);
                            res.send(jsonStr);
                        } else {
                            res.send("login failed");
                        }
                    });


                }
            });
        });

    },

    getUserData: function (req, res) {

        var baseChipQuery = "select * from users where userID = ?";
        var mysqlPool = require("../../utils/mysqlPool");
        mysqlPool.getConnection(function (err, connection) {
            connection.query(baseChipQuery, [req.body.userID], function (error, results, fields) {
                if (error) {
                    console.log("Error is in register");
                    //throw error;
                    res.send(error);
                }
                else {
                    connection.release();
                    res.send(results);
                }
            });
        });

    },

    uploadImage: function(req, res){

        var path = require('path');
        var formidable = require('formidable');
        var fs = require('fs');
        var uuid = require('node-uuid');

        var imageName = uuid.v4()+".jpg";

        var form = new formidable.IncomingForm();

        // specify that we want to allow the user to upload multiple files in a single request
        form.multiples = true;

        // store all uploads in the /uploads directory

        //form.uploadDir = path.join(__dirname, '/uploads');
        form.uploadDir = '/var/node/utProject/uploads';

        // every time a file has been uploaded successfully,
        // rename it to it's orignal name
        form.on('file', function(field, file) {
            fs.rename(file.path, path.join(form.uploadDir, imageName));
        });

        // log any errors that occur
        form.on('error', function(err) {
            console.log('An error has occured: \n' + err);
        });

        // once all the files have been uploaded, send a response to the client

        // parse the incoming request containing the form data
        form.parse(req, function(err, fields, files) {
            console.log(fields);

            /*var queryString = "INSERT INTO users (imageName) VALUES (?) where userID = ?";
            var mysqlPool = require("../../utils/mysqlPool");
            mysqlPool.getConnection(function (err,connection) {
                connection.query(queryString,[imageName,fields.userID],function (error,results,fields) {
                    if(error)
                    {
                        console.log("Error is in add item");
                        throw error;
                        //res.send(error);
                    }
                    else{

                        connection.release();
                        //res.send("success");
                    }
                });
            });*/
        });

        form.on('end', function() {
            res.send(imageName);
        });

    }
};