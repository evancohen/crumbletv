/// <reference path="../app.ts" />

'use strict';

module basilApp {

  export interface StreamPlayerScope extends ng.IScope {
    name: string;
  }

  /**
   * Renders the player
   *
   * @param url URL of the rtmp stream to view. Also known as stream key/name
   */
  export class StreamPlayer implements ng.IDirective {
    // TODO: style to class
    public restrict = 'C';
    public scope = {
      name: "="
    };
    private static flowPlayerConfig = {
      clip: {
        url: 'cody',
        live: true,
        // configure clip to use influxis as our provider, it uses our rtmp plugin
        provider: 'influxis'
      },

      plugins: {
        influxis: {
          url: '/static/flowplayer.rtmp-3.2.13.swf',

          // netConnectionUrl defines where the streams are found
          netConnectionUrl: 'rtmp://162.243.130.104:1935/videochat'
        }
      }
    };

    public link = (scope: basilApp.StreamPlayerScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes): void => {
      flowplayer(element[0], "/static/flowplayer-3.2.18.swf", this.createConfig(scope.name));
    };

    /**
     * Creates a copy of the flowPlayerConfig with the given name.
     *
     * @param name Name of the rtmp stream to view. Also known as stream key, url.
     */
    private createConfig(name: string) {
      var config = angular.copy(basilApp.StreamPlayer.flowPlayerConfig);
      config.clip.url = name;
      return config;
    }

  }

  export function streamPlayerFactory() {
    return new basilApp.StreamPlayer();
  }

  angular.module('basilApp').directive('videoPlayer', streamPlayerFactory);
}

