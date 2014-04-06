angular.module("basilApp").controller("mainController", [
  "$scope",
  "facetService",
  function ($scope, facetService) {

  facetService.getListGroupedByParentFacet().then(function (facets) {
    $scope.facets = facets;
  });

}]);
