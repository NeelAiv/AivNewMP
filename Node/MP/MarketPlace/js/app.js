angular.module("MarketPlace", ['main', 'filters']);

var mpApp = angular.module("main", ['ngRoute', 'ngCookies']);
mpApp.constant('BASE_URL', 'http://192.168.0.20:3000');

mpApp.run(['$rootScope', '$location', '$cookies', '$http', 
    function ($rootScope, $location, $cookies, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/upload']) !== -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/');
            }
        });
    }]);

mpApp.controller("mainController", function ($scope, $timeout, $http, BASE_URL) {
    
    $scope.baseUrl = BASE_URL;
    $scope.widgets = [];
    $scope.options = {
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        items: 4,
        margin: 30,
        responsive: {
            0: {
                items: 1
            },
            320: {
                items: 1
            },
            480: {
                items: 2
            },
            768: {
                items: 2
            },
            991: {
                items: 3
            },
            1024: {
                items: 3
            },
            1280: {
                items: 4
            },
            1440: {
                items: 4
            },
            1600: {
                items: 4
            },
            1920: {
                items: 4
            }
        }
    }

    $scope.getWidgets = function(){        
        $http({
            method: 'GET',
            url: $scope.baseUrl+'/widgets'
          }).then(function successCallback(response) {
              $scope.widgets = [];
              $scope.widgets =  response.data;
            }, function errorCallback(response) {
              
            });
    }

    //get All new Widgets;
    $scope.getWidgets();

    $scope.newlyAdded = function () {
        //Newly Added Carousel Code starts here 
        var owl = $('#naddedCarousel');
        if(typeof owl.data('owlCarousel') != 'undefined'){
            owl.data('owlCarousel').destroy();
            owl.removeClass('owl-carousel');
        }

        $timeout($scope.addItems() , 200); 

        //Mostly Downloaded Carousel Code ends here
    }

    // $scope.newWidgets = function(widget) {
    //     var date = new Date(widget.created_date);
    //     return date;
    // };

    // $scope.mostWidgets = function (widget) { 
    //     return widget.type == $scope.widget.type || widget.type == 'customVisualization' ; 
    // };

}).directive("owlCarousel", ['$timeout',function($timeout) {
	return {
		restrict: 'E',
		transclude: false,
		link: function (scope) {
  			scope.initCarousel = function(element) {
  			   $timeout(function () {
      			  // provide any default options you want
      				var defaultOptions = {
      				};
      				var customOptions = scope.$eval($(element).attr('data-options'));
      				// combine the two options objects
      				for(var key in customOptions) {
      					defaultOptions[key] = customOptions[key];
      				}
      				// init carousel
      				$(element).owlCarousel(defaultOptions);
  			   },50);
  		};
		}
	};
}])
.directive('owlCarouselItem', [function() {
	return {
		restrict: 'A',
		transclude: false,
		link: function(scope, element) {
		  // wait for the last item in the ng-repeat then call init
			if(scope.$last) {
				scope.initCarousel(element.parent());
			}
		}
	};
}]).directive('widgetDirective',function(){
    return{
        restrict:'AECM',
        templateUrl:'templates/shared/mwidget.html',
        replace: true,
        scope:{
            widget: "=",
            base: "=",
        }
    } 
 });

angular.module('main').directive('aivHeader', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/shared/header.html'
    };
});

angular.module('main').directive('aivFooter', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/shared/footer.html'
    };
});

angular.module('main').directive('aivAlerts', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/shared/alert.html'
    };
});

angular.module('filters', []).filter('Filesize', function () {
		return function (size) {
			if (isNaN(size))
				size = 0;

			if (size < 1024)
				return size + ' Bytes';

			size /= 1024;

			if (size < 1024)
				return size.toFixed(2) + ' Kb';

			size /= 1024;

			if (size < 1024)
				return size.toFixed(2) + ' Mb';

			size /= 1024;

			if (size < 1024)
				return size.toFixed(2) + ' Gb';

			size /= 1024;

			return size.toFixed(2) + ' Tb';
		};
	});