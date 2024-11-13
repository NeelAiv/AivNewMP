import { Component, OnInit } from '@angular/core';
import { WidgetService } from '../widgetfun/WidgetService';
import { widget } from '../widgetfun/widget';
import { takeWhile, map, tap } from 'rxjs/operators';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { WidgetServicesService } from '../Services/widget-services.service';
import { CommentService } from '../Services/commentService';
import { SharedVarService } from '../Services/SharedVarService';
import { Router } from '@angular/router'
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubscribeComponent } from '../subscribe/subscribe.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IuserToUpdate } from '../my-profile/my-profile.component';
import { NgForm } from '@angular/forms';
import { BASE_URL } from 'src/app/constants/constants';
import { Toast, ToastrService } from 'ngx-toastr';

export const comment = {
  user_id: 0,
  comment: null,
  component_id: 0,
  rate: 0
}

export const commentListConst = {
  comment: '',
  date: '',
  profile_image: '',
  rating: 0,
  username: ''
}

export const widgetConst = {
  category: '',
  comment_id: 0,
  created_date: '',
  description: '',
  details: '',
  download_link: '',
  downloaded: 0,
  features: '',
  file_path: '',
  id: 0,
  image: '',
  last_update_date: '',
  main_page: false,
  no_of_comments: 0,
  price: 0,
  purchase_option: '',
  rate: 0,
  refresh: 0,
  seller_name: '',
  size: 0,
  sub_category: '',
  title: '',
  user_id: 0,
  video_url: ''
}

export const rating: Irating = {
  component_id: 0,
  five: 0,
  four: 0,
  id: 0,
  one: 0,
  three: 0,
  two: 0,
  total: 0,
  ratingOne: 0,
  ratingTwo: 0,
  ratingThree: 0,
  ratingFour: 0,
  ratingFive: 0
}

@Component({
  selector: 'app-widget-preview',
  templateUrl: './widget-preview.component.html',
  styleUrls: ['./widget-preview.component.css']
})
export class WidgetPreviewComponent implements OnInit {
  isLogin;
  widgetList$ = new Observable<any>();
  user$ = new Observable<any>();
  comment$ = new Observable<any>();
  id;
  widget: Iwidget = widgetConst;
  CommentObj: Icomment = comment;
  currentUser;
  widgetComments: IcommentList = commentListConst;
  agg_rate;
  ratingObject: Irating = rating;
  isCommented: boolean = false;
  constructor(private modalService: NgbModal,
    private toastr: ToastrService,
    private route: ActivatedRoute, public sanitizer: DomSanitizer, private router: Router, private widgetHttpService: WidgetServicesService, private commentService: CommentService, private sharVarService: SharedVarService) { }
  baseUrl = BASE_URL;
  SlideOptions = { items: 3, dots: true, nav: true };
  CarouselOptions = { items: 6, dots: true, nav: true };
  urlSafe: SafeResourceUrl;
  commentCounts$: Number;
  user_validate;
  tooltipOptions = {
    'placement': 'top',
    'show-delay': 200,
    'max-width': 150,
    'width': 100
  };


  ngOnInit(): void {
    console.log(this.currentUser)
    this.user_validate = JSON.parse(localStorage.getItem('currentUser'))
    console.log(this.user_validate)
    this.route.paramMap.subscribe(params => {
      this.id = params.get("widgetId");

      this.getWidgetDetailsAndRating();
      // this.CommentObj.component_id= this.id;
      // this.CommentObj.user_id=this.currentUser.id;
    });
    // this.id = this.route.params
    //    .subscribe(params => {
    //       // get id from params
    //       this.id = +params['widgetId'];
    //     });
    // this.id=this.route.snapshot.paramMap.get('widgetId');


    // this.sharVarService.getValue().subscribe(data =>  this.isLogin = data);
    // this.route.paramMap.subscribe(params => {
    //   this.id = params.get("widgetId");
    //   this.CommentObj.component_id= this.id;
    //   this.CommentObj.user_id=this.currentUser.id;
    // });
    // this.widgetHttpService.GetWidgetById(this.id).subscribe(data => {
    //   this.widget=data[0];
    // });
    // this.getWidgetDetailsAndRating();
    this.carousel();
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

  }
  initSlickSlider() {
    setTimeout(() => {

      // @ts-ignore
      var i = $(".product-image-slider");
      if (i.length > 0) {
        // @ts-ignore

        if (i[0].slick) {
          // @ts-ignore

          i[0].slick.refresh();
        }
      }

      // @ts-ignore
      var a = $(".product-image-slider-thumbnails");
      if (a.length > 0) {
        // @ts-ignore

        if (a[0].slick) {
          // @ts-ignore

          a[0].slick.refresh();
        }
      }
      // @ts-ignore
      i.slick({
        dots: !1,
        fade: !0,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: !0,
        asNavFor: a,
        lazyLoad: "progressive",
        infinite: !1
      }),
        // @ts-ignore
        a.slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          asNavFor: i,
          dots: !1,
          centerMode: !1,
          focusOnSelect: !0,
          infinite: !1,
        }),

        i.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
          var iframes = document.querySelectorAll('iframe');
          Array.prototype.forEach.call(iframes, iframe => {
            $(iframe).attr("src", $(iframe).attr("src"))
          });
        });
      // @ts-ignore
      $(".product-image-slider-thumbnails").find("button").hasClass("slick-arrow") ? ($(".product-image-slider-thumbnails").css("padding-left", "30px"),
        // @ts-ignore
        $(".product-image-slider-thumbnails").css("padding-right", "30px")) : ($(".product-image-slider-thumbnails").css("margin-left", "-7px"),
          // @ts-ignore
          $(".product-image-slider-thumbnails").css("margin-right", "-7px"))
      this.resizeMainSliderPlayer()
      this.resizeThumbSliderPlayer();

    }, 1000);
  }

  resizeMainSliderPlayer() {
    // @ts-ignore
    var iframes = $(".product-image-slider iframe");
    var ratio = 16 / 9;
    if (!iframes[0]) return;
    // @ts-ignore
    var win = $(".product-image-slider"),
      width = win.width(),
      playerWidth,
      height = win.height(),
      playerHeight,
      ratio = ratio || 16 / 9;

    iframes.each(function (i, el) {
      // @ts-ignore

      var current = $(el);
      if (width / ratio < height) {
        playerWidth = width;
        current.width(playerWidth).height(height).css({
          left: (width - playerWidth) / 2,
          top: 0
        });
      } else {
        playerHeight = Math.ceil(width / ratio);
        current.width(width).height(playerHeight).css({
          left: 0,
          top: (height - playerHeight) / 2
        });
      }
    });
  }


  resizeThumbSliderPlayer() {
    // @ts-ignore
    var iframes = $(".product-image-slider-thumbnails iframe");
    var ratio = 16 / 1;
    if (!iframes[0]) return;
    // @ts-ignore
    var win = $(".product-image-slider-thumbnails"),
      width = win.width(),
      playerWidth,
      height = win.height(),
      playerHeight,
      ratio = ratio || 16 / 1;

    iframes.each(function (i, el) {
      // @ts-ignore

      var current = $(el);
      if (width / ratio < height) {
        playerWidth = Math.ceil(height * ratio);
        current.width(playerWidth).height(height).css({
          left: (width - playerWidth) / 2,
          top: 0
        });
      } else {
        playerHeight = Math.ceil(width / ratio);
        current.width(width).height(playerHeight).css({
          left: 0,
          top: (height - playerHeight) / 2
        });
      }
    });
  }


  getWidgetDetailsAndRating() {
    this.widgetList$ = this.sharVarService.$widgetList;
    if (this.id) {
      this.widgetHttpService.GetWidgetById(this.id).subscribe(data => {
        const widgetObj = data['data']
        this.widget = widgetObj[0];
        this.widget['images'] = this.widget.image.split(',');
        this.widget['images'] = this.widget['images'].filter(x => x != '')
        debugger;
        this.widget.video_url = this.widget.video_url.replace("watch?v=", "embed/");
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.widget.video_url);
        // @ts-ignore
        this.initSlickSlider();
      });
    }
    this.user$ = this.sharVarService.$user.pipe(tap(data => { this.currentUser = data; }), map(data => data));
    this.comment$ = this.sharVarService.$comments.pipe(tap(data => { this.commentCounts$ = data.length }), map(data => data));
    this.commentService.getComments(this.id).subscribe((data: any) => {
      debugger;
      this.widgetComments = data;
      let total_rating = data.map((x) => { return x.rating }).reduce((a, b) => a + b, 0);
      this.agg_rate = total_rating / data.length;
      this.isCommented = data.findIndex((x) => { return x.user_id == this.currentUser.id }) > -1 ? true : false;
      this.sharVarService.setWidgetComments(data);
    });

    this.getWidgetRating();

  }

  // async getWidgetDetailsAndRating() {

  //   this.widgetList$ = await this.sharVarService.$widgetList.pipe(map(data => data));
  //   this.user$ = await this.sharVarService.$user.pipe(tap(data => this.currentUser = data), map(data => data));
  //   this.comment$ = await this.sharVarService.$comments.pipe(map(data => data));
  //   await this.route.paramMap.subscribe(params => {
  //     this.id = params.get("widgetId");
  //     this.CommentObj.component_id = this.id;
  //     this.CommentObj.user_id = this.currentUser.id;
  //     console.log(this.CommentObj.user_id);
  //   });
  //   await this.widgetHttpService.GetWidgetById(this.id).subscribe(data => {
  //     this.widget = data[0];
  //   });
  //   await this.getComment();
  //   await this.getWidgetRating();
  // }

  // getComment() {
  //   this.commentService.getComments(this.id).subscribe(data => {
  //     this.widgetComments = data;
  //     this.sharVarService.setWidgetComments(data);
  //     console.log(this.comment$);
  //     console.log(this.widgetComments);
  //   });
  // }

  // getWidgetAndComment(id) {

  //   this.widgetHttpService.GetWidgetById(id).subscribe(data => {
  //     this.widget = data[0];
  //   });
  //   this.getWidgetRating();
  //   this.commentService.getComments(id).subscribe(data => {
  //     this.widgetComments = data;
  //     console.log(this.widgetComments);
  //   });
  // }

  makeComment(commentForm: NgForm, userId, component_id) {
    this.CommentObj.user_id = userId;
    this.CommentObj.component_id = component_id;
    this.commentService.doComment(this.CommentObj).subscribe((data: any) => {
      if (data.success == true) {
        this.toastr.success("Comment submitted successfully")
        this.commentService.getComments(component_id).subscribe(data => {

          this.sharVarService.setWidgetComments(data);
          commentForm.form.reset();
          this.isCommented = true;
          this.getWidgetRating();
          this.commentService.getComments(this.id).subscribe((data: any) => {
            debugger;
            this.widgetComments = data;
            let total_rating = data.map((x) => { return x.rating }).reduce((a, b) => a + b, 0);
            this.agg_rate = total_rating / data.length;
            this.isCommented = data.findIndex((x) => { return x.user_id == this.currentUser.id }) > -1 ? true : false;
            this.sharVarService.setWidgetComments(data);
          });

          // window.location.reload()
          //@ts-ignore
          // $('#makeComment').click();

        })
      }
    });
  }
  deleteComment(comment) {
    debugger;
    if (confirm("Are you sure want to delete comment?")) {
      this.commentService.deleteComment(comment).subscribe((data: any) => {
        if (data.success == true) {
          this.toastr.success("Comment deleted successfully")
          this.commentService.getComments(this.id).subscribe(data => {

            this.sharVarService.setWidgetComments(data);
            this.isCommented = true;
            this.getWidgetRating();
            this.commentService.getComments(this.id).subscribe((data: any) => {
              debugger;
              this.widgetComments = data;
              let total_rating = data.map((x) => { return x.rating }).reduce((a, b) => a + b, 0);
              this.agg_rate = total_rating / data.length;
              this.isCommented = data.findIndex((x) => { return x.user_id == this.currentUser.id }) > -1 ? true : false;
              this.sharVarService.setWidgetComments(data);
            });
            // window.location.reload()
            //@ts-ignore
            // $('#makeComment').click();

          })
        }
      });
    }
  }

  editComponent() {
    this.router.navigate(['/upload/', this.id]);
  }

  deleteComponent() {
    this.widgetHttpService.Delete(this.id).subscribe((data: any) => {

      this.toastr.success("Widget Deleted Successfully", 'Success')
      this.router.navigate(['/home']);

    })
  }

  rating(e) {
    this.CommentObj.rate = e;
  }

  getWidgetRating() {
    this.widgetHttpService.getBreakDownRating(this.id).subscribe((data: any) => {
      if (data.length > 0) {
        debugger;
        let total_count = data.length;
        let one_count = data.find((x) => { return x.rating == 1 })?.count;
        let two_count = data.find((x) => { return x.rating == 2 })?.count;
        let three_count = data.find((x) => { return x.rating == 3 })?.count;
        let four_count = data.find((x) => { return x.rating == 4 })?.count;
        let five_count = data.find((x) => { return x.rating == 5 })?.count;

        const ratingObj: Irating = {
          id: this.id,
          component_id: this.id,
          total: total_count,
          one: one_count ? one_count : 0,
          two: two_count ? two_count : 0,
          three: three_count ? three_count : 0,
          four: four_count ? four_count : 0,
          five: five_count ? five_count : 0,
          ratingOne: (one_count ? one_count : 0) * 100 / total_count,
          ratingTwo: (two_count ? two_count : 0) * 100 / total_count,
          ratingThree: (three_count ? three_count : 0) * 100 / total_count,
          ratingFour: (four_count ? four_count : 0) * 100 / total_count,
          ratingFive: (five_count ? five_count : 0) * 100 / total_count,
        };
        this.ratingObject = ratingObj;

      }
    });
  }

  openModal() {
    this.modalService.open(SubscribeComponent);
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  carousel() {
    setTimeout(() => {
      // @ts-ignore
      $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 30,
        autoplay: true,
        navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
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

  // <!-- [routerLink]="['/preview/',obj.id]" -->
  getNewComponent(component_id) {
    this.router.navigate(['preview', component_id]);
    // this.router.navigate(['/preview/', { widgetId: component_id }]);
  }


  downloadWidget(widget) {
    this.widgetHttpService.DownloadWidget(widget.file_path).subscribe((res: any) => {
      if (res.widget) {
        let widgetObj = widget;
        console.log(typeof widgetObj.downloaded);
        var downloadCount: number = +widgetObj.downloaded;
        widgetObj.downloaded = downloadCount + 1;
        this.widgetHttpService.Update(widget.id, widgetObj).subscribe((updateRes: any) => {

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

  openDownloadModal(file) {
    const modalRef = this.modalService.open(SubscribeComponent);
    modalRef.componentInstance.widget = file;
    modalRef.componentInstance.fileName = file.file_path;
  }
}
export interface Icomment {
  user_id: number,
  comment: string,
  component_id: number,
  rate: number
}

export interface Irating {
  component_id: number,
  five: number,
  four: number,
  id: number,
  one: number,
  three: number,
  two: number,
  total?: number,
  ratingOne?: number,
  ratingTwo?: number,
  ratingThree?: number,
  ratingFour?: number,
  ratingFive?: number
}

export interface Iwidget {
  category: string,
  comment_id: number
  created_date: string,
  description: string,
  details: string,
  download_link: string,
  downloaded: number,
  features: string,
  file_path: string,
  id: number,
  image: string,
  last_update_date: string,
  main_page: boolean,
  no_of_comments: number,
  price: number,
  purchase_option: string,
  rate: number,
  refresh: number,
  seller_name: string,
  size: number,
  sub_category: string,
  title: string
  user_id: number
  video_url: string
}

export interface IcommentList {
  comment: string,
  date: string,
  profile_image: string,
  rating: number,
  username: string
}
