/**
 * Created by James on 11/14/2016.
 */
module.exports =
{

    register: function (req, res) {

        var bcrypt = require('bcryptjs');

        bcrypt.hash(req.body.password, 10, function (err, hash) {

            var baseChipQuery = "INSERT INTO users (password, name, email,phone,city,address,apt,zip) VALUES (?,?,?,?,?,?,?,?)";
            var mysqlPool = require("../../utils/mysqlPool");
            mysqlPool.getConnection(function (err, connection) {
                connection.query(baseChipQuery, [hash, req.body.name, req.body.email,req.body.phone,req.body.city,req.body.address,req.body.apt,req.body.zip], function (error, results, fields) {
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
                                "apiKey": results[0].password.substring(35)
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

    }
};