/**
 * Created by user on 23/10/2016.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();
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
        const db = client.db('cs5551icp');
        insertDocument(db, req.body, function() {
            client.close();
            console.log("IN CALLBACK!")
            res.write("Successfully inserted");
            res.end();
        });
    });
});
var insertDocument = function(db, data, callback) {
    //console.log(data);
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
        const db = client.db('cs5551icp');
        var resultObj= [];
        findUserbyMajor(db, req.body, resultObj, function(resultobj) {
            console.log("IN CALLBACK!")
            client.close();
            console.log(resultobj);
            var JSONResult = JSON.stringify(resultobj);
            res.write(JSONResult);
            //res.write("Successfully searched");
            res.end();
        });

    });
})

var findUserbyMajor = function(db, data, resultobj, callback) {
    var resultObj;
    var cursor = db.collection('users').find({"major": data.sCourse});
    cursor.toArray(function(err, result){
        // Here you can do something with your data
        //console.log(result);
        resultobj=result;
        //console.log(resultobj)
        callback(resultobj);
    })

        //resultObj=cursor.toArray();
    //console.log(cursor.toArray());
    /*cursor.each(function(err,doc){
        assert.equal(err,null);
        if(doc != null)
        {
            console.log(doc);
            console.log("Class ID:" + doc.classID);
            console.log("Student's Name:" + doc.sName);
            console.log("Course of Study:" + doc.course);
            console.log("Major:" + doc.major);
            console.log("Minor:" + doc.minor);
            resultobj.push(doc);
        }
    }); */
    //console.log(resultObj.length);


}
var server = app.listen(8081,function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
})