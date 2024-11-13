$(document).ready(function ($) {

    

    // Modal Hide-Show Forget password and login div code starts here 

    $(".lg_fpasslnk").click(function(){
        $(".mlogindiv_box").hide();
        $(".mforgotpass_box").show();
    });

    $(".lg_loginlnk").click(function(){
        $(".mforgotpass_box").hide();
        $(".mlogindiv_box").show();
    });

    // Modal Hide-Show Forget password and login div code ends here 

    //Newly Added Carousel Code starts here 
    $("#naddedCarousel").owlCarousel({
      autoplay:true,
      autoplayTimeout:3000,
      autoplayHoverPause:true,
      items: 4,
      margin:30,
      responsive:{
      0:{
          items:1
      },
      320:{
          items:1
      },
      480:{
          items:2
      },
      768:{
          items:2
      },
      991:{
          items:3
      },
      1024:{
          items:3
      },
      1280:{
          items:4
      },
      1440:{
          items:4
      },
      1600:{
          items:4
      },
      1920:{
          items:4
      }
  }
    });

    //Newly Added Carousel Code ends here 

    //Mostly Downloaded Carousel Code starts here 
    $("#mostdownCarousel").owlCarousel({
        autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
        items: 4,
        margin:30,
        responsive:{
        0:{
            items:1
        },
        320:{
            items:1
        },
        480:{
            items:2
        },
        768:{
            items:2
        },
        991:{
            items:3
        },
        1024:{
            items:3
        },
        1280:{
            items:4
        },
        1440:{
            items:4
        },
        1600:{
            items:4
        },
        1920:{
            items:4
        }
       
    }
      });
  
      //Mostly Downloaded Carousel Code ends here
      

      //Other Widgets Carousel Code starts here 
    $("#otherwidCarousel").owlCarousel({
        autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
        items: 4,
        margin:30,
        responsive:{
        0:{
            items:1
        },
        320:{
            items:1
        },
        480:{
            items:2
        },
        768:{
            items:2
        },
        991:{
            items:3
        },
        1024:{
            items:3
        },
        1280:{
            items:4
        },
        1440:{
            items:4
        },
        1600:{
            items:4
        },
        1920:{
            items:4
        }
       
    }
      });
  
      //Mostly Downloaded Carousel Code ends here



  });