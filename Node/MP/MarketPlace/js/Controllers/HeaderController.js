(function () {
    'use strict';

    mpApp
        .controller('HeaderController', HeaderController);
    HeaderController.$inject = ['$scope', '$location', 'AuthenticationService', '$rootScope', 'UserService','$timeout'];
    function HeaderController($scope, $location, AuthenticationService, $rootScope, UserService, $timeout) {
        $scope.user = null;
        $scope.isLogin = false;
        $scope.forget_data  = { emailId: '', responseData : null};
        initController();

        function initController() {
            //AuthenticationService.ClearCredentials();
            loadCurrentUser();
        }

        function loadCurrentUser() {
            if ($rootScope.globals) {
                if ($rootScope.globals.currentUser) {
                    UserService.GetByUsername($rootScope.globals.currentUser.username)
                        .then(function (data) {
                            $scope.user = data[0];
                            $scope.isLogin = true;
                        });
                } else {
                    $scope.user = null;
                    $scope.isLogin = false;
                }
            }
        }

        $scope.hasUser = function () {
            if ($scope.user == null) {
                loadCurrentUser();
                return $scope.isLogin;
            } else {
                return true;
            }
        }

        $scope.$watch('$root.globals', function() {
            $scope.hasUser();
        }, true);

        $scope.$watch('user', function(value) {
            if(value){
                $scope.user = value;
                $scope.isLogin = true;
            }
        });

        $scope.logout = function () {
            AuthenticationService.ClearCredentials();
            $scope.user = null;
            $scope.isLogin = false;
            $location.path('/');
        }

        $scope.openModel = function () {
            $('#respheader_menu').collapse();
        }

        // Active tab
        $scope.active = 1;
        $scope.selectTab = function (value) {
            $scope.active = value;
        }

        $scope.isActive = function (value) {
            if ($scope.active == value) {
                return true;
            }
            else {
                return false;
            }
        }
        
        $scope.sendEmail = function(){
            if($scope.forget_data.emailId != ""){
                UserService.ForgotPassword($scope.forget_data.emailId).then(function(res) {
                    $scope.forget_data.responseData = {'response': res.response, 'accepted': res.accepted, 'rejected': res.rejected};
                    $timeout(function(){
                        $scope.forget_data.responseData = null;
                        $scope.forget_data.emailId = '';
                    }, 3000);
                });
            }
        }

        $(".lg_fpasslnk").click(function(){
            $(".mlogindiv_box").hide();
            $(".mforgotpass_box").show();
        });
    
        $(".lg_loginlnk").click(function(){
            $(".mforgotpass_box").hide();
            $(".mlogindiv_box").show();
        });

    }

})();