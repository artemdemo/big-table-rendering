var bigData = angular.module('bigData', []);


(function(app){
    "use strict";

    var dataFactory = function($http, $q) {
        var dataFactory = {};

        var Menu = null;

        dataFactory.loadData = function(){
            var deferred = $q.defer();

            $http.get('../json/products.json')
                .success(function(data){
                    Menu = data;
                    deferred.resolve( data );
                });

            return deferred.promise;
        };

        return dataFactory;
    };

    app.factory('dataFactory', ['$http', '$q', dataFactory]);
})( bigData );


(function(app){
    "use strict";

    var mainCtrl = function($scope, dataFactory){
        dataFactory.loadData()
            .then(function(Menu){
                $scope.products = Menu.products;
            });
    };

    app.controller('mainCtrl', ['$scope', 'dataFactory', mainCtrl]);
})( bigData );