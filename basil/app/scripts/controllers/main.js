angular.module("basilApp").controller("mainController", [
  "$scope",
  "facetService",
  function ($scope, facetService) {

  facetService.getListGroupedByParentFacet().then(function (facets) {
    $scope.facets = facets;
  });

  $scope.facetService = facetService;

  $scope.otherVideos = [
    {title: "Title 1", user:"username1", subs: 55, thumb : "http://placehold.it/100x100"},
    {title: "Title 2", user:"username2", subs: 64, thumb : "http://placehold.it/100x100"},
    {title: "Title 3", user:"username3", subs: 9001, thumb : "http://placehold.it/100x100"}
  ];


  $scope.subscriptions = ["Evan", "Jace", "Thomas", "Janella", "Evan's Mom", "Carlo"];
  $scope.scheduledStreams = [
  	{name: "Name 1", date: "November 13, 2014", attending:25},
  	{name: "Name 2", date: "November 14, 2014", attending:9000},
  	{name: "Name 2", date: "November 14, 2014", attending:31}
  ];

}]);
