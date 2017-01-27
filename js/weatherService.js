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
            var parsed = resp.data.list;
            console.log(parsed);
            var date = buildDateArray(parsed);
            console.log(date);
            def.resolve(date);
        });
        return def.promise;
    }

    function toFahren(tempK){
        return Math.round(((tempK * 9/5) - 459.67));
    }

    function toCelc(tempK){
        return Math.round(tempK-273.15);
    }

    function buildDateArray(arr){
        var fiveDay = [];
        var date = '';
        var highs = [];
        var lows = [];
        var wind = [];
        var humid = [];
        var time = 0;
        
        for(var i=0;i<arr.length;i++){
            date = arr[i].dt_txt.substr(0, 10);
            time = arr[i].dt_txt.substr(11, 2);
            highs.push(arr[i].main.temp_max);
            lows.push(arr[i].main.temp_min);
            wind.push(arr[i].wind.speed);
            humid.push(arr[i].main.humidity);
            if(time == '21' || i == arr.length-1){
                var day = new DailyInfo(date, moment(date).format('dddd'), 
                Math.max(...highs), Math.min(...lows), Math.max(...wind), Math.max(...humid));
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

    function DailyInfo(date, dayOfWeek, high, low, wind, humid){
        this.date = date;
        this.dayOfWeek = dayOfWeek;
        this.high = high;
        this.low = low;
        this.wind = wind;
        this.humid = humid;
    }

});