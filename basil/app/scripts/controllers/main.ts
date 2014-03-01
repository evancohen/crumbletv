/// <reference path="../app.ts" />

'use strict';

module basilApp {
  export interface IMainScope extends ng.IScope {
    streamName: string;
  }

  export class MainCtrl {
    constructor (private $scope: IMainScope) {
      // TODO: set name dynamically based on url
      $scope.streamName = "cody";
    }
  }

}

angular.module('basilApp')
  .controller('MainCtrl', ["$scope", basilApp.MainCtrl]);
