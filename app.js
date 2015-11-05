// vim: set et ts=4 sw=4 tw=80 :
(function (angular) {
    'use strict';
    var app = angular.module('DisplagueGHIOApp', ['ngMaterial', 'ngResource']);

    app.config(function($mdThemingProvider){
        //		$mdThemingProvider.theme('default')
        //			.primaryPalette('yellow')
        //			.accentPallete('green');
        $mdThemingProvider.theme('darkTheme')
            .primaryPalette('yellow')
    });

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
        $scope.selectRepo = function(repo){
            $scope.repo = repo;
            $scope.toggleList();
        };

        $scope.toggleList = function() {
            var pending = $mdBottomSheet.hide() || $q.when(true);
            pending.then(function(menuId){
                $mdSidenav(menuId).toggle();
            });
        };

        ghRepos.query({}, function (data) {
            $scope.repos = data
        });

        $scope.toggleSidenav = function (menuId) {
            $mdSidenav(menuId).toggle();
        };
    }]);
})(angular);
