'use strict';

angular.module('weatherApp', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: '../views/homeTmpl.html'
    }).state('fiveDay', {
        url: '/fiveDayForecast',
        templateUrl: '../views/fiveDayTmpl.html'
    }).state('data', {
        url: '/data',
        templateUrl: '../views/data.html'
    });

    $urlRouterProvider.otherwise('/');
});
'use strict';

angular.module('weatherApp').directive('dailyDir', function () {
   return {
      restrict: 'E',
      templateUrl: './views/dailyTmpl.html',
      controller: function controller($scope) {}
   };
});
'use strict';

angular.module('weatherApp').controller('weatherCtrl', function ($scope, weatherService) {

    $scope.tenDay = {};

    $scope.getLocation = function () {
        weatherService.getLocation().then(function (data) {
            $scope.loc = data;
            $scope.getWeather(data.lat, data.lon);
            $scope.getForecast(data.city);
        });
    };

    $scope.getWeather = function (a, b) {
        weatherService.getWeather(a, b).then(function (data) {
            $scope.weather = data;
        });
    };

    $scope.getForecast = function (city) {
        weatherService.getForecast(city).then(function (data) {
            $scope.forecast = data;
            console.log($scope.forecast);
        });
    };

    $scope.getLocation();
});
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

angular.module('weatherApp').service('weatherService', function ($http, $q) {

    this.getLocation = function () {
        var def = $q.defer();
        $http.get('http://ip-api.com/json').then(function (response) {
            var parsed = response.data;
            def.resolve(parsed);
        });
        return def.promise;
    };

    this.getWeather = function (lat, lon) {
        var def = $q.defer();
        $http.get('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=48a8f7e3f9111f2ae148e9d7d078c129').then(function (resp) {
            var weather = resp.data;
            def.resolve(weather);
        });
        return def.promise;
    };

    this.getForecast = function (city) {
        var def = $q.defer();
        $http.get('http://api.openweathermap.org/data/2.5/forecast?q=' + city + ',us&appid=48a8f7e3f9111f2ae148e9d7d078c129').then(function (resp) {
            var parsed = resp.data.list;
            console.log(parsed);
            var date = buildDateArray(parsed);
            console.log(date);
            def.resolve(date);
        });
        return def.promise;
    };

    function toFahren(tempK) {
        return Math.round(tempK * 9 / 5 - 459.67);
    }

    function toCelc(tempK) {
        return Math.round(tempK - 273.15);
    }

    function buildDateArray(arr) {
        var fiveDay = [];
        var date = '';
        var highs = [];
        var lows = [];
        var wind = [];
        var humid = [];
        var time = 0;

        for (var i = 0; i < arr.length; i++) {
            date = arr[i].dt_txt.substr(0, 10);
            time = arr[i].dt_txt.substr(11, 2);
            highs.push(arr[i].main.temp_max);
            lows.push(arr[i].main.temp_min);
            wind.push(arr[i].wind.speed);
            humid.push(arr[i].main.humidity);
            if (time == '21' || i == arr.length - 1) {
                var day = new DailyInfo(date, moment(date).format('dddd'), Math.max.apply(Math, _toConsumableArray(highs)), Math.min.apply(Math, _toConsumableArray(lows)), Math.max.apply(Math, _toConsumableArray(wind)), Math.max.apply(Math, _toConsumableArray(humid)));
                console.log(day);
                fiveDay.push(day);
                date = '';
                highs = [];
                lows = [];
                wind = [];
                humid = [];
            }
        }
        return fiveDay;
    }

    function DailyInfo(date, dayOfWeek, high, low, wind, humid) {
        this.date = date;
        this.dayOfWeek = dayOfWeek;
        this.high = high;
        this.low = low;
        this.wind = wind;
        this.humid = humid;
    }
});
//# sourceMappingURL=bundle.js.map
