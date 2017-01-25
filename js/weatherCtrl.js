angular.module('weatherApp')
.controller('weatherCtrl', function($scope, weatherService){
    
    $scope.getLocation = function(){
        weatherService.getLocation().then(function(data){
            $scope.loc = data;
        });
    }

    $scope.getWeather = function(){
        weatherService.getWeather().then(function(wData){
            $scope.weather = wData;
        });
    }


    $scope.getLocation();
    $scope.getWeather();
});