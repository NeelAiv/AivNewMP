import { Component, OnInit, ViewChild } from '@angular/core';
import { WidgetService } from '../widgetfun/WidgetService';
import { widget } from '../widgetfun/widget';
import { NgbPaginationNext } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SharedVarService } from '../Services/SharedVarService';
import { map, tap } from 'rxjs/operators';
import { BASE_URL } from 'src/app/constants/constants';

@Component({
  selector: 'app-new-added',
  templateUrl: './new-added.component.html',
  styleUrls: ['./new-added.component.css']
})

export class NewAddedComponent implements OnInit {

  constructor(private widgetService: WidgetService,private sharVarService : SharedVarService ) { }

  SlideOptions = { items: 3, dots: true, nav: true };
  CarouselOptions = { items: 6, dots: true, nav: true };
  baseUrl=BASE_URL;
  widgetList$ = new Observable<any>() ;

  ngOnInit(): void {
    this.widgetList$ = this.sharVarService.$widgetList.pipe(tap(data => {
      if(data.length >0) {
        this.carousel();
      }
    }),
    map(data => data));
    // this.carousel();
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
    });
  }

}
