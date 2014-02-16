/// <reference path="../../../app/bower_components/dt-angular/angular-mocks.d.ts" />
/// <reference path="../../../app/bower_components/dt-jasmine/jasmine.d.ts" />
/// <reference path="../../../app/scripts/controllers/main.ts" />

'use strict';

describe('Controller: MainCtrl', () => {

  // load the controller's module
  beforeEach(module('cookWebClientApp'));

  var MainCtrl: cookWebClientApp.MainCtrl,
    scope: cookWebClientApp.IMainScope;

  // Initialize the controller and a mock scope
  beforeEach(inject(($controller: ng.IControllerService, $rootScope: ng.IRootScopeService) => {
    scope = <any>$rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', () => {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
