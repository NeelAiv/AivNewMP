import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { BASE_URL } from 'src/app/constants/constants';

@Injectable()
export class CommentService {
    BASE_URL;
    private comments: BehaviorSubject<boolean>;
    constructor(private http: HttpClient) {
            this.BASE_URL = BASE_URL;
            this.comments = new BehaviorSubject<boolean>(false);
    }

    doComment(comment)
    {
        return this.http.post(this.BASE_URL+'/makeComment',comment);
    }
    deleteComment(comment)
    {
        return this.http.post(this.BASE_URL+'/deleteComment',comment);
    }

    getComments(widgetId){
        return this.http.get(this.BASE_URL+'/comment/'+widgetId);
    }

    

}