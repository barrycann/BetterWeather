angular.module('weatherApp')
.directive('hourlyDir', function(){
   return {
      restrict: 'E',
      templateUrl: './views/hourlyTmpl.html',
      controller: function($scope){
         
      }
   }
})