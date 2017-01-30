angular.module('weatherApp')
.directive('footerDir', function(){
   return {
      restrict: 'E',
      templateUrl: './views/footerTmpl.html'
   }
});