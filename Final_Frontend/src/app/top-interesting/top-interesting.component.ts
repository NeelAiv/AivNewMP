import { Component, OnInit } from '@angular/core';
import { SharedVarService } from '../Services/SharedVarService';
import * as categories from '../categories.json';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MathcesCategoryPipe } from '../pipes/MathcesCategoryPipe';
import { BASE_URL } from 'src/app/constants/constants';
import { WidgetServicesService } from '../Services/widget-services.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubscribeComponent } from '../subscribe/subscribe.component';


@Component({
  selector: 'app-top-interesting',
  templateUrl: './top-interesting.component.html',
  styleUrls: ['./top-interesting.component.css']
})
export class TopInterestingComponent implements OnInit {
  widgetList$ = new Observable<any>();
  
  sortType = false;
  selectedCategory = "Widgets";
  selectedSubCategory;
  baseUrl = BASE_URL;
  compCategories: any = (categories as any).default;
  widgetCategory:any =  this.compCategories.Widgets;
  tooltipOptions = {
    'placement': 'top',
    'show-delay': 200,
    'max-width':150,
    'width':100
};

    
    constructor(private sharVarService: SharedVarService,private widgetService: WidgetServicesService,private toastr: ToastrService, private modalService : NgbModal) { }

  ngOnInit(): void {
    this.widgetList$ = this.sharVarService.$widgetList.pipe(map(data => data));
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    setTimeout(() => {
      //@ts-ignore
      $(".top-interesting .owl-carousel").owlCarousel({
        items: 4,
        loop: !1,
        margin: 30,
        autoplay: !1,
        autoplayHoverPause: !0,
        singleItem: !0,
        dots: !1,
        nav: !0,
        navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
        responsive: {
          0: {
            items: 1
          },
          320: {
            items: 1
          },
          480: {
            items: 2
          },
          775: {
            items: 2
          },
          991: {
            items: 3
          },
          1170: {
            items: 4
          }
        }
      });

    }, 300);
      //@ts-ignore
    
    //@ts-ignore
    $('.top-interesting a[data-toggle="tab"]').on("shown.bs.tab", function (i) {
      
      //@ts-ignore
      $($(i.target).attr("href")).find(".owl-carousel").owlCarousel("invalidate", "width").owlCarousel("update");
    })
  }

  downloadWidget(widget) {
    this.widgetService.DownloadWidget(widget.file_path).subscribe((res: any) => {
      if (res.widget) {
        let widgetObj = widget;
        console.log(typeof widgetObj.downloaded);
        var downloadCount: number = +widgetObj.downloaded;
        widgetObj.downloaded = downloadCount + 1;
        this.widgetService.Update(widget.id, widgetObj).subscribe((updateRes: any) => {

          if (updateRes) {
            window.location.href = this.baseUrl + "/downloadWidget/" + widget.file_path;
          }
        });
        // window.location.href = this.baseUrl+"/downloadWidget/"+widget.file_path;
      } else {
        this.toastr.error(res.message, 'Failed');
      }
    });
  }

  openDownloadModal(file) {
    const modalRef = this.modalService.open(SubscribeComponent);
    modalRef.componentInstance.widget = file;
    modalRef.componentInstance.fileName = file.file_path;
  }
  tabClick(value) {
    this.selectedSubCategory = value;
  }
}
