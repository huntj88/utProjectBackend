/**
 * Created by James on 11/14/2016.
 */
module.exports =
{

    getByCategory: function(req, res){

        var queryString = "SELECT categoryID,userID,itemID,itemName,itemDescription,categoryName,username,price FROM items JOIN users USING(userID) JOIN categories USING(categoryID) WHERE categoryID = ? order by itemID desc";
        var mysqlPool = require("../../utils/mysqlPool");
        mysqlPool.getConnection(function (err,connection) {
            connection.query(queryString,[req.body.categoryID],function (error,results,fields) {
                if(error)
                {
                    console.log("Error is in get item by category");
                    //throw error;
                    res.send(error);
                }
                else{

                    connection.release();
                    res.send(results);
                }
            });
        });

    },

    getByItemID: function (req,res) {

        var queryString = "select categoryID,userID,itemID,itemName,itemDescription,categoryName,username,price from items join users USING(userID) JOIN categories USING(categoryID) where itemID = ? order by itemID desc";

        var mysqlPool = require("../../utils/mysqlPool");
        mysqlPool.getConnection(function (err,connection) {
            connection.query(queryString,[req.body.itemID],function (error,results,fields) {
                if(error)
                {
                    console.log("Error is in get item by itemID");
                    //throw error;
                    res.send(error);
                }
                else{

                    connection.release();
                    res.send(results);
                }
            });
        });

    },

    getByUserID: function (req,res) {

        var queryString = "select categoryID,userID,itemID,itemName,itemDescription,categoryName,username,price from items join users USING(userID) JOIN categories USING(categoryID) where userID = ? order by itemID desc";

        var mysqlPool = require("../../utils/mysqlPool");
        mysqlPool.getConnection(function (err,connection) {
            connection.query(queryString,[req.body.otherUserID],function (error,results,fields) {
                if(error)
                {
                    console.log("Error is in get item by userID");
                    //throw error;
                    res.send(error);
                }
                else{

                    connection.release();
                    res.send(results);
                }
            });
        });

    },

    getCategories: function (req,res) {

        var queryString = "select * from categories order by categoryID desc";

        var mysqlPool = require("../../utils/mysqlPool");
        mysqlPool.getConnection(function (err,connection) {
            connection.query(queryString,[req.body.itemID],function (error,results,fields) {
                if(error)
                {
                    console.log("Error is in get item by itemID");
                    //throw error;
                    res.send(error);
                }
                else{

                    connection.release();
                    res.send(results);
                }
            });
        });

    },

    getAll: function(req, res){

        var queryString = "SELECT categoryID,userID,itemID,itemName,itemDescription,categoryName,username,price FROM items JOIN users USING(userID) JOIN categories USING(categoryID) order by itemID desc";
        var mysqlPool = require("../../utils/mysqlPool");
        mysqlPool.getConnection(function (err,connection) {
            connection.query(queryString,[],function (error,results,fields) {
                if(error)
                {
                    console.log("Error is in get item by category");
                    //throw error;
                    res.send(error);
                }
                else{

                    connection.release();
                    res.send(results);
                }
            });
        });

    }


};