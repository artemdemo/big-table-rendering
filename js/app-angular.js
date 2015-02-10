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

    var mainCtrl = function($scope, $filter, $timeout, dataFactory){
        $scope.products = [{},{}];
        dataFactory.loadData()
            .then(function(Menu){
                $scope.products = Menu.products;
            });

        $scope.addProducts = function() {
            $scope.products = [{},{}];
        };
    };

    app.controller('mainCtrl', ['$scope', '$filter', '$timeout', 'dataFactory', mainCtrl]);
})( bigData );


(function( app ){
    "use strict";

    var repeaterDirective = function($filter){
        var template = [
            '<div class="row">',
                '<div class="col-sm-2"><strong>%index%</strong></div>',
                '<div class="col-sm-4">%name%</div>',
                '<div class="col-sm-2">%price%</div>',
                '<div class="col-sm-2">%tax%</div>',
                '<div class="col-sm-2">%qty%</div>',
            '</div>'
        ].join('');

        var stepAmount = 100;
        var stepIndex = 1;
        var $elm = null;

        var itemsList = [];

        var printGroup = function () {
            var start, finish;
            finish = stepIndex * stepAmount - 1;
            finish = finish > itemsList.length ? itemsList.length : finish + 1;
            start = (stepIndex - 1) * stepAmount;
            for (var i = start; i < finish; i++) {
                var product = itemsList[i];
                var newRow = template;
                newRow = newRow.replace('%index%', i.toString());
                newRow = newRow.replace('%name%', product.name);
                newRow = newRow.replace('%price%', product.price);
                newRow = newRow.replace('%tax%', product.tax);
                newRow = newRow.replace('%qty%', product.quantity);
                $elm.append(newRow);
            }
            stepIndex++;
            if (stepIndex * stepAmount < itemsList.length + stepAmount) {
                setTimeout(function () { printGroup() });
            } else {
                stepAmount = 100;
                stepIndex = 1;
            }
        };

        var link = function(scope, element, attrs) {
            $elm = element;

            scope.$watch(function(){
                return scope.items.length;
            }, function() {
                console.log('link');
                itemsList = scope.items;
                $elm.empty();
                setTimeout(function () { printGroup() });
            });
        };

        return {
            restrict: 'E',
            scope: {
                items: '='
            },
            replace: false,
            link: link
        }
    };

    app.directive('repeater', ['$filter', repeaterDirective]);

})( bigData );