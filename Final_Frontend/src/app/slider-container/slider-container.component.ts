import { Component, OnInit } from '@angular/core';
import * as slidercategories from '../slider-categories.json';
import { Observable } from 'rxjs';
import { WidgetService } from '../widgetfun/WidgetService';
import { SharedVarService } from '../Services/SharedVarService';
import { tap, map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubscribeComponent } from '../subscribe/subscribe.component';
// import { CreateAccountComponent } from '../create-account/create-account.component';
import { BASE_URL } from 'src/app/constants/constants';


@Component({
  selector: 'app-slider-container',
  templateUrl: './slider-container.component.html',
  styleUrls: ['./slider-container.component.css']
})
export class SliderContainerComponent implements OnInit {
  sliderCategories: any = (slidercategories as any).default;
  SlideOptions = { items: 3, dots: true, nav: true };
  CarouselOptions = { items: 6, dots: true, nav: true };
  baseUrl = BASE_URL;
  widgetList$ = new Observable<any>();
  public user$: Observable<any> = new Observable<any>();
  public currentUser

  constructor(private sharVarService: SharedVarService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    console.log(this.currentUser)
    this.widgetList$ = this.sharVarService.$widgetList.pipe(tap(data => {
      // console.log('this.widgetList ==> ',this.widgetList$)
      if (data.length > 0) {
        // this.carousel();
      }
    }),
      map(data => data));

    this.user$ = this.sharVarService.$user.pipe(tap(data => {
    }), map(data => data));
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    //Revolution slider
    this.carousel();
    //Revoultion slider
  }
  carousel() {
    setTimeout(() => {
      // @ts-ignore
      // $('.owl-carousel').owlCarousel({
      //   loop: false,
      //   margin: 30,
      //   autoplay: true,
      //   responsiveClass: true,
      //   responsive: {
      //     0: {
      //       items: 1,
      //       nav: true
      //     },
      //     600: {
      //       items: 3,
      //       nav: false
      //     },
      //     1000: {
      //       items: 4,
      //       nav: true,
      //       // loop: true
      //     }
      //   }
      // });

      // @ts-ignore
      $("#rev_slider_1078_1").show().revolution(
        {
          sliderType: "standard",
          jsFileLocation: "../assets/plugins/rev_slider/js/",
          sliderLayout: "auto",
          dottedOverlay: "none",
          delay: 5e3,
          touchenabled: "on",
          swipe_velocity: .7,
          swipe_min_touches: 1,
          swipe_max_touches: 1,
          drag_block_vertical: !1,
          keyboardNavigation: "on",
          fullWidth: "off",
          fullScreen: "off",
          navigation: {
            keyboardNavigation: "off",
            keyboard_direction: "horizontal",
            mouseScrollNavigation: "off",
            mouseScrollReverse: "default",
            onHoverStop: "off",
            arrows: {
              style: "zeus",
              enable: !0,
              hide_onmobile: !0,
              hide_under: 1025,
              hide_onleave: !1,
              tmp: "",
              left: {
                h_align: "left",
                v_align: "center",
                h_offset: 20,
                v_offset: 0
              },
              right: {
                h_align: "right",
                v_align: "center",
                h_offset: 20,
                v_offset: 0
              }
            },
            bullets: {
              enable: !0,
              hide_onmobile: !1,
              hide_over: 1025,
              style: "metis",
              hide_onleave: !1,
              direction: "horizontal",
              h_align: "center",
              v_align: "bottom",
              h_offset: 0,
              v_offset: 20,
              space: 10,
              tmp: ""
            }
          },
          viewPort: {
            enable: !0,
            outof: "pause",
            visible_area: "80%",
            presize: !1
          },
          hideTimerBar: "on",
          responsiveLevels: [1240, 1024, 778, 480],
          visibilityLevels: [1240, 1024, 778, 480],
          gridwidth: [1240, 1024, 778, 480],
          gridheight: [600, 600, 500, 400],
          lazyType: "smart",
          shadow: 0,
          stopLoop: "off",
          stopAfterLoops: -1,
          stopAtSlide: -1,
          shuffle: "off",
          autoHeight: "off",
          hideThumbsOnMobile: "off",
          hideBulletsOnMobile: "off",
          hideArrowsOnMobile: "off",
          hideSliderAtLimit: 0,
          hideCaptionAtLimit: 0,
          hideAllCaptionAtLilmit: 0,
          debugMode: !1,
          fallbacks: {
            simplifyAll: "off",
            nextSlideOnWindowFocus: "off",
            disableFocusListener: !1
          }
        })


    });
  }

  openDownloadModal(file) {
    const modalRef = this.modalService.open(SubscribeComponent);
    modalRef.componentInstance.widget = file;
    modalRef.componentInstance.fileName = file.file_path;
  }

}
