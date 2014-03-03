/// <reference path="../bower_components/dt-angular/angular.d.ts" />

"use strict";

// TODO: proper heading for flowplayer
declare var flowplayer;

angular.module("basilApp", [
  "ngCookies",
  "ngResource",
  "ngSanitize",
  "ui.router"
]).config(function ($stateProvider, $urlRouterProvider) {
  // Unmatched state goes to root
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "views/main.html",
      controller: "MainController"
    })
    .state("stream", {
      url: "/stream",
      templateUrl: "views/stream.html",
      controller: "StreamController"
    });

});
