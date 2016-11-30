/**
 * Created by James on 11/9/2016.
 */
var mysql = require('mysql');
var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'utUser',
    password : '7YN0davnrY583lgt',
    database : 'utProject'
});

module.exports =
{

    getConnection: function(callback) {
        pool.getConnection(function(err, conn) {
            if(err) {
                console.log("Error is in mysqlPool");
                return callback(err);
            }
            callback(err, conn);
        });
    }
};