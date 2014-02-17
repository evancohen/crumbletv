/// <reference path="../bower_components/dt-angular/angular.d.ts" />

'use strict';

// TODO: proper heading.
declare var swfobject: any;

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
