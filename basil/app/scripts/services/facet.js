angular.module("basilApp").service("facetService", ["Restangular", "$q", function (Restangular, $q) {
  var baseFacets = Restangular.all('facet');

  function getList() {
    return baseFacets.getList();
  }

  function getListGroupedByParentFacet() {
    var deferred = $q.defer();

    getList().then(function (facets) {
      // facets = array
      deferred.resolve(_.groupBy(facets, function (facet) {
        return facet.parent_facet;
      }));
    });

    return deferred.promise;
  }

  return {
    getList: getList,
    getListGroupedByParentFacet: getListGroupedByParentFacet
  };
}]);
