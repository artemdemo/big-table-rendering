var bigData = angular.module('bigData', []);


(function(app){
    "use strict";

    /**
     * Factory
     *
     * @class dataFactory
     * @param $http
     * @param $q
     * @returns {{}}
     */
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

    /**
     * Controller
     *
     * @class mainCtrl
     * @param $scope
     * @param $timeout
     * @param dataFactory
     */
    var mainCtrl = function($scope, $timeout, dataFactory){
        $scope.products = [];

        dataFactory.loadData()
            .then(function(Menu){
                $scope.products = Menu.products;
            });

        $scope.search = function() {
            console.log('search');
            $scope.searchName = $('#search-input').val();
        };
    };

    app.controller('mainCtrl', ['$scope', '$timeout', 'dataFactory', mainCtrl]);
})( bigData );


(function( app ){
    "use strict";

    /**
     * Directive Repeater
     *
     * @class repeaterDirective
     * @returns {{restrict: string, scope: {items: string, searchBy: string}, replace: boolean, link: link}}
     */
    var repeaterDirective = function(){
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
        var stepSearchIndex = 1;
        var searchString = '';

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
                console.log('%cTable is ready', 'font-weight: 700');
                stepAmount = 100;
                stepIndex = 1;
            }
        };

        var filterRows = function() {
            var start, finish;
            finish = stepSearchIndex * stepAmount - 1;
            finish = finish > itemsList.length ? itemsList.length : finish + 1;
            start = (stepSearchIndex - 1) * stepAmount;
            for (var i = start; i < finish; i++) {
                var product = itemsList[i];
                if ( product.name.search(new RegExp(searchString, "i")) > -1 || searchString == '' ) {
                    $elm[0].childNodes[i].style.display = "block";
                } else {
                    $elm[0].childNodes[i].style.display = "none";
                }
            }
            stepSearchIndex++;
            if (stepSearchIndex * stepAmount < itemsList.length + stepAmount) {
                setTimeout(function () { filterRows() });
            } else {
                console.log('%cSearch finished', 'font-weight: 700; color: green;');
                stepAmount = 100;
                stepSearchIndex = 1;
            }
        };

        var link = function(scope, element, attrs) {
            $elm = element;

            scope.$watch(function(){
                return scope.items.length;
            }, function() {
                itemsList = scope.items;
                setTimeout(function () { printGroup() });
            });

            scope.$watch(function(){
                return scope.searchBy;
            },function(newValue){
                searchString = newValue;
                setTimeout(function () { filterRows() });
            });
        };

        return {
            restrict: 'E',
            scope: {
                items: '=',
                searchBy: '@'
            },
            replace: false,
            link: link
        }
    };

    app.directive('repeater', [ repeaterDirective ]);

})( bigData );