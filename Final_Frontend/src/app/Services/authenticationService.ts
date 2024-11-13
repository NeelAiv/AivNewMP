import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SharedVarService} from './SharedVarService'
import { User } from '../model';
import { BASE_URL } from 'src/app/constants/constants';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    BASE_URL;
    constructor(private http: HttpClient,private sharVarService : SharedVarService) {
        this.BASE_URL = BASE_URL;
    }


    //   login(username: string, password: string) {
    // return this.http.post<any>(this.BASE_URL+`/authenticate`, { username, password })

    login(username: string, password: string) {
        return this.http.post<any>(this.BASE_URL+`/authenticate`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    this.sharVarService.setUserObjectValue(user);
                }
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.sharVarService.setUserObjectValue({});
    }
}