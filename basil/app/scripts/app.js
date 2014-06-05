"use strict";

var app = angular.module("basilApp", [
  "ngCookies",
  "ngSanitize",
  "ui.router",
  "restangular",
  "ui.calendar"
]).config(function ($stateProvider, $urlRouterProvider, $sceDelegateProvider) {
  // Unmatched state goes to root
  $sceDelegateProvider.resourceUrlWhitelist([
   'self',
   "http://tlk.io/*"
  ]);

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "views/main.html",
      controller: "mainController"
    })
    /*
    *  Found a bug in angular-ui-router where in Firefox the state can not be set to "watch" 
    */
    .state("watching", {
      url: "/watch/:name",
      templateUrl: "views/watch.html",
      controller: "watchController"
    })
    .state("category", {
      url: "/category",
      templateUrl: "views/category.html",
      controller: "categoryController"
    })
    .state("category.select", {
      url: "/category/:select",
      templateUrl: "views/category.select.html",
      controller: "categoryController"
    })
    .state("profile", {
      url: "/profile",
      templateUrl: "views/profile.html",
      controller: "profileController"
    })
    .state("sign-up", {
      url: "/sign-up",
      templateUrl: "views/sign-up.html",
      controller: "signUpController"
    }).state("subscribe", {
      url:"/subscribe",
      templateUrl: "views/subscribe.html",
      controller: "subscribeController"
    })
    .state("login", {
      url:"/login",
      templateUrl: "views/login.html",
      controller: "loginController"
    })
    .state("event", {
      url:"/event",
      templateUrl: "views/event.html",
      controller: "eventController"
    })
    .state("show", {
      url:"/show",
      templateUrl: "views/show.html",
      controller: "showController"
    })
    .state("recipe", {
      url:"/recipe",
      templateUrl: "views/recipe.html",
      controller: "recipeController"
    })
    .state("calendar", {
      url:"/calendar",
      templateUrl: "views/calendar.html",
      controller: "calendarController"
    })
    .state("stream", {
      url:"/stream",
      templateUrl: "views/stream.html",
      controller: "streamController"
    })
    .state("omelet", {
      url:"/omelet",
      templateUrl: "views/omelet.html",
      controller: "omeletController"
    })
    .state("session", {
      url:"/session",
      templateUrl: "views/session.html",
      controller: "sessionController"
    });
});

app.config(function(RestangularProvider) {
  //RestangularProvider.setBaseUrl('http://localhost:1337');
  RestangularProvider.setBaseUrl('http://beta.crumble.tv/api');


  RestangularProvider.setResponseExtractor(function(response, operation) {
    // extracts data
    return response.data;
  });

  RestangularProvider.setDefaultHttpFields({cache: true});

  RestangularProvider.setDefaultHeaders({
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  });

  //RestangularProvider.setExtraFields(['name']);
  /*
  RestangularProvider.addElementTransformer('accounts', false, function(element) {
    element.accountName = 'Changed';
    return element;
  });
  */

  //RestangularProvider.setMethodOverriders(["put", "patch"]);

  // In this case we are mapping the id of each element to the _id field.
  // We also change the Restangular route.
  // The default value for parentResource remains the same.
  /*
  RestangularProvider.setRestangularFields({

    id: "_id",
    route: "restangularRoute",
    selfLink: "self.href"
  });
  */

  //RestangularProvider.setRequestSuffix('.json');

  // Use Request interceptor
  /*
  RestangularProvider.setRequestInterceptor(function(element, operation, route, url) {
    delete element.name;
    return element;
  });
    */

  // ..or use the full request interceptor, setRequestInterceptor's more powerful brother!
  /*
  RestangularProvider.setFullRequestInterceptor(function(element, operation, route, url, headers, params, httpConfig) {
    delete element.name;
    return {
      element: element,
      params: _.extend(params, {single: true}),
      headers: headers,
      httpConfig: httpConfig
    };
  });
  */
});
