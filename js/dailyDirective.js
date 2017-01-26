angular.module('weatherApp')
.directive('dailyDir', function(){
   return {
      restrict: 'E',
      templateUrl: './views/dailyTmpl.html',
      controller: function($scope){
         
      }
   }
})