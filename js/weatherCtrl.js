angular.module('weatherApp')
.controller('weatherCtrl', function($scope, weatherService){
    $scope.getLocation = function(){
        return weatherService.getLocation();
    }

    $scope.getLocation();
});