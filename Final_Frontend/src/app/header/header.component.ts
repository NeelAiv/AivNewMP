import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateAccountComponent } from '../create-account/create-account.component';
import { AuthenticationService } from '../Services/authenticationService';
import { SharedVarService } from '../Services/SharedVarService';
import * as categories from '../categories.json';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin;
  activeTab=1;
  compCategories: any = (categories as any).default;


  public user$ : Observable<any> = new Observable<any>();
  constructor(private modalService : NgbModal,
    private authenticationService : AuthenticationService,
    private sharedService : SharedVarService,
    private router: Router,
    private toastr : ToastrService) { }

  ngOnInit(): void {
    this.setData();
    // this.sharedService.getValue().subscribe(data =>  this.isLogin = data);
    this.user$ = this.sharedService.$user.pipe(
      tap(data => {
        console.log("User data:", data);
    }),
    map(data => data));


  }
ngAfterViewInit(): void {
  //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  //Add 'implements AfterViewInit' to the class.
  //navigation menu
     // @ts-ignore
    $(".navigation-menu > ul > li:has( > ul)").addClass("menu-dropdown-icon"),
      // @ts-ignore
        $(".navigation-menu > ul > li.menu-dropdown-icon").append('<div class="dropworn-arrow"></div>'),
         // @ts-ignore
        $(".navigation-menu > ul > li > ul:not(:has(ul))").addClass("normal-sub"),
         // @ts-ignore
        $(".navigation-menu > ul").before('<a href="javascript:;" class="menu-mobile">Menu</a>');
         // @ts-ignore
        var a = $(".navigation-menu > ul > li")
         // @ts-ignore
          , t = $(".menu-mobile");
        a.on("mousehover moseleave", function(event) {
          event.preventDefault();
           // @ts-ignore
             $(window).width() > parseInt(979) && (console.log("a.hover"),$(this).children(".js-nav-dropdown").stop(!0, !1).fadeToggle(150),
              // @ts-ignore
            $(this).children(".dropworn-arrow").stop(!0, !1).fadeToggle(150))
        }),
        a.on("click", function(event) {
          event.preventDefault();
           // @ts-ignore
             $(window).width() <= parseInt(979) && (console.log("a.click"), $(this).children(".js-nav-dropdown").fadeToggle(150),
              // @ts-ignore
            $(this).children(".dropworn-arrow").hide())
        }),
        t.on("click", function(i) {
           // @ts-ignore
            $(".navigation-menu > ul").toggleClass("show-on-mobile"),
             // @ts-ignore
             $(window).preventDefault()
        })
}
  menuMouseEnter($event){

    let element = $event.target;
     // @ts-ignore
     $(window).width() > parseInt(979) && ($(element).children(".js-nav-dropdown").stop(!0, !1).fadeToggle(150),
     // @ts-ignore
    $(element).children(".dropworn-arrow").stop(!0, !1).fadeToggle(150),
    $event.preventDefault())
  }
  openComponent(catValue,event){
        // @ts-ignore
    if(!$(event.target).parents(".js-nav-dropdown").length > 0){
    this.router.navigate(['/component/', catValue]);
    }
  }

  openComponentWithSub(catValue,subCatValue,event){
  event.preventDefault();
    this.router.navigate(['/component/', catValue,subCatValue]);
  }

  login_userName : string;
  object : any ={};

  openModal() {
    this.modalService.open(CreateAccountComponent,{size:'lg',backdrop:false});
  }

  closeModal()
  {
    this.modalService.dismissAll();
  }

  setData(){
    this.object = (JSON.parse(localStorage.getItem('currentUser')));
    if(this.object== null){
      this.sharedService.setValue(false);
    }else{
      this.sharedService.setValue(true);
    }
  }

  login(){}

  logout(){
    this.authenticationService.logout();
    this.isLogin=false;
    this.sharedService.setUserObjectValue({});
    localStorage.clear();
    this.toastr.success('Logged out successfully','Logged out',{
      timeOut : 2000,
    });
    this.router.navigateByUrl('/home');
    location.reload()

  }

  onLoginFormSubmit(){
  }
}
