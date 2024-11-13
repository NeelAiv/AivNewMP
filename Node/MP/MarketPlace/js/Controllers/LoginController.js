(function () {
    'use strict';

    mpApp
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$location', 'AuthenticationService', 'FlashService'];
    function LoginController($scope, $location, AuthenticationService, FlashService) {
        $scope.dataLoading = false;
        $scope.username = '';
        $scope.password = '';
        // AuthenticationService.ClearCredentials();
        
        $scope.login = function() {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function (response) {
                if (response.data.length > 0 && response.status == 200) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $scope.dataLoading = false;
                    $scope.clear();
                    $('#btnClose').click();
                } else {
                    FlashService.Error('Username and password incorrect ..!', false);
                    $scope.dataLoading = false;
                }
            });
        };
        
        $scope.clear = function () {
            $scope.username = '';
            $scope.password = '';
        }
    }

})();