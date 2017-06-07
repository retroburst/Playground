app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', { templateUrl: '/views/home.htm', controller: 'homeController' })
        .when('/forecast/:city/:country/:days', { templateUrl: '/views/forecast.htm', controller: 'forecastController' })
}]);