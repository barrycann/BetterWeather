angular.module('weatherApp')
.service('weatherService', function($http, $q){

    var five = {};

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
            var parsed = resp.data.list;
            five = buildFiveDay(parsed);
            console.log(parsed)
            console.log(five)
            def.resolve(five);
        });
        return def.promise;
    }

    this.toFahren = function(tempK){
        return Math.floor(((tempK * 9/5) - 459.67));
    }

    this.toCelc = function(tempK){
        return Math.floor(tempK-273.15);
    }

    this.getHighTemp = function(arr){
        var highs = [];
        for(var i=0;i<arr.length;i++){
            if(arr[i].dt_txt.substring(0,10) === arr[0].dt_txt.substring(0,10)){
                highs.push(arr[i].main.temp_max);
            }
        }
        return Math.max(...highs);
    }

    buildFiveDay = function(arr){
        var fiveDay = [];
        var day = {date: '', highs: [], lows: []};
        
        for(var i=0;i<arr.length;i++){
            var date = arr[i].dt_txt.substring(0, 10);
            
            if(i == 0 || date != arr[i-1].dt_txt.substring(0, 10)){
                day.date = date
            }      
            day.highs.push(arr[i].main.temp_max);
            day.lows.push(arr[i].main.temp_min);
            //day.wind.push(arr[i].wind.speed);
            //day.humidity.push(arr[i].main.humidity);
            if(arr[i+1] === undefined || date != arr[i+1].dt_txt.substring(0,10)){
                fiveDay.push(day);
            }
        }
        return fiveDay;
    }



    // high-temp: arr[i].main.temp_max
    // low-temp: arr[i].main.temp_min
    // precipitation: arr[i].snow.3h or arr[i].rain.3h
    // wind: arr[i].wind.speed;
    // humidity: arr[i].main.humidity;

});