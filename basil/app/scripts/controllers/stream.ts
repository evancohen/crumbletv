/// <reference path="../app.ts" />

"use strict";

module basilApp {
  export interface IStreamScope extends ng.IScope {
    streamName: string;
  }

  export class StreamController {

    constructor (private $scope: IStreamScope) {
      // TODO: set name dynamically based on url
      $scope.streamName = "cody";
    }
  }
}

angular.module("basilApp").controller("StreamController", ["$scope", basilApp.StreamController]);
