(function (angular) {
    'use strict';
    var app = angular.module('DisplagueGHIOApp', ['ngMaterial', 'ngResource']);

    app.factory('ghRepos', ['$resource', function ($resource) {
        return $resource('https://api.github.com/users/displague/repos', {}, {
            query: {
                method: 'GET',
                isArray: true
            }
        });
  }]);

    app.controller('RepoListCtrl', ['$scope', '$mdSidenav', 'ghRepos', function ($scope, $mdSidenav, ghRepos) {
        //.complete(function(data){
        ghRepos.query({}, function (data) {
            $scope.repos = data
        });

        $scope.toggleSidenav = function (menuId) {
            $mdSidenav(menuId).toggle();
        };
  }]);

})(angular);