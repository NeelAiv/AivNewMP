mpApp.controller("WidgetDetailsController", ['$scope', '$routeParams', 'WidgetService', '$timeout', 'AuthenticationService', '$location','BASE_URL','$rootScope', 'UserService',
    function ($scope, $routeParams, WidgetService, $timeout, AuthenticationService, $location, BASE_URL, $rootScope, UserService) {

        $scope.widgetId = $routeParams.id;
        $scope.widget = {};
        $scope.widgets = [];
        $scope.widgetComments = [];
        $scope.rate = 0;
        $scope.baseUrl = BASE_URL;
        $scope.comment = '';
        $scope.isAdmin = false;
        $scope.video_url = "https://www.youtube.com/embed/hhi_jaLn_LI";
        var stars = ""
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
        $scope.mScrollinit = function() {
            $(".wdtl_commentinner_listings").mCustomScrollbar({
                setHeight:350,
                theme:"dark",
            });
        }
        $scope.videoInit = function (x){
            document.getElementsByTagName('iframe')[0].src = x;
        }
        $scope.galleryInit = function (){
            $(".aiv_widg_gallerydiv").mCustomScrollbar({
                setHeight:190,
                theme:"dark",
            });
            $('[data-fancybox="aivwidg_images"]').fancybox({
                protect: true,
                buttons: [                       
                "close"
                ],
            });
        }

        $scope.starRating = [{ val: 1, rating: 0 }, { val: 2, rating: 0 }, { val: 3, rating: 0 }, { val: 4, rating: 0 }, { val: 5, rating: 0 }];

        $scope.user;
        $scope.init = function(){
            UserService.GetByUsername($rootScope.globals.currentUser).then(function (user) {
                $scope.user = user[0];
            });

            WidgetService.GetAllComments($scope.widgetId).then(function (widgetComments) {
                $scope.widgetComments = widgetComments;
            });

        }
        $scope.init();

        $scope.addStarRating = function (index) {
            for (var i = index; i >= 0; i--) {
                $scope.starRating[i].rating = 1;
            }
            for (var j = index + 1; j < 5; j++) {
                $scope.starRating[j].rating = 0;
            }
            $scope.rate = index + 1;
        };

        $scope.getWidgetDetails = function () {
            WidgetService.GetWidgetById($scope.widgetId).then(function (data) {
                $scope.widget = data[0];
            });
        }
        $scope.getWidgetDetails();

        $scope.getWidgets = function () {
            WidgetService.GetAllWidget().then(function successCallback(data) {
                $scope.widgets = [];
                $scope.widgets = data;
            }, function errorCallback(response) {

            });
        }

        //get All new Widgets;
        $scope.getWidgets();

        $scope.downloadWidget = function () {
            WidgetService.GetWidgetJson($scope.widgetId).then(function (data) {

            });
        }

        $scope.makeComment = function (comment) {
            var c = { 'id':$scope.user.id, 'widgetid': $scope.widgetId, 'comment': comment, 'rate': $scope.rate };
            WidgetService.MakeComment(c).then(function (data) {
                $scope.clear();
            });
        }

        $scope.close = function () {
            $('#cmntcollapsediv').collapse('hide');
        }


        $scope.clear = function () {
            $scope.rate = 0;
            $scope.comment = '';
            $('#cmntcollapsediv').collapse('hide');
        }

        $scope.canEdit = function () {
            AuthenticationService.IsUserCan()
                .then(function (is) {
                    if (is) {
                        $scope.isAdmin = true;
                    } else {
                        $scope.isAdmin = false;
                    }
                });
        }

        $scope.canEdit();

        $scope.goNext = function () {
            $location.path('/upload/' + $scope.widgetId);
        }

        $scope.deleteWidget = function(){
            if($scope.widgetId){
                WidgetService.Delete($scope.widgetId).then(function (data) {
                    if(data){
                        $location.path('/widgets/');
                    }
                });
            }
        }

        $scope.otherWidgets = function (widget) { 
            return widget.type == $scope.widget.type || widget.type == 'customVisualization' ; 
        };

    }]);