angular.module('weatherApp')
.directive('mainWeatherDir', function(){
   return {
      restrict: 'E',
      templateUrl: './views/weatherTmpl.html',
   }
});