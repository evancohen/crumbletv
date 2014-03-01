/// <reference path="../../../app/bower_components/dt-angular/angular-mocks.d.ts" />
/// <reference path="../../../app/bower_components/dt-jasmine/jasmine.d.ts" />
/// <reference path="../../../app/scripts/directives/streamPlayer.ts" />

'use strict';

describe('Directive: videoPlayer', () => {

  // load the directive's module
  beforeEach(module('basilApp'));

  var element: JQuery,
    scope: ng.IScope;

  beforeEach(inject(($rootScope: ng.IRootScopeService) => {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(($compile: ng.ICompileService) => {
    element = angular.element('<video-player></video-player>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the videoPlayer directive');
  }));
});
