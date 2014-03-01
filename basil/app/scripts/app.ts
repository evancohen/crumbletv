/// <reference path="../bower_components/dt-angular/angular.d.ts" />

'use strict';

// TODO: proper heading for flowplayer
declare var flowplayer;

angular.module('basilApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
]).config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });;
