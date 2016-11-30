module.exports =
{

    authorizeUser: function (req, nextOrNot, next, res) {
        var mysqlPool = require("./mysqlPool");

        if (req.body.userID != undefined && req.body.apiKey != undefined) {
            var userID = req.body.userID;
            var apiKey = req.body.apiKey;


            var queryString = "SELECT password FROM users WHERE userID = ?";
            mysqlPool.getConnection(function (err, connection) {
                connection.query(queryString, [userID],
                    function (error, results, fields) {
                        if (error) {
                            console.log("error in authorizeUser");
                            throw error;
                        } else if (results.length > 0) {

                            var api_key_sub = results[0].password.substring(35);

                            if (apiKey == api_key_sub)
                                nextOrNot(true, next, res);
                            else
                                nextOrNot(false, next, res);

                        }
                        connection.release();
                    });

            });

        }
        else {
            nextOrNot(false, next, res);
        }

        //return true;
    }
};