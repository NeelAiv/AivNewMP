import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../model';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from '../Services/userService';
import { WidgetServicesService } from '../Services/widget-services.service';
import { Router } from '@angular/router';
import { SharedVarService } from '../Services/SharedVarService';
import { ToastrService } from 'ngx-toastr';
import { BASE_URL } from 'src/app/constants/constants';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';
import { NgbModalWindow } from '@ng-bootstrap/ng-bootstrap/modal/modal-window';

export interface IuserToUpdate {
  first_name: string,
  last_name: string,
  username: string;
  password: string;
  phone_number?: number,
  role: string,
  address: string,
  city: string,
  state: string,
  coutry: string,
  company_name: string,
  email: string,
  id: number
}


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})

export class MyProfileComponent implements OnInit, OnDestroy {
  currentUser;
  userToUpdate;
  passwordToCheck;
  widgetsByUser;
  currentUserPhoto;
  upload_url = "assets/duser.jpg";
  baseUrl = BASE_URL;
  selected_file_name = "Please select a file."
  uploadFile = {
    profile_imageFile: null
  }
  modalRef: NgbModalRef
  constructor(private userService: UserService,
    private router: Router,
    private widgetService: WidgetServicesService,
    private sharVarService: SharedVarService,
    private tostr: ToastrService,
    private _location: Location,
    private modalService: NgbModal
  ) { }
  ngOnDestroy(): void {

  }

  ngOnInit(): void {
    this.setUser();
    this.getWidgetOfUser()
  }

  setUser() {
    this.currentUser = (JSON.parse(localStorage.getItem('currentUser')));

    this.currentUserPhoto = this.currentUser.profile_image
    this.userToUpdate = this.currentUser;

    this.userToUpdate.password = '';
  }

  async editUser() {

    var formData = new FormData();
    let updateInfo = {
      id: this.userToUpdate.id,
      username: this.userToUpdate.username,
      first_name: this.userToUpdate.first_name,
      last_name: this.userToUpdate.last_name,
      city: this.userToUpdate.city,
      state: this.userToUpdate.state,
      country: this.userToUpdate.country,
      role: this.userToUpdate.role,
      password: this.userToUpdate.password,
      zip_code: this.userToUpdate.zip_code,
      email: this.userToUpdate.email,
      phone_number: this.userToUpdate.phone_number,
      last_update_date: this.userToUpdate.last_update_date,
      company_name: this.userToUpdate.company_name,
      address: this.userToUpdate.address,
      image: this.userToUpdate.image

    }

    for (var key in updateInfo) {
      formData.append(key, updateInfo[key]);
    }

    if (this.uploadFile['profile_imageFile']) {
      formData.append('profile_image', this.uploadFile['profile_imageFile'], this.uploadFile['profile_imageFile'].name);
    }

    this.userService.updateUser(formData).subscribe((data: any) => {
      console.log(data)
      if (data.success == true) {
        this.userService.GetById(this.userToUpdate.id).subscribe(async datatoupdate => {

          this.sharVarService.setUserObjectValue(datatoupdate[0]);


          this.setUser();
          this.tostr.success(data.message, 'Success');
          this.router.navigateByUrl('my-profile#aivprof-tab2')
        })

      }
      else {
        this.tostr.error(data.message, 'Error');

      }
    });
    // this.userService.updateUser(this.userToUpdate).subscribe(data => {
    //   console.log(data);
    // });

  }

  cancel() {
    this._location.back()
  }
  getWidgetOfUser() {
    this.widgetService.GetWidgetByUserId(this.currentUser.id).subscribe(data => {
      this.widgetsByUser = data;
    })
  }

  public openConfirmationDialog() {

  }
  deleteComponent(id) {

    if(confirm("Are you sure want to delete this?")){
      this.widgetService.Delete(id).subscribe((data: any) => {
        if (data.success == true) {
          this.tostr.success('Component deleted Successfully', 'Success');
          this.router.navigate(['/my-profile']);
          this.getWidgetOfUser();
        }
        else {
          this.tostr.error('Delete failed', 'Error');
        }
      });
    }
    // let dialogRef = this.modalService.open(DialogConfirmationComponent, { size: "md" });
    

    // dialogRef.result.then(function(result){
    //   //Accept
    //   debugger;
    //   if (result) {
    //     debugger;
    //     this.widgetService.Delete(id).subscribe((data: any) => {
    //       if (data.success == true) {
    //         this.tostr.success('Component deleted Successfully', 'Success');
    //         this.router.navigate(['/my-profile']);
    //         this.getWidgetOfUser();
    //       }
    //       else {
    //         this.tostr.error('Delete failed', 'Error');
    //       }
    //     });
    //   }
    // },function(result){
    //   //Reject
    //   debugger;
    // })
    


  }

  saveProfileImage(e: any) {
    let file = e.target.files[0];
    if (file) {
      const aReader = new FileReader();
      aReader.readAsText(file, "UTF-8");
      aReader.onload = (e) => {
        let fileName = file.name;

        this.uploadFile['profile_imageFile'] = file;
        let url = URL.createObjectURL(file);
        console.log('url : ', url);
        // @ts-ignore
        $('#customImg').attr('src', url);
        // @ts-ignore
        $('#profile_title').html(fileName);
        // selected_file_name = fileName;
      }
      aReader.onerror = (e) => {
        this.uploadFile['profile_imageFile'] = null;

        // @ts-ignore
        $('#customImg').attr('src', 'images/dflwidg.png');
      }
    } else {

      this.uploadFile['profile_imageFile'] = null;
      // @ts-ignore
      $('#customImg').attr('src', 'images/dflwidg.png');
    }
  }
}

export interface IuserToUpdate {
  first_name: string,
  last_name: string,
  username: string;
  password: string;
  phone_number?: number,
  role: string,
  address: string,
  city: string,
  state: string,
  coutry: string,
  company_name: string,
  email: string,
  id: number
}
