/// <reference path="../app.ts" />

"use strict";

module basilApp {
  export interface IMainScope extends ng.IScope {
  }

  export class MainController {
    constructor (private $scope: IMainScope) {
    }
  }

}

angular.module("basilApp")
  .controller("MainController", ["$scope", basilApp.MainController]);
