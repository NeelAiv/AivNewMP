import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedVarService } from '../Services/SharedVarService';
import { Observable } from 'rxjs';
import { WidgetServicesService } from '../Services/widget-services.service';
import { data } from 'jquery';
import { BASE_URL } from '../constants/constants';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})
export class ApproveComponent implements OnInit {
  @ViewChild('deleteConfirmModal') deleteConfirmModal: any;

  allWidgets: any[] = [];
  approvedWidgets: any[] = [];
  unapprovedWidgets: any[] = [];
  baseUrl = BASE_URL;
  widgetToDelete: any;

  constructor(private sharedVarService: SharedVarService, private http: HttpClient, private widgetService: WidgetServicesService, private modalService: NgbModal) {}

  ngOnInit(): void {
    // this.userRole = JSON.parse(localStorage.getItem('currentUser'))?.role;

    // this.sharedVarService.fetchWidgets(this.userRole); // Fetch widgets based on user role

    // this.sharedVarService.$widgetList.subscribe(widgets => {
    //   this.widgets = widgets;
    // });
    this.getApprovedWidgets();
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
        this.approvedWidgets = this.approvedWidgets.filter((w) => w.id !== widget.id);
        this.widgetService.triggerWidgetRefresh();
      });
    } else {
      this.widgetService.unapproveWidget(widget.id).subscribe(() => {
        widget.is_public = 0;
        console.log(`Widget ${widget.id} unapproved.`);
      });
    }
  }

  openDeleteConfirmation(widget: any) {
    this.widgetToDelete = widget;
    this.modalService.open(this.deleteConfirmModal, {backdrop: false, keyboard: false, centered: true, windowClass: 'fade-in-modal'}).result.then(
      (result) => {
        if (result === 'Delete click') {
          this.deleteComponent(this.widgetToDelete.id);
        }
        document.body.classList.remove('modal-open');
        const modalBackdrops = document.getElementsByClassName('modal-backdrop');
        while(modalBackdrops.length > 0) {
          modalBackdrops[0].remove();
        }
      },
      (reason) => {
        document.body.classList.remove('modal-open');
        const modalBackdrops = document.getElementsByClassName('modal-backdrop');
        while(modalBackdrops.length > 0) {
          modalBackdrops[0].remove();
        }
      }
    );
  }

  deleteComponent(id: string) {
    this.widgetService.Delete(id).subscribe({
      next: () => {
        this.getAllWidgets(); // Refresh the list after deletion
        this.modalService.dismissAll(); // Ensure modal is closed
        // Clear any remaining backdrops
        document.body.classList.remove('modal-open');
        const modalBackdrops = document.getElementsByClassName('modal-backdrop');
        while(modalBackdrops.length > 0) {
          modalBackdrops[0].remove();
        }
      },
      error: (error) => {
        console.error('Error deleting widget:', error);
        this.modalService.dismissAll(); // Ensure modal is closed even on error
        // Clear any remaining backdrops
        document.body.classList.remove('modal-open');
        const modalBackdrops = document.getElementsByClassName('modal-backdrop');
        while(modalBackdrops.length > 0) {
          modalBackdrops[0].remove();
        }
      },
    });
  }
  private cleanupModalArtifacts() {
    document.body.classList.remove('modal-open');
    const modalBackdrops = document.getElementsByClassName('modal-backdrop');
    while(modalBackdrops.length > 0) {
      modalBackdrops[0].remove();
    }
  }

}

