angular.module("basilApp").controller("mainController", [
  "$scope",
  "facetService",
  function ($scope, facetService) {

  facetService.getListGroupedByParentFacet().then(function (facets) {
    $scope.facets = facets;
  });

  $scope.facetService = facetService;

  $scope.otherVideos = [
    {title: "Three Egg Omelet", user:"thomas", subs: 5, thumb : "/static/images/stream-2.png"},
    {title: "Crumble Cake", user:"janella", subs: 6, thumb : "/static/images/stream-3.png"},
    {title: "Dinner For Two", user:"ian", subs: 3, thumb : "/static/images/stream-4.png"}
  ];

  $scope.subscriptions = [
    {name : "Evan", img: "http://www.gravatar.com/avatar/80c98d5411a7bd502d306721f27d5343.jpg?s=195"},
    {name : "Jace", img: "http://www.gravatar.com/avatar/4b2e3b84c9a1982f48be5ad33e87d3ba.png?s=195"},
    {name : "Thomas", img: "https://scontent-b-sea.xx.fbcdn.net/hphotos-xpa1/t1.0-9/18020_10151148180785986_1031734518_n.jpg"},
    {name : "Janella", img: "https://scontent-a-sea.xx.fbcdn.net/hphotos-xaf1/t1.0-9/1004962_10151989789372362_790202312_n.jpg"}
  ]
  $scope.scheduledStreams = [
  	{name: "Three Egg Omelet", date: "November 13, 2014", attending: 10, thumb:"/static/images/stream-2.png"},
  	{name: "Crumble Cake", date: "November 14, 2014", attending: 13, thumb:"/static/images/stream-3.png"},
  	{name: "Dinner For Two", date: "November 14, 2014", attending: 5, thumb:"/static/images/stream-4.png"}
  ];

}]);
