import { Component, OnInit } from '@angular/core';
import { WidgetService } from '../widgetfun/WidgetService';
import { widget } from '../widgetfun/widget';
import { SharedVarService } from '../Services/SharedVarService';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/constants/constants';

@Component({
  selector: 'app-most-downloaded',
  templateUrl: './most-downloaded.component.html',
  styleUrls: ['./most-downloaded.component.css']
})
export class MostDownloadedComponent implements OnInit {
  objectList = [];
  SlideOptions = { items: 3, dots: true, nav: true };
  CarouselOptions = { items: 6, dots: true, nav: true };
  baseUrl=BASE_URL;
;
  constructor(private widgetService: WidgetService,private sharVarService : SharedVarService) { }
  widgetList$ = new Observable<any>() ;
  ngOnInit(): void {
    this.widgetList$ = this.sharVarService.$widgetList.pipe(map(data => data));
    
    // this.widgetList$ = this.sharVarService.$widgetList.pipe(tap(data =>{
    //   console.log(data);
    // }),map(data => data));

    // this.widgetService.getWidgetData().subscribe((widgetData: widget[]) => {
    //   return this.objectList = widgetData;
    // });
    console.log(this.objectList);
    this.carousel();
  }

  carousel(){
    setTimeout(() => {
      // @ts-ignore
      $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 30,
        autoplay: true,
        responsiveClass: true,
        responsive: {
          0: {
            items: 1,
            nav: true
          },
          600: {
            items: 3,
            nav: false
          },
          1000: {
            items: 4,
            nav: true,
            loop: true
          }
        }
      });
    }, 2000);
  }

}
