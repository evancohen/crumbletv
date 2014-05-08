angular.module('basilApp').controller("calendarController", ["$scope", "Restangular",

  function ($scope, Restangular) {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        
        // /* event source that pulls from google.com */
        // $scope.eventSource = {
        //         url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
        //         className: 'gcal-event',           // an option!
        //         currentTimezone: 'America/Chicago' // an option!
        // };
        /* event source that contains custom events on the scope */
        $scope.events = [];
        var data = {
          owner: 3
        }
        Restangular.one("Show/findme").get(data).then(function(data){
          for(var i = 0; i < data.length; i++) {
            $scope.events.push({
              color: "#FF00FF",
              title: data[i].title,
              start: data[i].startTime,
              end: data[i].endTime,
              editable: true,
              allDay: false
            });
          }
        });
        //$scope.events.push({});

        //;
        /* event source that calls a function on every view switch */
        $scope.eventsF = function (start, end, callback) {
          var s = new Date(start).getTime() / 1000;
          var e = new Date(end).getTime() / 1000;
          var m = new Date(start).getMonth();
          var events = [];
          callback(events);
        };

        $scope.calEventsExt = [];
        data = {
          owner: 4
        }
        Restangular.one("Show/findme").get(data).then(function(data){
          for(var i = 0; i < data.length; i++) {
            $scope.calEventsExt.push({
              color: "#ff0000",
              title: data[i].title,
              start: data[i].startTime,
              end: data[i].endTime,
              editable: false,
              allDay: false
            })
          }
        });
        /* alert on eventClick */
        $scope.alertOnEventClick = function( event, allDay, jsEvent, view ){
            $scope.alertMessage = (event.title + ' was clicked ');
        };
        /* alert on Drop */
         $scope.alertOnDrop = function(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view){
           $scope.alertMessage = ('Event Droped to make dayDelta ' + dayDelta);
        };
        /* alert on Resize */
        $scope.alertOnResize = function(event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view ){
           $scope.alertMessage = ('Event Resized to make dayDelta ' + minuteDelta);
        };
        /* add and removes an event source of choice */
        $scope.addRemoveEventSource = function(sources,source) {
          var canAdd = 0;
          angular.forEach(sources,function(value, key){
            if(sources[key] === source){
              sources.splice(key,1);
              canAdd = 1;
            }
          });
          if(canAdd === 0){
            sources.push(source);
          }
        };
        /* add custom event*/
        $scope.addEvent = function() {
          $scope.events.push({
            title: 'Open Sesame',
            start: new Date(y, m, 28),
            end: new Date(y, m, 29),
            className: ['openSesame'],
            editable: true
          });
        };
        /* remove event */
        $scope.remove = function(index) {
          $scope.events.splice(index,1);
        };
        /* Change View */
        $scope.changeView = function(view,calendar) {
          calendar.fullCalendar('changeView',view);
        };
        /* Change View */
        $scope.renderCalender = function(calendar) {
          if(calendar){
            calendar.fullCalendar('render');
          }
        };
        /* config object */
        $scope.uiConfig = {
          calendar:{
            height: 450,
            editable: false,
            header:{
              left: 'title',
              center: '',
              right: 'today prev,next'
            },
            eventClick: $scope.alertOnEventClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize
          }
        };

        // $scope.changeLang = function() {
        //     $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        //     $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        //     $scope.changeTo = 'Hungarian';
        // };
        /* event sources array*/
        $scope.eventSources = [$scope.calEventsExt, $scope.eventsF, $scope.events];
        $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
    }]);
    /* EOF */
