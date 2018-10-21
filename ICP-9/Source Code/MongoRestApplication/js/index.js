/**
 * Created by user on 23/10/2016.
 */
var myapp = angular.module('demoMongo',[]);
myapp.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
});
myapp.controller('MongoRestController',function($scope,$http){
    $scope.insertData = function(){
        console.log($scope.formData.classID);
        console.log($scope.formData.sName);
        console.log($scope.formData.course);
        console.log($scope.formData.major);
        console.log($scope.formData.minor);
        var dataParams = {
            'classID' : $scope.formData.classID,
            'sName' : $scope.formData.sName,
            'course' : $scope.formData.course,
            'major' : $scope.formData.major,
            'minor' : $scope.formData.minor
        };
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        var req = $http.post('http://127.0.0.1:8081/register',dataParams);
        req.success(function(data, status, headers, config) {
            console.log("HELLO!");
            $scope.message = data;
            //console.log(data);
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    };
    $scope.searchData = function(){
        /*console.log($scope.formData.classID);
        console.log($scope.formData.sName);
        console.log($scope.formData.course);
        console.log($scope.formData.major);
        console.log($scope.formData.minor);
        var dataParams = {
            'fname' : $scope.fname,
            'lname' : $scope.lname,
            'email' : $scope.email,
            'pw' : $scope.pw
        };*/
        console.log($scope.formData.sCourse);
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        var req = $http.post('http://127.0.0.1:8081/search',$scope.formData);
        req.success(function(data, status, headers, config) {
            $scope.message = data;
            console.log("IN SUCCESS");
            $scope.studentList = new Array();
            for (var i = 0; i < data.length; i++) {
                //alert( data1.hits[i].fields.item_name);
                $scope.studentList[i]= {
                    "id": data[i].classID,
                    "name": data[i].sName,//Long name of item retrieved in API
                    "course": data[i].course,//Serving Size in Grams
                    "major": data[i].major,
                    "minor": data[i].minor//number of calories in the food type
                };
            }
            console.log(data[0].sName);
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    };
});