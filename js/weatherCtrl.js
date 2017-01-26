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
        });
    }

    $scope.getForecast = function(city){
        weatherService.getForecast(city)
        .then(function(data){
            $scope.forecast = data;
            $scope.highTempF = weatherService.toFahren(weatherService.getHighTemp(data));
            $scope.highTempC = weatherService.toCelc(weatherService.getHighTemp(data));
            console.log($scope.highTempF);
            console.log($scope.highTempC)
            console.log($scope.forecast);
        });
    }

    $scope.getLocation();
});