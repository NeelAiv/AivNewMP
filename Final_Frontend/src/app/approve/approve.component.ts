import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SharedVarService } from '../Services/SharedVarService';
import { Observable } from 'rxjs';
import { WidgetServicesService } from '../Services/widget-services.service';
import { data } from 'jquery';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})
export class ApproveComponent implements OnInit {

  allWidgets: any[] = [];
  approvedWidgets: any[] = [];
  unapprovedWidgets: any[] = [];

  constructor(private sharedVarService: SharedVarService, private http: HttpClient, private widgetService: WidgetServicesService) {}

  ngOnInit(): void {
    // this.userRole = JSON.parse(localStorage.getItem('currentUser'))?.role;

    // this.sharedVarService.fetchWidgets(this.userRole); // Fetch widgets based on user role

    // this.sharedVarService.$widgetList.subscribe(widgets => {
    //   this.widgets = widgets;
    // });
    // this.getApprovedWidgets();
    // this.getUnapprovedWidgets();
    this.getAllWidgets();
  }

  getAllWidgets() {
  this.widgetService.getAllWidgets().subscribe((data: any) => {
    this.allWidgets = data.map(widget => ({
      ...widget,
      is_public: widget.is_public && widget.is_public.data[0] === 1 ? 1 : 0
    }));
    console.log('data:', data);

  });
}



  getApprovedWidgets() {
    this.widgetService.getApprovedWidgets().subscribe((data: any) => {
      this.approvedWidgets = data;
    });
  }

  getUnapprovedWidgets() {
    this.widgetService.getUnapprovedWidgets().subscribe((data: any) => {
      this.unapprovedWidgets = data;
    });
  }

  approveWidget(id) {
    this.widgetService.approveWidget(id).subscribe(() => {
      this.getApprovedWidgets();
      this.getUnapprovedWidgets();
    });
  }

  unapproveWidget(id) {
    this.widgetService.unapproveWidget(id).subscribe(() => {
      this.getApprovedWidgets();
      this.getUnapprovedWidgets();
    });
  }

  // toggleApproval(widget: any) {
  //   if (widget.is_public) {
  //     // Unapprove the widget
  //     this.widgetService.unapproveWidget(widget.id).subscribe(() => {
  //       widget.is_public = 0; // Update local state
  //     });
  //   } else {
  //     // Approve the widget
  //     this.widgetService.approveWidget(widget.id).subscribe(() => {
  //       widget.is_public = 1; // Update local state
  //     });
  //   }
  // }

  toggleApproval(widget) {
    const newStatus = widget.is_public ? 0 : 1;

    if (newStatus === 1) {
      this.widgetService.approveWidget(widget.id).subscribe(() => {
        widget.is_public = 1;
        console.log(`Widget ${widget.id} approved.`);
      });
    } else {
      this.widgetService.unapproveWidget(widget.id).subscribe(() => {
        widget.is_public = 0;
        console.log(`Widget ${widget.id} unapproved.`);
      });
    }
  }


}

