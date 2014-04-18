angular.module("basilApp").controller("mainController", [
  "$scope",
  "facetService",
  function ($scope, facetService) {

  facetService.getListGroupedByParentFacet().then(function (facets) {
    $scope.facets = facets;
  });

  $scope.facetService = facetService;

  $scope.subscriptions = ["Evan", "Jace", "Thomas", "Janella", "Evan's Mom", "Carlo"];
  $scope.scheduledStreams = [
  	{name: "Name 1", date: "November 13, 2014", attending:25},
  	{name: "Name 2", date: "November 14, 2014", attending:9000},
  	{name: "Name 2", date: "November 14, 2014", attending:31}
  ];

}]);
