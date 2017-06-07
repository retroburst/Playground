app.directive('forecastDayResult', function () {
    return {
        restrict: 'A',
        templateUrl: '/views/directives/forecastDayResult.htm',
        replace: true,
        scope: {
            result: "=",
            convertDateFn: "&"
        }
    };
});

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                console.log("in ng enter");
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    }
});