angular.module("basilApp").service("facetService", ["Restangular", "$q", function (Restangular, $q) {
  var baseFacets = Restangular.all('facet');
  var parentFacets;

  function getList() {
    return baseFacets.getList();
  }

  function getListGroupedByParentFacet() {
    var deferred = $q.defer();

    getList().then(function (facets) {
      // facets = array
      deferred.resolve(_.groupBy(facets, function (facet) {
        return facet.parentFacet;
      }));
    });

    return deferred.promise;
  }

  function getParentFacet(id) {
    return parentFacets[id];
  }

  getListGroupedByParentFacet().then(function (facets) {
    parentFacets = _.indexBy(facets[null], 'id');
  });

  return {
    getList: getList,
    getListGroupedByParentFacet: getListGroupedByParentFacet,
    getParentFacet: getParentFacet
  };
}]);
