﻿function load_home() {
  $("body").append(
    '<div id="product-image-popup-gallery" class="pswp " tabindex="-1" role="dialog" aria-hidden="true"><div class="pswp__bg"></div><div class="pswp__scroll-wrap"><div class="pswp__container"><div class="pswp__item"></div><div class="pswp__item"></div><div class="pswp__item"></div></div><div class="pswp__ui pswp__ui--hidden"><div class="pswp__top-bar"><div class="pswp__counter"></div><button class="pswp__button pswp__button--close" title="Close (Esc)"></button><button class="pswp__button pswp__button--share" title="Share"></button><button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button><button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button><div class="pswp__preloader"><div class="pswp__preloader__icn"><div class="pswp__preloader__cut"><div class="pswp__preloader__donut"></div></div></div></div></div>\x3c!-- <div class="pswp__loading-indicator"><div class="pswp__loading-indicator__line"></div></div> --\x3e<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"><div class="pswp__share-tooltip">\x3c!-- <a href="http://facebook.com/" class="pswp__share--facebook"></a><a href="https://twitter.com/" class="pswp__share--twitter"></a><a href="https://www.pinterest.com/" class="pswp__share--pinterest"></a><a href="#" download class="pswp__share--download"></a> --\x3e</div></div><button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button><button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button><div class="pswp__caption"><div class="pswp__caption__center"></div></div></div></div></div>'
  );
}
$(function () {
  !(function (t) {
    for (
      var e = function (t) {
          for (
            var e, i, s, a, n = t.childNodes, r = n.length, o = [], p = 0;
            p < r;
            p++
          )
            1 === (e = n[p]).nodeType &&
              ((s = (i = e.children[0]).getAttribute("data-size").split("x")),
              (a = {
                src: i.getAttribute("href"),
                w: parseInt(s[0], 10),
                h: parseInt(s[1], 10),
              }),
              e.children.length > 1 && (a.title = e.children[1].innerHTML),
              i.children.length > 0 &&
                (a.msrc = i.children[0].getAttribute("src")),
              (a.el = e),
              o.push(a));
          return o;
        },
        i = function t(e, i) {
          return e && (i(e) ? e : t(e.parentNode, i));
        },
        s = function (t) {
          (t = t || window.event).preventDefault
            ? t.preventDefault()
            : (t.returnValue = !1);
          var e = t.target || t.srcElement,
            s = i(e, function (t) {
              return t.tagName && "DIV" === t.tagName.toUpperCase();
            });
          if (s) {
            for (
              var n,
                r = s.parentNode,
                o = s.parentNode.childNodes,
                p = o.length,
                l = 0,
                d = 0;
              d < p;
              d++
            )
              if (1 === o[d].nodeType) {
                if (o[d] === s) {
                  n = l;
                  break;
                }
                l++;
              }
            return n >= 0 && a(n, r), !1;
          }
        },
        a = function (t, i, s, a) {
          var n,
            r,
            o = document.querySelectorAll(".pswp")[0];
          if (
            ((r = e(i)),
            (n = {
              galleryUID: i.getAttribute("data-pswp-uid"),
              getThumbBoundsFn: function (t) {
                var e = r[t].el.getElementsByTagName("img")[0],
                  i = window.pageYOffset || document.documentElement.scrollTop,
                  s = e.getBoundingClientRect();
                return { x: s.left, y: s.top + i, w: s.width };
              },
            }),
            a)
          )
            if (n.galleryPIDs) {
              for (var p = 0; p < r.length; p++)
                if (r[p].pid == t) {
                  n.index = p;
                  break;
                }
            } else n.index = parseInt(t, 10) - 1;
          else n.index = parseInt(t, 10);
          isNaN(n.index) ||
            (s && (n.showAnimationDuration = 0),
            new PhotoSwipe(o, PhotoSwipeUI_Default, r, n).init());
        },
        n = document.querySelectorAll(t),
        r = 0,
        o = n.length;
      r < o;
      r++
    )
      n[r].setAttribute("data-pswp-uid", r + 1), (n[r].onclick = s);
    var p = (function () {
      var t = window.location.hash.substring(1),
        e = {};
      if (t.length < 5) return e;
      for (var i = t.split("&"), s = 0; s < i.length; s++)
        if (i[s]) {
          var a = i[s].split("=");
          a.length < 2 || (e[a[0]] = a[1]);
        }
      return e.gid && (e.gid = parseInt(e.gid, 10)), e;
    })();
    p.pid && p.gid && a(p.pid, n[p.gid - 1], !0, !0);
  })(".product-image-gallery");
  var t = function () {
    var t = document.querySelectorAll(".pswp")[0],
      e = $(".product-image-gallery"),
      i = e.find(".product-gallery-item").attr("data-med"),
      s = e
        .find(".product-gallery-item")
        .attr("data-size")
        .split("x"),
      a = s[0],
      n = s[1];
    items = [{ src: i, w: a, h: n }];
    var r = {
      history: !1,
      focus: !1,
      showAnimationDuration: 0,
      hideAnimationDuration: 0,
      closeOnScroll: !1,
    };
    new PhotoSwipe(t, PhotoSwipeUI_Default, items, r).init();
  };
  document.getElementById("zoom-images-button").onclick = t;
  var e, i;
  $(".product-image-gallery .product-gallery-item img").each(function () {
    (e = this.naturalWidth),
      (i = this.naturalHeight),
      $(this)
        .parent()
        .attr("data-size", e + "x" + i),
      $(this)
        .parent()
        .attr("data-med-size", e + "x" + i);
  });
}),

setTimeout(() => {
    load_home();
}, 500);

