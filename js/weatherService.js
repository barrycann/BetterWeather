angular.module('weatherApp')
.service('weatherService', function($http, $q){

    this.getLocation = function(){
        var def = $q.defer();
        $http.get('http://ip-api.com/json')
        .then(function(response){
            var parsed = response.data;
            def.resolve(parsed);
        });
        return def.promise;
    }

    this.getWeather = function(lat, lon){
        var def = $q.defer();
        $http.get('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=48a8f7e3f9111f2ae148e9d7d078c129')
        .then(function(resp){
            var weather = resp.data;
            def.resolve(weather);
        });
        return def.promise;
    }

    this.getForecast = function(city){
        var def = $q.defer();
        $http.get('http://api.openweathermap.org/data/2.5/forecast?q='+city+',us&appid=48a8f7e3f9111f2ae148e9d7d078c129')
        .then(function(resp){
            def.resolve(resp);
        });
        return def.promise;
    }

    this.toFahren = function(tempK){
        return Math.floor(((tempK * 9/5) - 459.67));
    }

    this.toCelc = function(tempK){
        return Math.floor(tempK-273.15);
    }



});