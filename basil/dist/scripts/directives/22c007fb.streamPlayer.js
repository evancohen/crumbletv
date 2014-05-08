angular.module("basilApp").directive("videoPlayer", [function () {
    var flowPlayerURL = "/static/flash/flowplayer";
    var flowPlayerConfig = {
        clip: {
            url: "myurl",
            live: true,
            // configure clip to use influxis as our provider, it uses our rtmp plugin
            provider: "influxis"
        },

        plugins: {
            influxis: {
                url: (flowPlayerURL + ".rtmp-3.2.13.swf"),

                // netConnectionUrl defines where the streams are found
                netConnectionUrl: "rtmp://162.243.130.104:1935/videochat"
            }
        }
    };

    function createConfig(name) {
        var config = angular.copy(flowPlayerConfig);
        config.clip.url = name;
        return config;
    }

    return {
        restrict: "C",
        scope: {
            name: "="
        },
        link: function link(scope, element, attributes) {
            flowplayer(element[0], flowPlayerURL + "-3.2.18.swf", createConfig(scope.name));

        }
    };
}]);
