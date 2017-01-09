/*global angular */
(function () {
    'use strict';
    angular.module('filllist', ['ngRoute'])
        .config(function ($routeProvider, $locationProvider) {
            $routeProvider
                .when("/", {
                    templateUrl : "templates/home.html",
                    controller: 'homeCtrl'
                })
                .when("/showAll", {
                    templateUrl : "templates/all.html",
                    controller: 'showAllCtrl'
                })
                .when("/add", {
                    templateUrl : "templates/add.html",
                    controller: 'addItemCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
        })
        .service('dataService', ['$http', '$interval', function ($http, $interval) {
            var autoRefreshTimer;
            return {
                getAllData: function () {
                    return $http.get('/data/all', {}).then(function (response) {
                        return response.data;
                    }, function (error) {
                        
                    });
                },
                getInstrumentData: function (instrumentId) {
                    return $http.get('/instrument/' + instrumentId, {}).then(function (response) {
                        return response.data;
                    }, function (error) {
                        
                    });
                },
                getInstrumentPosition: function (instrumentId) {
                    return $http.get('/instrument/position/' + instrumentId, {}).then(function (response) {
                        return response.data;
                    }, function (error) {
                        
                    });
                },
                addItem: function (inputData) {
                    return $http.post('/addItem/', {data: inputData}, {}).then(function(response){
                        return response.data;
                    }, function(error){
                        
                    })
                },
                autoRefreshData: function (callback) {
                    $http.get('/data/all', {}).then(function (response) {
                        if (callback && typeof callback === "function") {
                                callback(response.data);
                            }
                        }, function (error) {

                    });
                    autoRefreshTimer = $interval(function () {
                        $http.get('/data/all', {}).then(function (response) {
                            if (callback && typeof callback === "function") {
                                callback(response.data);
                            }
                        }, function (error) {

                        });
                    }, 5000);
                }
            };

        }])
        .controller('homeCtrl', ['$scope', 'dataService', function ($scope, dataService) {
            dataService.getAllData().then(function (response) {
                $scope.itemlist = response.data;
            });
            $scope.searchProductId = '';
            $scope.searchProductStatus = '';
            $scope.getProductStatus = function () {
                dataService.getInstrumentPosition($scope.searchProductId).then(function(response){
                    if(response != 404) 
                        $scope.searchProductStatus = response;
                    else {
                        $scope.searchProductStatus = 'Poduct Not Found';
                    }
                });
            }
            
        }])
        .controller('addItemCtrl', ['$scope', 'dataService', function ($scope, dataService) {
            $scope.message = '';
            $scope.addProductDetail = function(){
                dataService.addItem($scope.addItemDetail).then(function (response) {
                    if(response.error)
                        $scope.message = response.error;
                    else(response.msg)
                        $scope.message = response.msg;
                });
            };
        }])
        .controller('showAllCtrl', ['$scope', 'dataService', function ($scope, dataService) {
            dataService.autoRefreshData(function (response) {
                $scope.itemlist = response.data;
            });
        }]);
}());