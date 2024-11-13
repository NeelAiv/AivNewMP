import { Component } from '@angular/core';
import { WidgetServicesService } from './Services/widget-services.service';
import { WidgetService} from './widgetfun/WidgetService';
import { SharedVarService } from './Services/SharedVarService';
import { Observable, Subject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import {BnNgIdleService} from 'bn-ng-idle'
import { AuthenticationService } from './Services/authenticationService';
import { Toast, ToastrService } from 'ngx-toastr';
// import { AlertService } from './alert/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'AivMarketplace';
  user: {} = localStorage.getItem('currentUser')
  // private alertService : AlertService,
  constructor(private widgetService : WidgetServicesService,private sharVarService :SharedVarService,
    private bnIdle: BnNgIdleService,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService){}
  public widgetList$ : Observable<any>=new Observable<any>();
  currentUser;
  ngOnInit(): void {
    this.bnIdle.startWatching(1800).subscribe((isTimedOut: boolean) => {
    if(isTimedOut){
      location.reload()
      this.authenticationService.logout();
      this.toastr.success('Logged out due to inactivity','Logged out',{
        timeOut : 2000,
      });

    }
    });

    this.widgetService.GetAllWidget().subscribe(data =>{
      this.sharVarService.setWidgetList(data);
    });
    this.currentUser=(JSON.parse(localStorage.getItem('currentUser')));
    // if(this.currentUser != null && this.currentUser != {} )
    // {
    //   this.sharVarService.setUserObjectValue(this.currentUser);

    // }
    if (this.currentUser != null && Object.keys(this.currentUser).length > 0) {
      this.sharVarService.setUserObjectValue(this.currentUser);
  }
  }

}
