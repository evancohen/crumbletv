/// <reference path="../app.ts" />

'use strict';

module basilApp {
  export interface IMainScope extends ng.IScope {
  }

  export class MainCtrl {

    constructor (private $scope: IMainScope) {

      $scope.$on('$viewContentLoaded', function() {
        var flashvars = {
          src: 'rtmp://162.243.130.104/flvplayback',
          autostart: 'true',
          themeColor: '0395d3',
          mode: 'sidebyside',
          scaleMode: 'fit',
          frameColor: '333333',
          fontColor: 'cccccc',
          link: '',
          embed: ''
        };

        var params = {
          allowFullScreen: 'true'
        };

        var attributes = {
          id: 'myPlayer',
          name: 'myPlayer'
        };

        swfobject.embedSWF('/static/openVideoPlayer/AkamaiFlashPlayer.swf', 
          'videoPlayer', 
          '774', 
          '469', 
          '9.0.0', 
          '/static/swfObject/expressInstall.swf', 
          flashvars, 
          params, 
          attributes);
      });

    }

  }

}

angular.module('basilApp')
  .controller('MainCtrl', basilApp.MainCtrl);
