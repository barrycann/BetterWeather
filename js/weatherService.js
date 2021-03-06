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
        $http.get('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=48a8f7e3f9111f2ae148e9d7d078c129')
        .then(function(resp){
            var desc = resp.data.weather[0].description;
            var weather = {
                desc: desc,
                currentTemp: Math.round(resp.data.main.temp),
                wind: windToMph(resp.data.wind.speed),
                humid: resp.data.main.humidity,
                image: getImage(desc)
            }
            def.resolve(weather);
        });
        return def.promise;
    }

    this.getForecast = function(city){
        var def = $q.defer();
        $http.get('http://api.openweathermap.org/data/2.5/forecast?q='+city+',us&units=imperial&appid=48a8f7e3f9111f2ae148e9d7d078c129')
        .then(function(resp){
            var parsed = resp.data.list;
            var date = buildDateArray(parsed);
            def.resolve(date);
        });
        return def.promise;
    }

    function toFahren(tempK){
        return Math.round(((tempK * 1.8) - 459));
    }

    // Converts speed in meters/second to miles/hour
    function windToMph(speed){
        return Math.round((speed * 2.23694) * 10) / 10;
    }

    // Takes info from weather forecast object and puts it into an array of daily forecast objects
    function buildDateArray(arr){
        var fiveDay = [];
        var date = '';
        var image = '';
        var temps = [];
        var wind = [];
        var humid = [];
        var desc = [];
        var time = 0;
        
        for(var i=0;i<arr.length;i++){
            date = arr[i].dt_txt.substr(0, 10);
            time = arr[i].dt_txt.substr(11, 2);
            temps.push(arr[i].main.temp);
            wind.push(arr[i].wind.speed);
            humid.push(arr[i].main.humidity);
            desc.push(arr[i].weather[0].description);
            if(time == '21' || i == arr.length-1){
                var windAvg = windToMph((wind.reduce(function(a,b){ return a+b;}))/wind.length);
                var humidAvg = (humid.reduce(function(a,b){return a+b;})/humid.length);
                var dailyDesc = findWeather(desc);
                var day = new DailyInfo(
                    moment(date).format('MMM D'),
                    moment(date).format('ddd'), 
                    Math.round(Math.max(...temps)),
                    Math.round(Math.min(...temps)),
                    windAvg,
                    Math.round(humidAvg),
                    getImage(dailyDesc)
                );
                
                fiveDay.push(day);
                
                date = '';
                temps = [];
                wind = [];
                humid = [];
                desc = [];
            }
        }

        // Checks to see if today's info got into the five day, and removes today (which would be a six day forecast)
        if(fiveDay.length > 5){
            var trimmed = fiveDay.splice(1);
            return trimmed;
        }
        return fiveDay;
    }

    // Daily forecast info constructor
    function DailyInfo(date, dayOfWeek, high, low, wind, humid, desc){
        this.date = date;
        this.dayOfWeek = dayOfWeek;
        this.high = high;
        this.low = low;
        this.wind = wind;
        this.humid = humid;
        this.desc = desc;
    }

    function findWeather(arr){
        var cloudPoints = 0;
        var cloudValue = 0;
        var strictWeather = ['rain', 'light rain', 'shower rain', 'thunderstorm', 'snow'];

        for(var i=0;i<arr.length;i++){
            for(var j=0;j<strictWeather.length;j++){
                if(arr[i] == strictWeather[j]){
                    return strictWeather[j];
                }
            }
            switch(arr[i]){
                case 'few clouds':
                    cloudPoints += 1;
                    break;
                case 'scattered clouds':
                    cloudPoints += 2;
                    break;
                case 'broken clouds':
                    cloudPoints += 3;
                    break;
                default:
                    break;
            }
        } // End For

        cloudValue = cloudPoints / arr.length;
        console.log(arr);
        console.log("points", cloudPoints);
        console.log("Value", cloudValue);
        if(cloudValue <= 0.75){
            return 'clear sky';
        } else if( cloudValue <= 2){
            return 'few clouds';
        } else {
            return 'broken clouds';
        }
        return arr[arr.length-1];
    }

    function getImage(desc){
        var theImage = '';
        switch(desc) {
            case 'clear sky':
                theImage = './img/clearSky.jpg';
                break;
            case 'few clouds':
            case 'scattered clouds':
                theImage = './img/PartlyCloudy.jpg';
                break;
            case 'broken clouds':
                theImage = './img/cloudy.jpg';
                break;
            case 'rain':
            case 'shower rain':
            case 'thunderstorm':
                theImage = './img/Rain.jpg';
                break;
            case 'snow':
            case 'mist':
                theImage = './img/heavySnow.jpg';
                break;
            default:
                theImage='./img/PartlyCloudy.jpg';
        }
        return theImage;
    }
});