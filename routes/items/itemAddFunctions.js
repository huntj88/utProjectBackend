/**
 * Created by James on 11/14/2016.
 */
module.exports =
{

    add: function(req, res){

        var queryString = "INSERT INTO items (userID, categoryID, itemName,itemDescription,price) VALUES (?,?,?,?,?)";
        var mysqlPool = require("../../utils/mysqlPool");
        mysqlPool.getConnection(function (err,connection) {
            connection.query(queryString,[req.body.userID,req.body.categoryID,req.body.itemName,req.body.itemDescription,req.body.price],function (error,results,fields) {
                if(error)
                {
                    console.log("Error is in add item");
                    //throw error;
                    res.send(error);
                }
                else{

                    connection.release();
                    res.send(""+results.insertId);
                }
            });
        });

    }
};