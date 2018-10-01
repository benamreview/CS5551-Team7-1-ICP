// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('userLogin', ['ionic'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
  //Modal is a sub content in ionic. When clicked, it will be either shown or hidden.
  .controller('loginCtrl', function ($scope, $ionicModal) {
    //This will be iterated in index.html
    //These are the default tasks in the list.
    $scope.users = [
      { username: 'user1' },
      { username: 'user2' },
      { username: 'user3' }
    ];
    $scope.listTitle = "Predefined Users";
    // Create and load the Modal
    $ionicModal.fromTemplateUrl('view/newuser.html', function (modal) {
      //this taskModal will be used in the close and show() function below in newtask() and closenewTask()
      $scope.userModal = modal;
    }, {
      scope: $scope,
      animation: 'slide-in-right' //I have a new style coded as slide-in-right instead of slide-in-up
    });

    // Called when the form is submitted
    $scope.createUser = function (user) {
      $scope.listTitle = "MODIFIED Users";
      document.getElementById("myDIV").style.display = "block";
      document.getElementById("lTitle").style.color = "red";
      $scope.users.push({
        username: user.username
      });

      $scope.userModal.hide();
      user.username = "";
    };

    // Open our new task modal
    $scope.newUser = function () {
      $scope.userModal.show();
    };

    // Close the new task modal
    $scope.closenewUser = function () {
      $scope.userModal.hide();
    };
  });
