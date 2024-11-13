import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import * as categories from '../categories.json';
import { ActivatedRoute } from '@angular/router';
import { FlashService } from '../Services/flashService';
import { WidgetServicesService } from '../Services/widget-services.service'
import { IloginForm } from '../create-account/create-account.component';
import JSZip, { files } from 'jszip';
import { ToastrService } from 'ngx-toastr';
import { SharedVarService } from '../Services/SharedVarService';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BASE_URL } from '../constants/constants';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import $ from 'jquery';


export const uploadConst = {
  title: null,
  category: null,
  sub_category: null,
  rate: 0,
  description: null,
  image: null,
  purchase_option: 'free',
  size: 0,
  downloaded: 0,
  refresh: 0,
  no_of_comments: null,
  download_link: null,
  details: null,
  features: null,
  seller_name: null,
  comment_id: null,
  file_path: null,
  price: 0,
  video_url: null,
  created_date: null,
  last_update_date: null,
  user_id: 0,
  uploadedImages: [],
  images: []
}
export const widgetCoverImageConst = {
  widgetFile: null,
  widgetCoverImage: null,
  widgetImages: []
}

@Component({
  selector: 'app-upload-widget',
  templateUrl: './upload-widget.component.html',
  styleUrls: ['./upload-widget.component.css']
})
export class UploadWidgetComponent implements OnInit {
  upload_url = "assets/duser.jpg";
  constructor(private route: ActivatedRoute,
    private widgetService: WidgetServicesService,
    private toastr: ToastrService,
    private router: Router,
    private sharVarService: SharedVarService,
    public sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService,
    private _location: Location) { }
  compCategories: any = (categories as any).default;
  Categories;
  SubCategories;
  // =================
  widgetId;
  widgetImages = [];
  coverpageLable = "Cover Widget Image";
  dataLoading = false;
  location: any;
  subCat = false;
  upload: Iupload = uploadConst;
  user$ = new Observable<any>();
  currentUser;
  firstCategory
  isLoading = false
  zipFile: JSZip = new JSZip();
  uploadFile: widgetCoverImage = widgetCoverImageConst;
  baseUrl = BASE_URL;
  ngOnInit(): void {

    this.Categories = Object.keys(this.compCategories);

    this.currentUser = (JSON.parse(localStorage.getItem('currentUser')));
    // this.user$ = this.sharVarService.$user.pipe(tap(data =>{ this.currentUser=data;console.log("current user"); console.log(this.currentUser); }),map(data => data));

    this.route.paramMap.subscribe(params => {
      this.widgetId = params.get("widgetId");
    });
    if (this.widgetId) {
      this.widgetService.GetWidgetById(this.widgetId).subscribe(data => {
        console.log('data[0] : ', data['data']);
        const widgetObj = data['data']
        this.upload = widgetObj[0];
        this.upload['images'] = this.upload.image.split(',');
        this.upload['images'] = this.upload['images'].filter(x => x != '')
        this.upload_url = BASE_URL + '/uploads/images/' + this.upload.image;

        // @ts-ignore
        // $('#customImg').attr('src', BASE_URL + '/uploads/images/' + this.upload.image);
      });
    }
    else {
      this.upload = {
        title: null,
        category: null,
        sub_category: null,
        rate: 0,
        description: null,
        image: null,
        purchase_option: 'free',
        size: 0,
        downloaded: 0,
        refresh: 0,
        no_of_comments: null,
        download_link: null,
        details: null,
        features: null,
        seller_name: null,
        comment_id: null,
        file_path: null,
        price: 0,
        video_url: null,
        created_date: null,
        last_update_date: null,
        user_id: 0,
        uploadedImages: [],
        images: []
      };
      this.uploadFile = {
        widgetFile: null,
        widgetCoverImage: null,
        widgetImages: []
      }
      this.upload_url = null;
      this.zipFile = new JSZip();
    }
    this.upload.user_id = this.currentUser.id;

    this.upload.category = this.Categories[0]
    this.onSelectCategory(this.upload.category)
  }

  onsubmit(uploadForm: NgForm) {
    if (uploadForm.valid) {
      if (this.widgetId) {
        this.editWidget();
      } else {
        this.uploadFileValidate();
      }
      this.dataLoading = false;
    }
    else {
      this.toastr.error("Please enter valid details")
    }
  }

  getWidgetDetails() {
    if (this.widgetId) {
      this.widgetService.GetWidgetById(this.widgetId).subscribe(data => this.upload = data[0]);
    }
  }

  onSelectCategory($event) {
    if (this.compCategories[this.upload.category].subCategories.length > 0) {
      this.subCat = true;
      this.SubCategories = this.compCategories[this.upload.category].subCategories


    } else {
      this.subCat = false;
    }
  }

  onSelectSubCategory(subCat) {
    // console.log('subCat : ',this.upload.sub_category);
    // this.upload.sub_category = subCat
  }

  editWidget() {

    if (this.uploadFile.widgetImages.length > 0) {
      var imageformData = new FormData();
      for (let i = 0; i < this.uploadFile.widgetImages.length; i++) {
        imageformData.append('uploadedImages[]', this.uploadFile.widgetImages[i], this.uploadFile.widgetImages[i].name);
      }
      this.widgetService.uploadWigetImages(this.widgetId, imageformData).subscribe(data => {
        console.log('data -----> ', data);
        setTimeout(() => {
          // this.uploadFile.widgetImages = [];
          var formData = new FormData();

          for (var key in this.upload) {
            formData.append(key, this.upload[key]);
          }
          if (this.uploadFile['widgetFile']) {
            formData.append('widgetFile', this.uploadFile['widgetFile'], this.uploadFile['widgetFile'].name);
          }
          if (this.uploadFile['widgetCoverImage']) {
            formData.append('coverImage', this.uploadFile['widgetCoverImage'], this.uploadFile['widgetCoverImage'].name);
          }
          if (this.uploadFile['widgetImages']) {
            formData.append('widgetImages[]', this.uploadFile['widgetImages']);
          }
          // for (var i = 0; i < this.widgetImages.length; i++) {

          //   formData.append("widgetImages[]", this.widgetImages[i]);

          // }
          //  this.widgetService.Update(this.widgetId,formData).subscribe((data:any) => {
          //   if(data.success == true){
          this.isLoading = true

          if (this.isLoading) {
            this.spinner.show();

            setTimeout(() => {
              /** spinner ends after 5 seconds */
              this.spinner.hide();
            }, 5000);
          }
          this.widgetService.EditWidget(this.widgetId, formData).subscribe(data => {
            setTimeout(() => {
              this.router.navigate(['/preview/' + this.widgetId]);

              this.toastr.success('Widget Updated successfully.', 'Success');
              this.isLoading = false
            }, 1500);
          })

        }, 1500);
      })
    }
    else {
      var formData = new FormData();

      for (var key in this.upload) {
        formData.append(key, this.upload[key]);
      }
      if (this.uploadFile['widgetFile']) {
        formData.append('widgetFile', this.uploadFile['widgetFile'], this.uploadFile['widgetFile'].name);
      }
      if (this.uploadFile['widgetCoverImage']) {
        formData.append('coverImage', this.uploadFile['widgetCoverImage'], this.uploadFile['widgetCoverImage'].name);
      }
      if (this.uploadFile['widgetImages']) {
        formData.append('widgetImages[]', this.uploadFile['widgetImages']);
      }
      // for (var i = 0; i < this.widgetImages.length; i++) {

      //   formData.append("widgetImages[]", this.widgetImages[i]);

      // }
      //  this.widgetService.Update(this.widgetId,formData).subscribe((data:any) => {
      //   if(data.success == true){
      this.isLoading = true

      if (this.isLoading) {
        this.spinner.show();

        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 5000);
      }
      this.widgetService.EditWidget(this.widgetId, formData).subscribe(data => {
        setTimeout(() => {
          this.router.navigate(['/preview/' + this.widgetId]);

          this.toastr.success('Widget Updated successfully.', 'Success');
          this.isLoading = false
        }, 1500);
      })
    }

    // }else{
    //   this.toastr.success('Component uploading failed.','Error')
    // }
    //     })
  }

  saveCoverImage(e: any) {

    let file: any = e.target.files[0];

    const files = e.target.files;
    let isImage = true;
    var formData = new FormData();
    console.log('this.upload', this.upload);
    for (var key in this.upload) {
      formData.append(key, this.upload[key]);
    }

    this.uploadFile.widgetImages = [];
    if (files.length > 10) {
      this.toastr.warning("only 10 files allowed ");
      $(e.target).val("");
      return false;
    }
    for (let i = 0; i < files.length; i++) {
      if (files.item(i).type.match('image.*')) {
        this.widgetImages.push(e.target.files[i]);
        this.uploadFile.widgetImages.push(e.target.files[i])
        // formData.append('files', this.uploadFile['widgetImages'], files.item);
        continue;
      } else {
        isImage = false;
        alert('invalid format!');
        break;
      }
    }

    let selectedFiles = [];

    if (isImage) {
      selectedFiles = e.target.files;
    } else {
      selectedFiles = undefined;
      e.srcElement.percentage = null;
    }
    if (this.uploadFile.widgetImages.length > 0) {
      for (let i = 0; i < this.uploadFile.widgetImages.length; i++) {
        formData.append('uploadedImages[]', this.uploadFile.widgetImages[i], this.uploadFile.widgetImages[i].name);

        file = this.uploadFile.widgetImages[i];
        if (this.uploadFile.widgetImages[i]) {
          const aReader = new FileReader();
          aReader.readAsText(this.uploadFile.widgetImages[i], "UTF-8");
          aReader.onload = (e) => {
            let fileName = this.uploadFile.widgetImages[i].name;
            this.coverpageLable = fileName;
            this.uploadFile['widgetCoverImage'] = this.uploadFile.widgetImages[i];
            let url = URL.createObjectURL(this.uploadFile.widgetImages[i]);
            if (i == 0) {
              this.upload['uploadedImages'] = [];
            }
            this.upload['uploadedImages'].push(this.sanitizer.bypassSecurityTrustResourceUrl(url));
            // @ts-ignore

            // $('#customImg').attr('src', url);
          }
          aReader.onerror = (e) => {
            this.uploadFile['widgetCoverImage'] = null;

            // @ts-ignore
            // $('#customImg').attr('src', 'images/dflwidg.png');
          }
        } else {
          this.uploadFile['widgetCoverImage'] = null;
          // @ts-ignore
          // $('#customImg').attr('src', 'images/dflwidg.png');
        }
      }
    }

    // this.widgetService.uploadWigetImages(this.widgetId, formData).subscribe(data => {
    //   console.log('data -----> ', data);
    //   setTimeout(() => {
    //     // this.uploadFile.widgetImages = [];
    //     this.toastr.success('Images uploaded successfully.', 'Success');

    //   }, 1500);
    // })

  }




  // uploadImage(file) {
  //   if (file) {
  //     const aReader = new FileReader();
  //     aReader.readAsText(file, "UTF-8");
  //     aReader.onload = function (e) {
  //       let fileName = file.name;
  //       () =>{
  //         this.coverpageLable = fileName;
  //         this.uploadFile['widgetCoverImage'] = file;
  //       };
  //       let url = URL.createObjectURL(file);
  //       // @ts-ignore
  //       $('#customImg').attr('src', url);
  //     }
  //     aReader.onerror($evt) {
  //       this.apply(function () { this.uploadFile['widgetCoverImage'] = null; });
  //       console.log('Error while Image read');
  //       // @ts-ignore
  //       $('#customImg').attr('src', 'images/dflwidg.png');
  //     }
  //   } else {
  //     this.apply(function () { this.uploadFile['widgetCoverImage'] = null; });
  //     // @ts-ignore
  //     $('#customImg').attr('src', 'images/dflwidg.png');
  //   }
  // }

  uploadFileValidate() {



    if (this.uploadFile.widgetImages.length > 0) {
      var imageformData = new FormData();
      for (let i = 0; i < this.uploadFile.widgetImages.length; i++) {
        imageformData.append('uploadedImages[]', this.uploadFile.widgetImages[i], this.uploadFile.widgetImages[i].name);
      }
      this.widgetService.uploadWigetImages(this.widgetId, imageformData).subscribe(data => {
        console.log('data -----> ', data);
        setTimeout(() => {

          var formData = new FormData();
          for (var key in this.upload) {
            formData.append(key, this.upload[key]);
          }


          // angular.forEach(this.upload, function (value, key) {
          //   formData.append(key, value);
          // });


          if (this.uploadFile['widgetFile']) {
            formData.append('widgetFile', this.uploadFile['widgetFile'], this.uploadFile['widgetFile'].name);

          } else {
            this.toastr.error("Upload Widget File", "Error");

            return;
          }
          if (this.uploadFile['widgetCoverImage']) {
            formData.append('coverImage', this.uploadFile['widgetCoverImage'], this.uploadFile['widgetCoverImage'].name);
          } else {
            this.toastr.error("Upload Cover Image with dimentions 800px X 800px", "Error");

            return;
          }
          this.isLoading = true


          this.widgetService.uploadWidget(formData).subscribe((data: any) => {

            if (data.success == true) {
              this.widgetService.GetWidgetById(this.currentUser.id).subscribe((data) => {
                console.log(data)
              })
              if (this.isLoading) {
                this.spinner.show();

                setTimeout(() => {
                  /** spinner ends after 5 seconds */
                  this.spinner.hide();
                  this.router.navigateByUrl('/preview/' + data.widgetId);
                  this.toastr.success('Component uploaded successfully', 'Success')
                }, 5000);
              }
              this.isLoading = false;
            } else {
              this.isLoading = false;
              this.toastr.error('Component uploading failed.', 'Error')

            }
          })
          // then(function (res) {
          //   if (res.message == 'success') {
          //     $location.path('/widgets');
          //     $timeout(function () {
          //       FlashService.Success(res.message);
          //     }, 1500);
          //   } else {
          //     FlashService.Error(res.message);
          //   }
          // });


        }, 1500);
      })
    }
    else {
      this.toastr.warning("Please upload atleast one image")
    }
    // Esisiting Code

  }

  // saveCoverImage(e : any){
  //   // var fileName = e.target.files[0].name;
  //   setTimeout(() => {
  //     console.log("image file uploading ");
  //     // this.uploadWidget(e.target.files[0]);
  //   },1500);
  // }

  saveWidgetFile(e: any) {
    var file = e.target.files[0];
    if (file) {
      debugger;
      if (file.type == 'application/vnd.microsoft.portable-executable' ||
        file.type == 'application/x-msdownload' ||
        file.type == 'application/exe' ||
        file.type == 'application/octet-stream' ||
        file.type == 'application/exe' ||
        file.type == 'application/x-exe' ||
        file.type == 'application/dos-exe' ||
        file.type == 'vms/exe' ||
        file.type == 'application/x-winexe' ||
        file.type == 'application/msdos-windows' ||
        file.type == 'application/x-msdos-program' ||
        file.type == 'application/application/x-sh' ||
        file.type == 'application/x-shar' ||
        file.type == 'text/x-script.sh' ||
        file.type == 'application/x-bsh') {
        this.toastr.error("Invalid File Type.");
        $("#widgetfile").val("");

      }
      else if (file.type == 'application/zip' || file.type == 'application/x-zip-compressed' || file.type == 'application/x-7z-compressed') {
        if (this.upload.category == "Reports" || this.upload.category == "Widgets") {
          this.uploadFile['widgetFile'] = null;
          this.toastr.error("Invalid file type");
          $("#widgetfile").val("");
        }
        else {
          this.zipFile.loadAsync(file).then((zip) => {
            Object.keys(zip.files).forEach((filename) => {
              // console.log(filename);
              if (filename.endsWith('.exe') || filename.endsWith('.sh') || filename.endsWith('.batch')) {
                this.toastr.error('found invalid file in zip.', "Invalid File Type.")
                // console.log('found invalid file type in zip.');
                return;
              }
              // zip.files[filename].async('string').then((fileData) => {
              //   console.log(fileData);
              // })
            })
          })
        }
      }
      else {
        let allowUpload = true;;
        if (this.upload.category == "Reports" || this.upload.category == "Widgets") {
          if (file.type == "image/png") {
            this.toastr.error("Invalid file type");
            this.uploadFile['widgetFile'] = null;
            $("#widgetfile").val("");
            allowUpload = false;
          }
        }
        if (allowUpload) {
          const aReader = new FileReader();
          aReader.readAsText(file, "UTF-8");
          aReader.onload = (e) => {
            let fileContent = aReader.result;
            // var fileName = file.name;
            this.upload['size'] = file.size;
            this.upload['title'] = file.name;
            this.upload['type'] = file.type;
            this.uploadFile['widgetFile'] = file;
            console.log(file.size)
          }
          aReader.onerror = (e) => {
            this.toastr.error('Error while file read', 'Error')

            this.uploadFile['widgetFile'] = null;
            //   $apply(function () { this.uploadFile['widgetFile'] = null; });
          }
        }
      }

    }

    // setTimeout(() => {
    //   console.log("widget file uploading ");
    //   this.uploadWidget(e.target.files[0]);
    // },1500);

  }

  deleteImage(image) {
    let index = this.upload.uploadedImages.findIndex(function (x) { return x == image });
    if (index > -1) {
      this.upload.uploadedImages.splice(index, 1);
      this.uploadFile.widgetImages.splice(index, 1);
    }
  }
  deleteSavedImage(image) {

    let index = this.upload.images.findIndex(function (x) { return x == image });
    this.upload.images.splice(index, 1);
    this.upload.image = this.upload.images.join();

  }

  cancel() {
    this._location.back()
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


  // uploadWidget(file) {
  //   if (file) {
  //     const aReader = new FileReader();
  //     aReader.readAsText(file, "UTF-8");
  //     aReader.onload() {
  //       let fileContent = aReader.result;
  //       // var fileName = file.name;
  //         this.upload['size'] = file.size;
  //         this.upload['title'] = fileContent.widget.widgetName;
  //         this.upload['type'] = fileContent.widget.widgetType;
  //         this.uploadFile['widgetFile'] = file;
  //     }
  //     aReader.onerror = function (evt) {
  //       console.log('Error while file read');
  //       this.uploadFile['widgetFile'] = null;
  //       //   $apply(function () { this.uploadFile['widgetFile'] = null; });
  //     }
  //   }
  // }

  // highlightedItems = document.querySelectorAll('.custom-file-input');
  // highlightedItems.forEach(function (item) {
  //   item.addEventListener('change', function (e) {
  //     if (e.target.files.length == 1) {
  //       var fileName = e.target.files[0].name;
  //       var nextSibling = e.target.nextElementSibling
  //       nextSibling.querySelector('.cst_fnm_lbl').innerText = fileName;
  //       if (e.target.parentElement.id == "2") { // widget upload
  //         $scope.uploadWidget(e.target.files[0]);
  //       } else if (e.target.parentElement.id == "1") { // Image upload
  //         //@ts-ignore
  //         $timeout($scope.uploadImage(e.target.files[0]));
  //       }
  //     } else {
  //       var fileName = [];
  //       angular.forEach(e.target.files, function (value, key) {
  //         fileName.push(value.name);
  //       });
  //       var nextSibling = e.target.nextElementSibling
  //       nextSibling.querySelector('.cst_fnm_lbl').innerText = fileName.join(', ');
  //       if (e.target.parentElement.id == "3") { // Widget Images
  //         $scope.uploadWidgetshowCase(e.target.files);
  //       }
  //     }
  //   });
  // });

}

export interface widgetCoverImage {
  widgetFile: any,
  widgetCoverImage: any,
  widgetImages: any
}
export interface Iupload {
  title?: string,
  category?: string,
  sub_category?: string,
  rate?: number,
  description?: string,
  image?: string,
  purchase_option?: string,
  size?: number,
  downloaded?: number,
  refresh?: number,
  no_of_comments?: number,
  download_link?: string,
  details?: string,
  features?: string,
  seller_name?: string,
  comment_id?: string,
  file_path?: string,
  price?: number,
  video_url?: string,
  created_date?: string,
  last_update_date?: string,
  user_id: number,
  uploadedImages: any,
  images: any
}

// editWidget(){
//   var formData = new FormData();
//   for (var key in this.upload) {
//     formData.append(key, this.upload[key]);
//   }
  // angular.forEach(this.upload, function (value, key) {
  //   formData.append(key, value);
  // });
  // if (this.uploadFile['widgetFile']) {
  //   formData.append('widgetFile', this.uploadFile['widgetFile'], this.uploadFile['widgetFile'].name);
  // }
  // if (this.uploadFile['widgetCoverImage']) {
  //   formData.append('coverImage', this.uploadFile['widgetCoverImage'], this.uploadFile['widgetCoverImage'].name);
  // }

  // this.widgetService.EditWidget(this.widgetId, formData).subscribe(data => {
  //   setTimeout(() => {
  //     console.log(data);
  //   }, 1500);
  // })
  // .then(function (res) {
  //   setTimeout(function () {
  //     FlashService.Success(res.message);
  //   }, 1500);
  // });
// }
// oncancel() {
//   this.location.path('/widget_details/' + this.widgetId);
// }

// uploadWidgetshowCase(File) {
//   if (File) {
//     angular.forEach(files, function (file) {
//       const aReader = new FileReader();
//       // aReader.readAsText(file, "UTF-8");
//       aReader.onload = function (evt) {
//         let fileName = file.name;
//         $scope.$apply(function () {
//           // $scope.upload['size'] = file.size;
//           // $scope.upload['title'] = fileContent.widget.widgetName;
//           // $scope.upload['type'] = fileContent.widget.widgetType;
//           // $scope.uploadFile['widgetFile'] = file;
//           const objectURL = window.URL.createObjectURL(new Blob([evt.target.result], { type: file.type }))
//           $scope.widgetImages.push(evt.target.result);
//           $scope.uploadFile.widgetImages.push(file);

//         });
//       }
//       aReader.readAsDataURL(file);

//       aReader.onerror = function (evt) {
//         FlashService.Error('Error while file read');
//         $scope.$apply(function () { this.uploadFile['widgetFile'] = null; });
//       }
//     });
//   }
// }

// loadImage(event, x) {
//   event.target.src = window.URL.createObjectURL(x);
// }
