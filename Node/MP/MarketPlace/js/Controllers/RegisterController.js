(function () {
    'use strict';

    mpApp
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$scope','UserService', '$location', '$rootScope', 'FlashService'];
    function RegisterController($scope, UserService, $location, $rootScope, FlashService) {
        $scope.dataLoading = false;
        $scope.user = {};
        $scope.register = function() {
            $scope.dataLoading = true;
            $scope.user['phone_number'] = null;
            UserService.Create($scope.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        $scope.user = {};
                        $scope.dataLoading = false;
                        $location.path('/');
                    } else {
                        FlashService.Error(response.message);
                        $scope.dataLoading = false;
                    }
                });
        }
    }

})();