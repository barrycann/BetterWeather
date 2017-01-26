angular.module('weatherApp', ['ui.router'])
.config(function ($stateProvider, $urlRouterProvider){
    $stateProvider
        .state( 'home', {
            url: '/',
            templateUrl: '../views/homeTmpl.html'
        })
        .state( 'fiveDay', {
            url: '/fiveDayForecast',
            templateUrl: '../views/fiveDayTmpl.html'
        })
        .state( 'data', {
            url: '/data',
            templateUrl: '../views/data.html'
        });
    
    $urlRouterProvider
        .otherwise('/');
});