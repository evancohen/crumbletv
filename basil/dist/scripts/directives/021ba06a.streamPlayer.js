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
            },

            controls: {
                url: flowPlayerURL + '.controls-3.2.16.swf',
                bottom: 0,
                volumeSliderColor: '#ffffff',
                volumeBorder: '1px solid rgba(128, 128, 128, 0.7)',
                volumeSliderGradient: 'none',
                buttonColor: '#ffffff',
                sliderBorder: '1px solid rgba(128, 128, 128, 0.7)',
                disabledWidgetColor: '#555555',
                autoHide: 'always',
                buttonOverColor: '#ffffff',
                backgroundGradient: 'none',
                progressColor: '#f6df00',
                timeColor: '#ffffff',
                bufferColor: '#445566',
                callType: 'default',
                sliderGradient: 'none',
                buttonOffColor: 'rgba(130,130,130,1)',
                progressGradient: 'none',
                timeBgColor: 'rgb(0, 0, 0, 0)',
                tooltipTextColor: '#ffffff',
                backgroundColor: '#DA7728',
                volumeColor: '#ffffff',
                timeBorder: '0px solid rgba(0, 0, 0, 0.3)',
                borderRadius: '0',
                tooltipColor: '#000000',
                durationColor: '#a3a3a3',
                bufferGradient: 'none',
                sliderColor: '#DA7728',
                timeSeparator: ' ',
                height: 20,
                opacity: 1.0,
                scrubber: false,
                play: true,
                volume: true,
                mute: true
            }
        },
        

        logo: {
            url: '/static/images/croissant-50.png',
            top: 10,
            left: 10,
            fullscreenOnly: false,
            displayTime: 0
        },
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
            flowplayer(element[0], flowPlayerURL + ".commercial-3.2.18.swf", createConfig(scope.name));

        }
    };
}]);
