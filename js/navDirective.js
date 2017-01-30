angular.module('weatherApp')
.directive('navDir', function(){
   return {
      restrict: 'AE',
      templateUrl: './views/navTmpl.html',
   }
});