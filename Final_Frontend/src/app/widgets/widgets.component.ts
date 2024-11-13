import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WidgetServicesService } from '../Services/widget-services.service';
import * as categories from '../categories.json';
import { MathcesCategoryPipe } from '../pipes/MathcesCategoryPipe';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SharedVarService } from '../Services/SharedVarService';
import { SubscriptionService } from '../Services/subscriptionService';
import { ToastrService } from 'ngx-toastr';
import { BASE_URL } from 'src/app/constants/constants';
// import { data } from 'jquery';


@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.css']
})
export class WidgetsComponent implements OnInit {
  compCategories: any = (categories as any).default;
  srtName;
  srtPrice = "free";
  sortType = false;
  currentUser
  widgetType;
  selectedCategory;
  selectedSubCategory;
  widgetList$ = new Observable<any>();
  baseUrl = BASE_URL;
  AllWidgets: any = [];
  tooltipOptions = {
    'placement': 'top',
    'show-delay': 200,
    'max-width': 150,
    'width': 100
  };
  constructor(private route: ActivatedRoute,
    private router: Router,
    private sharVarService: SharedVarService,
    private widgetService: WidgetServicesService,
    private subscriptionService: SubscriptionService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    console.log(this.currentUser)
    this.widgetList$ = this.sharVarService.$widgetList.pipe(map(data => data));
    // this.widgetService.GetAllWidget().subscribe(data => {
    //   this.AllWidgets=data;
    //   console.log(this.AllWidgets);
    // });

    this.route.paramMap.subscribe(params => {
      this.selectedCategory = params.get("catType");
      this.selectedSubCategory = params.get("subCatType");
    })
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    //@ts-ignore
    $("ul.jq-accordian > li:has( > ul ) > a").append("<span class='jq-accordionIcon'></span>");
    //@ts-ignore
    $("ul.jq-accordian > li:has( > ul ) > a").attr("href", "javascript:void(0)");
    //@ts-ignore
    $("ul.jq-accordian li ul").hide();
    //@ts-ignore
    var c = $("ul.jq-accordian li a"), u = $("ul.jq-accordian > li > a");
    c.on("click", function (i) {
      //@ts-ignore
      if ($(i.target).parents(".children").length > 0) {

      }
      else {

        c.each(function (i) {
          //@ts-ignore
          $(this).next().is("ul") && $(this).next().is(":visible") && $(this).next().slideUp()
        });
      }
      //@ts-ignore
      let isIcon = $(i.target).hasClass('jq-accordionIcon');
      if (isIcon) {
        //@ts-ignore
        (i = $(i.target).parents("a")).next().is("ul") && i.next().is(":visible") ? i.next().slideUp() : i.next().slideDown()

      }
      else {
        //@ts-ignore
        (i = $(i.target)).next().is("ul") && i.next().is(":visible") ? i.next().slideUp() : i.next().slideDown()
      }
    });
    c.on("click", function (i) {
      //@ts-ignore
      $(this).hasClass("is-active") ? $(this).removeClass("is-active") : (u.not(this).removeClass("is-active"),
        //@ts-ignore
        $(this).addClass("is-active"))
    });
  }
  openComponent(catValue) {
    this.selectedCategory = catValue;
    this.router.navigate(['/component/', catValue]);
  }

  openComponentWithSub(catValue, subCatValue) {
    this.selectedCategory = catValue;
    this.selectedSubCategory = subCatValue;
    this.router.navigate(['/component/', catValue, subCatValue]);
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

}
