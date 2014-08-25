/*
 * app.js
 *
 * Author: Ryan Gourley
 * Date: 8 July 2014
 *
 * Functionality: Initialize our App Module, set up the Router, get rid of that annoying /#/ mark
 *
 */
var app = angular
  .module('rgApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute'
  ]);

  app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/' //usually use 404.html, but in the case of learning Node routing this is easier
      })
  }]);