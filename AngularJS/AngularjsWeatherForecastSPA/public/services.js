const API_URL = "http://api.openweathermap.org/data/2.5/forecast/daily?q=:city,:country&cnt=:days&units=metric&appid=d56d466a5cac3ea549f78896f7c44803";

app.service('sessionService',[function(){
    this.city = "Kakamigahara";
    this.country = "JP";
    this.days = "7";
}]);

app.service('weatherService',['$resource', function($resource){
    let api = $resource(API_URL);
    this.getForecast = function getForecast(city, country, days){
        var promise = new Promise((resolve, reject) => {
            api.get({ city: city, country: country, days: days }, function (results, getResponseHeaders) {
                console.log("Results from weather API received.", results);
                resolve(results);
            }); 
        });
        return(promise);
    };
}]);