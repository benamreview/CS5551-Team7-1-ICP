/**
 * Created by user on 23/10/2016.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();
//MongoDB URL
var url = 'mongodb://root:Tuthano1o1o@ds235243.mlab.com:35243/cs5551icp';
//var url = 'mongodb://marmik:2621@ds051923.mlab.com:51923/demo';
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/register', function (req, res) {
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        if (client == null){
            console.log("CLIENT IS NULL");
        }
        //cs5551icp is my MongoDB database that holds all the records of the students
        const db = client.db('cs5551icp');

        //insertDocument is called with req.body as a parameter that contains all the necessary fields
        //(input from user) and will immediately call the insert() function from the MongoDB database
        //To proceed with the insertion
        insertDocument(db, req.body, function() {
            client.close();
            console.log("IN CALLBACK!")
            res.write("Successfully inserted");
            res.end();
        });
    });
});
var insertDocument = function(db, data, callback) {
    //Since insertOne() is an asynchronous function, it is important to make a callback function for it.
    //callback() will be called as soon as the insertion has finished
    //callback() method will simply close the database client, and finalize
    //the response stream of the Express Server
    db.collection('users').insertOne( data, function(err, result) {
        if(err)
        {
            res.write("Registration Failed, Error While Registering");
            res.end();
        }
        console.log("Inserted a document into the users collection.");
        callback();
    });
};
app.post('/search', function (req, res) {

    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        if (client == null){
            console.log("CLIENT IS NULL");
        }
        //cs5551icp is my MongoDB database that holds all the records of the students
        const db = client.db('cs5551icp');
        //FinduserbyMajor is the function that takes the req.body (result from the form)
        //to pass to the mongoDB instance as an query entry for comparison and searching.
        findUserbyMajor(db, req.body, function(resultobj) {
            console.log("IN CALLBACK!");
            client.close();
            console.log(resultobj);
            var JSONResult = JSON.stringify(resultobj);
            res.write(JSONResult);
            res.end();
        });

    });
});

var findUserbyMajor = function(db, data, callback) {
    var cursor = db.collection('users').find({"major": data.sCourse});
    //To Array is an asynchronous function that turns all the cursors (documents) into an array
    //The function that succeeds toArray() is a callback method with result as the retrieved data.
    cursor.toArray(function(err, result){
        // Here you can do something with your retrieved data;
        var resultobj = result;
        callback(resultobj);
    })
}
var server = app.listen(8081,function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
})