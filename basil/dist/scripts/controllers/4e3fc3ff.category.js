angular.module("basilApp").controller("categoryController", [
  "$scope", 
  "facetService",
  "$stateParams",
  function ($scope, facetService, $stateParams) {
    if(!(typeof $stateParams.select === undefined)){
      $scope.category = $stateParams.select;
    }
  	facetService.getList().then(function (facetList){
      $scope.facetList = facetList;
    });
    facetService.getListGroupedByParentFacet().then(function (facetGroupedList){
      console.log(facetGroupedList);
      $scope.facetGroupedList = facetGroupedList;
      //Group categories do displaying them is simpler
      $scope.facetParents = facetGroupedList.null;
      $scope.occasions = facetGroupedList["1"];
      $scope.diets = facetGroupedList["2"];
      $scope.courses = facetGroupedList["3"];
      $scope.tastes = facetGroupedList["4"];
      $scope.techniques = facetGroupedList["5"];
      $scope.cuisines = facetGroupedList["6"];
      $scope.allergies = facetGroupedList["7"];
    });

    //$scope.getParentFacet = facetService.getParentFacet();
 }]);
/*
1 Occasions
2 Diets
3 Courses
4 Tastes
5 Techniques
6 Cuisines
7 Allergies
*/