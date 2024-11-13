import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap'
import { ToastrService } from 'ngx-toastr';
import { WidgetServicesService } from '../Services/widget-services.service';


@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.css']
})

export class DialogConfirmationComponent implements OnInit {
  @Input() title: string = "Confirm";
  @Input() message: string = "Are you sure want to delete?";
  @Input() btnOkText: string = "Confirm";
  @Input() btnCancelText: string = "Cancel";
@Input() id :number = 0;
  constructor(
    private modalService: NgbActiveModal,
    private widgetService: WidgetServicesService,
    private router: Router,
    private tostr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  
  public decline() {
    debugger;

    this.modalService.dismiss({data:false});
  }

  public accept() {
    debugger;
    if (true) {
      debugger;
      this.widgetService.Delete(this.id).subscribe((data: any) => {
        if (data.success == true) {
          this.tostr.success('Component deleted Successfully', 'Success');
          this.router.navigate(['/my-profile']);
          // this.getWidgetOfUser();
        }
        else {
          this.tostr.error('Delete failed', 'Error');
        }
      });
    }
    this.modalService.close();


  }


}
