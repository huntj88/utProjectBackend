/**
 * Created by James on 11/30/2016.
 */
module.exports =
{

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

            var queryString = "INSERT INTO images (itemID, imageName) VALUES (?,?)";
            var mysqlPool = require("../../utils/mysqlPool");
            mysqlPool.getConnection(function (err,connection) {
                connection.query(queryString,[fields.itemID,imageName],function (error,results,fields) {
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
            });
        });

        form.on('end', function() {
            res.end('success');
        });

    }
};