var bigData = angular.module('bigData', []);


(function(app){
    "use strict";

    var dataFactory = function($http) {
        var dataFactory = {};

        var Menu = null;

        dataFactory.loadData = function(){
            $http.get('../json/products.json')
                .success(function(data){
                    Menu = data;
                });
        };

        return dataFactory;
    };

    app.factory('dataFactory', ['$http', dataFactory]);
})( bigData );


(function(app){
    "use strict";

    var mainCtrl = function($scope, dataFactory){
        dataFactory.loadData();
    };

    app.controller('mainCtrl', ['$scope', 'dataFactory', mainCtrl]);
})( bigData );