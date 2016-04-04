require('angular');
require('angular-ui-router');
require('angular-sanitize');

// import angular from 'angular';
// import 'angular-ui-router';
// import 'angular-sanitize';


(function(){
    'use strict';

    angular.module('app', [
        'ui.router',
        'ngSanitize',
        'app.controllers',
        'app.services',
        'app.filters'
    ]).config(appRoutes);

    angular.module('app.controllers', []);
    angular.module('app.services', []);
    angular.module('app.filters', []);

    appRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    /**
     * @param $stateProvider
     * @param $locationProvider
     * @param $urlRouterProvider
     * @ngInject
     */
    function appRoutes($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider
            .state('root',{
                url: '',
                abstract: true,
                views: {
                    'header': {
                        templateUrl: 'components/header/header.html',
                        controller: 'HeaderCtrl'
                    },
                    'footer':{
                        templateUrl: 'components/footer/footer.html',
                        controller: 'FooterCtrl'
                    }
                }
            })

            .state('home', {
                url: "/",
                views: {
                    'content@': {
                        templateUrl: 'views/home/home.html',
                        controller: 'HomeController'
                        // controllerAs: 'HomeCtrl'
                    }
                }
            })

            .state('about', {
                url: "/about",
                views: {
                    'content@': {
                        templateUrl: 'views/about/about.html',
                        controller: 'AboutController'
                        // controllerAs: 'AboutCtrl'
                    }
                }
            })

            .state('contact', {
                url: "/contact",
                views: {
                    'content@': {
                        templateUrl: 'views/contact/contact.html',
                        controller: 'ContactController'
                        // controllerAs: 'ContactCtrl'
                    }
                }
            });

            $locationProvider.html5Mode(true);
            $urlRouterProvider.otherwise('/');
    }

}());
