angular.
  module('main').
  config(['$routeProvider',
    function config($routeProvider) {
      $routeProvider.
        when('/', {
            templateUrl : 'templates/home.html'
        }).
        when('/widgets', {
            templateUrl : 'templates/widget.html',
            controller: 'widgetController',
        }).
        when('/widgets/:widgetParam/', {
            templateUrl : 'templates/widget.html',
            controller: 'widgetController',
        }).
        when('/category', {
            templateUrl : 'templates/category.html',
            controller: 'categoryController',
        }).
        when('/category/:catParam/', {
            templateUrl : 'templates/category.html',
            controller: 'categoryController',
        }).
        when('/widget_details/:id', {
            templateUrl : 'templates/widget_details.html',
            controller: 'WidgetDetailsController',
        }).
        when('/about', {
            templateUrl : 'templates/about.html'
        }).
        when('/myprofile', {
            templateUrl : 'templates/myprofile.html',
            // controller: 'ProfileController',
        }).
        when('/cart', {
            templateUrl : 'templates/cart.html'
        }).
        when('/upload', {
            templateUrl : 'templates/upload_widget.html',
            controller : 'UploadWidgetController'
        }).
        when('/upload/:id', {
            templateUrl : 'templates/upload_widget.html',
            controller : 'UploadWidgetController'
        }).
        otherwise('/');
    }
  ]);