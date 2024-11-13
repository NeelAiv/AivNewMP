import { Component, OnInit, Injectable, Output, EventEmitter } from '@angular/core';
import { UserService } from '../Services/userService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../Services/authenticationService';
import { SharedVarService } from '../Services/SharedVarService';
import { ToastrService } from 'ngx-toastr';
import { CreateAccountComponent } from '../create-account/create-account.component';

// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

export const signUpConst = {
  firstName : null,
  lastName : null,
  username : null,
  password : null,
  phone_number : 0,
  role : '',
  company_name : '',
  address : '',
  city : '',
  state : '',
  country : '',
  zip_code : '',
  profile_image : ''
  }
  export const signInConst = {
    username : null,
    password : null,
  }

@Component({
  selector: 'app-register-account',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterAccountComponent implements OnInit {
  dataLoading =false;
  singUp : IsignUpForm = signUpConst;
  loginFailed=false;
  signIn : IloginForm = signInConst;
  forgetData :IforgetData;
  responseData : Iregister;
  forget = false;
  emailId;

  @Output() isLogin = new EventEmitter<boolean>();
  constructor(private userService : UserService,
              private modalService : NgbModal,
              private authenticationService : AuthenticationService,
              private sharedService : SharedVarService,
              private toastr : ToastrService,) { }
  ngOnInit(): void {
  }

  active = 1;
  selectTab(value) {
      this.active = value;
  }

  isActive(value) {
      if (this.active == value) {
          return true;
      }
      else {
          return false;
      }
  }

  openModal() {
    this.modalService.open(CreateAccountComponent,{size:'lg',backdrop:false});
  }
  register(){
    this.dataLoading=true;

    this.userService.Create(this.singUp).subscribe((data:any) =>{

        if(data.success==false){
          this.toastr.error(data.message,'Error');
          console.log(data);
        } else if(data.success === true){
          this.toastr.success(data.message,'Success');

        //@ts-ignore
        $('#btnClose').click();
        } else {}

      });
    this.dataLoading=false;
  }

  login(){
    this.dataLoading=true;

    this.authenticationService.login(this.signIn.username,this.signIn.password).subscribe(data =>{

      if(data.success == true){
       this.sharedService.setValue(true);
       this.sharedService.setUserObjectValue(data.data);
       this.loginFailed=false;
       this.toastr.success('Logged in',data.message,{
         timeOut : 3000,
       });
        //@ts-ignore
        $('#btnClose').click();
        location.reload()
      }
      else{
        this.toastr.success(data.message,'Error',);
        this.sharedService.setUserObjectValue(data.data);
      }
      if(data.status=0){
        this.loginFailed=true;
      }
    });
    this.dataLoading=false;

  }

  sendEmail(){
    this.userService.ForgotPassword(this.emailId).subscribe(data=>{
      console.log(data);
    });
  }

  closeModal()
  {
    this.modalService.dismissAll();
  }

  forgetPassword(){
    this.forget= !this.forget;

  }

}

export interface IloginForm{
  username : string;
  password : string;
}

export interface IforgetData{
  emailId : string
}

export interface IsignUpForm{
  firstName : string,
  lastName : string,
  username : string,
  password : string,
  phone_number? : number,
  role ?: string,
  company_name ?: string,
  address ?: string,
  city ?: string,
  state ?: string,
  country ?: string,
  zip_code ?: string,
  profile_image ?: string
}

export interface Iregister{
  success : boolean;
}

