import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  BASE_URL_DOWNLOAD = BASE_URL+"/downloadWidget/";
  BASE_URL = BASE_URL;
  constructor(private http: HttpClient) { }


  subscribeCustomer(emailObject){
    return this.http.post(this.BASE_URL + '/subscribe', emailObject);

  }

  downloadFile(filename): any {
    return this.http.get(this.BASE_URL_DOWNLOAD+filename, {responseType: 'blob'});
  }
 
}