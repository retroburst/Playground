const API_URL = "http://api.openweathermap.org/data/2.5/forecast/daily?q=:city,:country&cnt=:days&units=metric&appid=d56d466a5cac3ea549f78896f7c44803";

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

app.controller('forecastController', ['$scope', '$resource', '$routeParams', 'sessionService', function ($scope, $resource, $routeParams, sessionService) {
    $scope.city = $routeParams.city || sessionService.city;
    $scope.country = $routeParams.country || sessionService.country;
    $scope.days = $routeParams.days || sessionService.days;
    $scope.results = null;
    $scope.API = $resource(API_URL);
    $scope.API.get({ city: $scope.city, country: $scope.country, days: $scope.days }, function (results, getResponseHeaders) {
        $scope.results = results;
        console.log(results);
    });

    $scope.convertDate = function convertDate(target) {
        let date = new Date(target * 1000);
        return (date);
    };

    $scope.$watch('city', function() { sessionService.city = $scope.city; });
    $scope.$watch('country', function() { sessionService.country = $scope.country; });
    $scope.$watch('days', function() { sessionService.days = $scope.days; });
}]);