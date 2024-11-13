(function () {
    'use strict';

    mpApp
        .factory('UserService', UserService);

    UserService.$inject = ['$http', 'BASE_URL'];
    function UserService($http, BASE_URL) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.ForgotPassword = ForgotPassword;
        service.UploadWidget = UploadWidget;
        service.EditWidget = EditWidget;
        service.UploadImages = UploadImages;

        return service;

        function GetAll() {
            return $http.get(BASE_URL+'/getAll').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            return $http.get(BASE_URL+'/getById/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(username) {
            return $http.post(BASE_URL+'/user/', {'username' : username } ).then(handleSuccess, handleError('Error getting user by username'));
        }

        function Create(user) {
            return $http.post(BASE_URL+'/createUser', user).then(handleSuccess, handleError('Error creating user'));
        }

        function Update(user) {
            return $http.put(BASE_URL+'/updateUser/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete(BASE_URL+'/deleteUser/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        function ForgotPassword(email) {
            return $http.get(BASE_URL+'/forgetpassword/' + email).then(handleSuccess, handleError('Error while send email'));
        }

        function UploadWidget(formData) {
            return $http.post(BASE_URL+'/uploadFile/', formData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(handleSuccess, handleError('Error while send email'));
        }

        function EditWidget(id, formData) {
            return $http.post(BASE_URL+'/uploadFile/' + id, formData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(handleSuccess, handleError('Error while send email'));
        }

        function UploadImages(email) {
            return $http.get(BASE_URL+'/forgetpassword/' + email).then(handleSuccess, handleError('Error while send email'));
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();