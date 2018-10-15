/**
 * Created by Marmik on 04/10/2016.
 */
var http = require('http');
var fs = require("fs");
var url = require('url');
var express = require('express');
var app = express();
var request = require('request');
app.set('view engine', 'html');
//This body-parser module parses the JSON, buffer, string and url encoded data submitted
// using HTTP POST request.
//Install body-parser using NPM as shown below.
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", function(req, res)
{
    res.sendFile("index.html", {"root": __dirname});
});

app.post('/getDistance', function (req, res) {
    var origin = req.body.origin;
    var destination = req.body.destination;
    var result={
        'location': []
    };
    var name = 'hello';

    //res.render(__dirname + "/index.html", {name:name});

    console.log(origin + destination);
    request('https://maps.googleapis.com/maps/api/distancematrix/json?' +
        'language=en&units=imperial' +
        '&origins=' + origin +
        '&destinations=' + destination +
        '&key=AIzaSyB087vg5c4hTnohVi4sjP63cHv4Eh3jt2s', function (error, response, body) {
        //Check for error
        if(error){
            return console.log('Error:', error);
        }

        //Check for right status code
        if(response.statusCode !== 200){
            return console.log('Invalid Status Code Returned:', response.statusCode);
        }
        //All is good. Print the body
        body = JSON.parse(body);
        var loc = body.rows[0].elements; //first item of rows in JSON file
        //console.log(loc.elements[0].distance.text);
        console.log(body.destination_addresses[0]);
        console.log(loc.length);
        for(var i=0;i<loc.length;i++)
        {
            result.location.push({'distance': loc[i].distance.text,
                'duration':loc[i].duration.text.toString()});
        }
        res.contentType('application/json');
        var JSONResult = JSON.stringify(result);
        res.write(JSONResult);
        for (var i = 0; i<result.location.length; i++){
            res.write("\nThe Distance is: " + result.location[i].distance);
            res.write("\nThe Time is: " + result.location[i].duration);
        }
        //res.write(result);
        res.end();
    });
    console.log(result);


})
app.get('/test', function(req, res, next) {
    res.json({ message: 'Hello World' });
});
var server = app.listen(8081, function () {
    // var host = server.address().address
    var port = server.address().port;

    console.log("Distance App currently listening at http://127.0.0.1:%s",port)
})