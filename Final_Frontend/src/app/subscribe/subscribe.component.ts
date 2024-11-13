import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { SubscriptionService } from '../Services/subscriptionService';
import { ToastrService } from 'ngx-toastr';
import { WidgetServicesService } from '../Services/widget-services.service';
import { BASE_URL } from '../constants/constants';


@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private subscriptionService: SubscriptionService,
    private toastr: ToastrService,
    private widgetService: WidgetServicesService
  ) { }
  requestObj: IrequestObject = requestObject;
  @Input() public widget;
  // @Input() public fileName;

  ngOnInit(): void {
    console.log(this.widget.file_path);
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  subscribeForDownload() {
    this.subscriptionService.subscribeCustomer(this.requestObj).subscribe((data: any) => {
      if (data.success == true) {
        this.widgetService.DownloadWidget(this.widget.file_path).subscribe((res: any) => {
          if (res.widget) {
            let widgetObj = this.widget;
            console.log(typeof widgetObj.downloaded);
            var downloadCount: number = +widgetObj.downloaded;
            widgetObj.downloaded = downloadCount + 1;
            this.widgetService.Update(this.widget.id, this.widget).subscribe((updateRes: any) => {
              if (updateRes) {
                window.location.href = BASE_URL + "/downloadWidget/" + this.widget.file_path;
                this.toastr.info("Download started");
                this.closeModal();
              }
            });
          } else {
            this.toastr.error(res.message, 'Failed');
          }
        });
      }
    });
    // console.log(this.requestObj.email);
  }

}

export interface IrequestObject {
  email: string;
}

export const requestObject = {
  email: ''
}