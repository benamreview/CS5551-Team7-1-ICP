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
    //These are the default (predefined) users in the list.
    $scope.users = [
      { username: 'user1' },
      { username: 'user2' },
      { username: 'user3' }
    ];
    $scope.listTitle = "Predefined Users";
    // Create and load the Modal
    //newuser.html is located in the view folder.
    //IonicModal will take care of the modal template by assigning the modal in newuser.html to $scope.userModal
    $ionicModal.fromTemplateUrl('view/newuser.html', function (modal) {
      //this taskModal will be used in the close and show() function below in newtask() and closenewTask()
      $scope.userModal = modal;
    }, {
      scope: $scope,
      animation: 'slide-in-right' //I have a new style coded as slide-in-right instead of slide-in-up. You can check by going to the css/style.css
    });

    // Called when the form is submitted
    $scope.createUser = function (user) {
      //This is used to change the style of the content when a new user is registered/added
      //by showing that "a new user has been added"
      //and changing the color of the initial predefined user list.
      $scope.listTitle = "MODIFIED Users";
      document.getElementById("myDIV").style.display = "block";
      document.getElementById("lTitle").style.color = "red";
      //As users is an array, once this function is called, users array will add a new item to its tail (pushing) and assign
      //the value to the username variable. Please note that user.username is retrieved/submitted from the newuser.html's form as an
      //input from the end user.
      //NOTE: only the username of "user" is used. The rest such as lastname, firstname, email, and password are not processed/stored in any way.
      $scope.users.push({
        username: user.username
      });
      //after the user is added, it will slide the modal away from the screen and show the recently user by refreshing the list.
      $scope.userModal.hide();
      user.username = "";
    };

    // Open our new user modal
    $scope.newUser = function () {
      $scope.userModal.show();
    };

    // Close the user modal
    $scope.closenewUser = function () {
      $scope.userModal.hide();
    };
  });
