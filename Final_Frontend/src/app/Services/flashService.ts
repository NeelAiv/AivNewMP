import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FlashService {
    constructor(private http : HttpClient) { }
   
    error(msg){
        console.log(msg);
    }
    success(msg){
        console.log(msg);
    }
}