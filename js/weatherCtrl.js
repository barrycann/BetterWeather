angular.module('weatherApp')
.controller('weatherCtrl', function($scope, weatherService){

    $scope.getLocation = function(){
        weatherService.getLocation()
        .then(function(data){
            $scope.loc = data;
            $scope.getWeather(data.lat, data.lon);
            $scope.getForecast(data.city);
        });
    }

    $scope.getWeather = function(a, b){
        weatherService.getWeather(a, b)
        .then(function(data){
            $scope.weather = data;
            $scope.image = $scope.weather.image;
            $scope.currentTemp = $scope.weather.currentTemp;
            $scope.wind = $scope.weather.wind;
            $scope.humidity = $scope.weather.humid;
        });
    }

    $scope.getForecast = function(city){
        weatherService.getForecast(city)
        .then(function(data){
            $scope.forecast = data;
            console.log($scope.forecast);
        });
    }

    $scope.getLocation();
});