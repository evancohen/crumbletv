angular.module("basilApp").controller("mainController", ["$scope", "Restangular", function ($scope, Restangular) {
  var baseFacets = Restangular.all('facet');

  baseFacets.getList().then(function (facets) {
    $scope.facets = facets;
  });
}]);
