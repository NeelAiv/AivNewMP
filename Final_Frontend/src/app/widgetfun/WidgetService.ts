import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from "rxjs";
import { widget} from '../widgetfun/widget'
@Injectable()
export class WidgetService{
    
    widgetData = new BehaviorSubject([]);
    widgetList : Observable<any> = this.widgetData.asObservable();
    // widgetData :  widget[];
    constructor(){
      };

    setWidgetData(widgetDataList){
        this.widgetData.next(widgetDataList);
    }  

}