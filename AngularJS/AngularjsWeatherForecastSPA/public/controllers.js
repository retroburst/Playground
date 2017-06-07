app.controller('homeController', ['$scope', '$location', '$interpolate', '$routeParams', 'sessionService', function ($scope, $location, $interpolate, $routeParams, sessionService) {
    $scope.city = sessionService.city;
    $scope.country = sessionService.country;
    $scope.days = sessionService.days;

    $scope.submit = function () {
        let route = $interpolate('/forecast/{{city}}/{{country}}/{{days}}')(sessionService);
        $location.url(route);
    };

    $scope.$watch('city', function() { sessionService.city = $scope.city; });
    $scope.$watch('country', function() { sessionService.country = $scope.country; });
    $scope.$watch('days', function() { sessionService.days = $scope.days; });
}]);

app.controller('forecastController', ['$scope', '$routeParams', 'sessionService', 'weatherService', 
    function ($scope, $routeParams, sessionService, weatherService) {
        $scope.city = $routeParams.city || sessionService.city;
        $scope.country = $routeParams.country || sessionService.country;
        $scope.days = $routeParams.days || sessionService.days;
        $scope.results = null;
        weatherService.getForecast($scope.city, $scope.country, $scope.days).then(
            (results) => { $scope.results = results; $scope.$apply(); });
        
        $scope.convertDate = function convertDate(target) {
            let date = new Date(target * 1000);
            return (date);
        };

        $scope.$watch('city', function() { sessionService.city = $scope.city; });
        $scope.$watch('country', function() { sessionService.country = $scope.country; });
        $scope.$watch('days', function() { sessionService.days = $scope.days; });
    }]);