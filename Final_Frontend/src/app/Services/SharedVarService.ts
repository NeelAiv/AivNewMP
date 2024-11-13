import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { WidgetServicesService } from './widget-services.service';

@Injectable({
  providedIn: 'root'
})
export class SharedVarService {
  // private isLogin: BehaviorSubject<boolean>;
  private isLogin = new BehaviorSubject<boolean>(false);
  private userObject = new BehaviorSubject({});
  $user : Observable<any> = this.userObject.asObservable();
  // private widgetList : BehaviorSubject<any>;
  private widgetData = new BehaviorSubject([]);
  $widgetList : Observable<any> = this.widgetData.asObservable();

  private comments = new BehaviorSubject([]);
  $comments : Observable<any> = this.comments.asObservable();

  constructor(private widgetService : WidgetServicesService) { }

  setValue(newValue): void {
    this.isLogin.next(newValue);
  }

  getValue(): Observable<boolean> {
    return this.isLogin.asObservable();
  }

  setUserObjectValue(object)
  {
    if(object != null)
    {
      localStorage.clear();
      localStorage.setItem('currentUser', JSON.stringify(object));
      this.userObject.next(object);
    }
    else{
      localStorage.clear();
      this.userObject.next(null);
    }

  }


  setWidgetList(widgetList){
    this.widgetData.next(widgetList);
  }


  setWidgetComments(comments){
    console.log('this.comments$ :---> ',this.$comments)
    this.comments.next(comments);
  }

  // getWidgetList() : Observable<any>{
  //  return this.WidgetList.asObservable();
  // }


}
