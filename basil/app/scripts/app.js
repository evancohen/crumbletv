"use strict";

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
      controller: "mainController"
    })
    .state("stream", {
      url: "/stream",
      templateUrl: "views/stream.html",
      controller: "streamController"
    });

});
