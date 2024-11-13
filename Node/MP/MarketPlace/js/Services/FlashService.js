(function () {
    'use strict';

    mpApp
        .factory('FlashService', FlashService);

    FlashService.$inject = ['$rootScope', '$timeout'];
    function FlashService($rootScope, $timeout) {
        var service = {};

        service.Success = Success;
        service.Error = Error;
        service.Warn = Warn;

        initService();

        return service;

        function initService() {
            $rootScope.$on('$locationChangeStart', function () {
                clearFlashMessage();
            });

            function clearFlashMessage() {
                var flash = $rootScope.flash;
                if (flash) {
                    if (!flash.keepAfterLocationChange) {
                        delete $rootScope.flash;
                    } else {
                        // only keep for a single location change
                        flash.keepAfterLocationChange = false;
                    }
                }
            }
        }

        function Success(message, keepAfterLocationChange) {
            $rootScope.flash = {
                message: message,
                type: 'success', 
                keepAfterLocationChange: keepAfterLocationChange
            };
            $timeout(function(){
                delete $rootScope.flash;
            }, 5000);
        }

        function Error(message, keepAfterLocationChange) {
            $rootScope.flash = {
                message: message,
                type: 'error',
                keepAfterLocationChange: keepAfterLocationChange
            };
            $timeout(function(){
               delete $rootScope.flash; 
            }, 5000);
        }

        function Warn(message, keepAfterLocationChange) {
            $rootScope.flash = {
                message: message,
                type: 'warn',
                keepAfterLocationChange: keepAfterLocationChange
            };
            $timeout(function(){
               delete $rootScope.flash; 
            }, 5000);
        }
    }

})();