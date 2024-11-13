import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/app/constants/constants';

@Injectable()
export class UserService {
    BASE_URL;
    constructor(private http: HttpClient) {
        this.BASE_URL = BASE_URL;
        }

    Create(user) {
        return this.http.post(this.BASE_URL+'/createUser', user);
    }

    updateUser(user){
        console.log('Service function  : ',user);
        return this.http.post(this.BASE_URL+'/updateUser',user);
    }

    GetById(id) {
        return this.http.get(this.BASE_URL+'/getById/' + id);
    }

    ForgotPassword(email) {
        return this.http.get(this.BASE_URL+'/forgetpassword/' + email);
    }

}
    // private functions
    // handleSuccess(res) {
    //     return res.data;
    // }

    // handleError(error) {
    //     return function () {
    //         return { success: false, message: error };
    //     };
    // }

    //   GetAll() {
    //     return this.http.get(this.BASE_URL+'/getAll').then(handleSuccess, handleError('Error getting all users'));
    //     }
    // GetById(id) {
    //     return this.http.get(this.BASE_URL+'/getById/' + id).then(handleSuccess, handleError('Error getting user by id'));
    // }
    // GetByUsername(username) {
    //     return this.http.post(this.BASE_URL+'/user/', {'username' : username } ).then(handleSuccess, handleError('Error getting user by username'));
    // }

    // Update(user) {
    //     return this.http.put(this.BASE_URL+'/updateUser/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
    // }
    // Delete(id) {
    //     return this.http.delete(this.BASE_URL+'/deleteUser/' + id).then(handleSuccess, handleError('Error deleting user'));
    // }
    // ForgotPassword(email) {
    //     return this.http.get(this.BASE_URL+'/forgetpassword/' + email).then(handleSuccess, handleError('Error while send email'));
    // }
    // UploadWidget(formData) {
    //     return this.http.post(this.BASE_URL+'/uploadFile/', formData, {
    //         transformRequest: angular.identity,
    //         headers: {'Content-Type': undefined}
    //     }).then(handleSuccess, handleError('Error while send email'));
    // }
    // EditWidget(id, formData) {
    //     return this.http.post(this.BASE_URL+'/uploadFile/' + id, formData, {
    //         transformRequest: angular.identity,
    //         headers: {'Content-Type': undefined}
    //     }).then(handleSuccess, handleError('Error while send email'));
    // }
    // UploadImages(email) {
    //     return this.http.get(this.BASE_URL+'/forgetpassword/' + email).then(handleSuccess, handleError('Error while send email'));
    // }
