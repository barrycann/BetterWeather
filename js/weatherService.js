angular.module('weatherApp')
.service('weatherService', function($http, $q){

    this.getLocation = function(){
        var def = $q.defer();
        $http.get('http://ip-api.com/json')
        .then(function(response){
            def.resolve(response);
        });
        return def.promise;
    }



});