angular.module('weatherApp')
.service('weatherService', function($http, $q){

    var latitude;
    var longitude;

    this.getLocation = function(){
        var def = $q.defer();
        $http.get('http://ip-api.com/json')
        .then(function(response){
            var parsed = response.data;
            latitude = parsed.lat;
            longitude = parsed.lon;
            def.resolve(parsed);
        });
        return def.promise;
    }

    this.getWeather = function(){
        var def = $q.defer();
        $http.get('http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=48a8f7e3f9111f2ae148e9d7d078c129')
        .then(function(resp){
            console.log(resp);
            var weather = response.weather[0];
            def.resolve(weather);
        });
        return def.promise;
    }



});