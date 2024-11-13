import { Component, OnInit } from '@angular/core';
import { SharedVarService } from '../Services/SharedVarService';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BASE_URL } from 'src/app/constants/constants';
import { WidgetServicesService } from '../Services/widget-services.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.css']
})
export class OtherComponent implements OnInit {

  constructor(
    private sharVarService : SharedVarService,
    private widgetService : WidgetServicesService,
    private toastr : ToastrService ) { }

  SlideOptions = { items: 3, dots: true, nav: true };
  CarouselOptions = { items: 6, dots: true, nav: true };
  baseUrl=BASE_URL;
  widgetList$ = new Observable<any>() ;

  ngOnInit(): void {
    this.widgetList$ = this.sharVarService.$widgetList.pipe(map(data => data));
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

  downloadWidget(widget){
    this.widgetService.DownloadWidget(widget.file_path).subscribe((res: any) => {
      if(res.widget){
        let widgetObj=  widget; 
        console.log(typeof widgetObj.downloaded);
        var downloadCount: number= +widgetObj.downloaded ;
        widgetObj.downloaded = downloadCount+1;
        this.widgetService.Update(widget.id,widgetObj).subscribe((updateRes: any) => {
      
        if(updateRes){
          window.location.href = this.baseUrl+"/downloadWidget/"+widget.file_path;
        }
        });
        // window.location.href = this.baseUrl+"/downloadWidget/"+widget.file_path;
      }else{
          this.toastr.error(res.message,'Failed');
      }
    });
    // this.widgetService.DownloadWidget(widget.file_path).subscribe((res: any) => {
    //   console.log('data== : ',this.baseUrl);
    //   if(res.widget){
    //     window.location.href = this.baseUrl+"/downloadWidget/"+widget.file_path;;
    //   }else{
    //       this.toastr.error(res.message,'Failed');
    //   }
    // });
  }
}
