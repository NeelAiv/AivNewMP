window.FontAwesomeCdnConfig={autoA11y:{enabled:!1},asyncLoading:{enabled:!1},reporting:{enabled:!1},useUrl:"use.fontawesome.com",faCdnUrl:"https://cdn.fontawesome.com:443",code:"8939e63c3b"},function(){function e(e){var t,n,i,o;e=e||"fa",t=document.querySelectorAll("."+e),Array.prototype.forEach.call(t,function(e){n=e.getAttribute("title"),e.setAttribute("aria-hidden","true"),i=!e.nextElementSibling||!e.nextElementSibling.classList.contains("sr-only"),n&&i&&((o=document.createElement("span")).innerHTML=n,o.classList.add("sr-only"),e.parentNode.insertBefore(o,e.nextSibling))})}!function(){"use strict";function e(){for(;s.length;)s[0](),s.shift()}function t(e){this.a=r,this.b=void 0,this.f=[];var t=this;try{e(function(e){!function e(t,n){if(t.a==r){if(n==t)throw new TypeError;var a=!1;try{var s=n&&n.then;if(null!=n&&"object"==typeof n&&"function"==typeof s)return void s.call(n,function(n){a||e(t,n),a=!0},function(e){a||i(t,e),a=!0})}catch(e){return void(a||i(t,e))}t.a=0,t.b=n,o(t)}}(t,e)},function(e){i(t,e)})}catch(e){i(t,e)}}function n(e){return new t(function(t){t(e)})}function i(e,t){if(e.a==r){if(t==e)throw new TypeError;e.a=1,e.b=t,o(e)}}function o(e){!function(e){s.push(e),1==s.length&&a()}(function(){if(e.a!=r)for(;e.f.length;){var t=(o=e.f.shift())[0],n=o[1],i=o[2],o=o[3];try{0==e.a?i("function"==typeof t?t.call(void 0,e.b):e.b):1==e.a&&("function"==typeof n?i(n.call(void 0,e.b)):o(e.b))}catch(e){o(e)}}})}var a,s=[];a=function(){setTimeout(e)};var r=2;t.prototype.g=function(e){return this.c(void 0,e)},t.prototype.c=function(e,n){var i=this;return new t(function(t,a){i.f.push([e,n,t,a]),o(i)})},window.Promise||(window.Promise=t,window.Promise.resolve=n,window.Promise.reject=function(e){return new t(function(t,n){n(e)})},window.Promise.race=function(e){return new t(function(t,i){for(var o=0;o<e.length;o+=1)n(e[o]).c(t,i)})},window.Promise.all=function(e){return new t(function(t,i){function o(n){return function(i){s[n]=i,(a+=1)==e.length&&t(s)}}var a=0,s=[];0==e.length&&t(s);for(var r=0;r<e.length;r+=1)n(e[r]).c(o(r),i)})},window.Promise.prototype.then=t.prototype.c,window.Promise.prototype.catch=t.prototype.g)}(),function(){function e(e){this.el=e;for(var t=e.className.replace(/^\s+|\s+$/g,"").split(/\s+/),i=0;i<t.length;i++)n.call(this,t[i])}if(!(void 0===window.Element||"classList"in document.documentElement)){var t=Array.prototype,n=t.push,i=t.splice,o=t.join;e.prototype={add:function(e){this.contains(e)||(n.call(this,e),this.el.className=this.toString())},contains:function(e){return-1!=this.el.className.indexOf(e)},item:function(e){return this[e]||null},remove:function(e){if(this.contains(e)){for(var t=0;t<this.length&&this[t]!=e;t++);i.call(this,t,1),this.el.className=this.toString()}},toString:function(){return o.call(this," ")},toggle:function(e){return this.contains(e)?this.remove(e):this.add(e),this.contains(e)}},window.DOMTokenList=e,function(e,t,n){Object.defineProperty?Object.defineProperty(e,t,{get:n}):e.__defineGetter__(t,n)}(Element.prototype,"classList",function(){return new e(this)})}}();var t=null;!function(){function e(e,t){document.addEventListener?e.addEventListener("scroll",t,!1):e.attachEvent("scroll",t)}function n(e){this.a=document.createElement("div"),this.a.setAttribute("aria-hidden","true"),this.a.appendChild(document.createTextNode(e)),this.b=document.createElement("span"),this.c=document.createElement("span"),this.h=document.createElement("span"),this.f=document.createElement("span"),this.g=-1,this.b.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;",this.c.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;",this.f.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;",this.h.style.cssText="display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;",this.b.appendChild(this.h),this.c.appendChild(this.f),this.a.appendChild(this.b),this.a.appendChild(this.c)}function i(e,t){e.a.style.cssText="max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;left:-999px;white-space:nowrap;font:"+t+";"}function o(e){var t=e.a.offsetWidth,n=t+100;return e.f.style.width=n+"px",e.c.scrollLeft=n,e.b.scrollLeft=e.b.scrollWidth+100,e.g!==t&&(e.g=t,!0)}function a(t,n){function i(){var e=a;o(e)&&e.a.parentNode&&n(e.g)}var a=t;e(t.b,i),e(t.c,i),o(t)}function s(e,t){var n=t||{};this.family=e,this.style=n.style||"normal",this.weight=n.weight||"normal",this.stretch=n.stretch||"normal"}function r(){if(null===d){var e=document.createElement("div");try{e.style.font="condensed 100px sans-serif"}catch(e){}d=""!==e.style.font}return d}function c(e,t){return[e.style,e.weight,r()?e.stretch:"","100px",t].join(" ")}var l=null,d=null,f=null;s.prototype.load=function(e,t){var o=this,s=e||"BESbswy",r=t||3e3,d=(new Date).getTime();return new Promise(function(e,t){if(null===f&&(f=!!window.FontFace),f){var u=new Promise(function(e,t){!function n(){(new Date).getTime()-d>=r?t():document.fonts.load(c(o,o.family),s).then(function(t){1<=t.length?e():setTimeout(n,25)},function(){t()})}()}),h=new Promise(function(e,t){setTimeout(t,r)});Promise.race([h,u]).then(function(){e(o)},function(){t(o)})}else!function(e){document.body?e():document.addEventListener?document.addEventListener("DOMContentLoaded",function t(){document.removeEventListener("DOMContentLoaded",t),e()}):document.attachEvent("onreadystatechange",function t(){"interactive"!=document.readyState&&"complete"!=document.readyState||(document.detachEvent("onreadystatechange",t),e())})}(function(){function f(){var t;(t=-1!=p&&-1!=w||-1!=p&&-1!=v||-1!=w&&-1!=v)&&((t=p!=w&&p!=v&&w!=v)||(null===l&&(t=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent),l=!!t&&(536>parseInt(t[1],10)||536===parseInt(t[1],10)&&11>=parseInt(t[2],10))),t=l&&(p==y&&w==y&&v==y||p==g&&w==g&&v==g||p==b&&w==b&&v==b)),t=!t),t&&(E.parentNode&&E.parentNode.removeChild(E),clearTimeout(x),e(o))}var u=new n(s),h=new n(s),m=new n(s),p=-1,w=-1,v=-1,y=-1,g=-1,b=-1,E=document.createElement("div"),x=0;E.dir="ltr",i(u,c(o,"sans-serif")),i(h,c(o,"serif")),i(m,c(o,"monospace")),E.appendChild(u.a),E.appendChild(h.a),E.appendChild(m.a),document.body.appendChild(E),y=u.a.offsetWidth,g=h.a.offsetWidth,b=m.a.offsetWidth,function e(){if((new Date).getTime()-d>=r)E.parentNode&&E.parentNode.removeChild(E),t(o);else{var n=document.hidden;!0!==n&&void 0!==n||(p=u.a.offsetWidth,w=h.a.offsetWidth,v=m.a.offsetWidth,f()),x=setTimeout(e,50)}}(),a(u,function(e){p=e,f()}),i(u,c(o,'"'+o.family+'",sans-serif')),a(h,function(e){w=e,f()}),i(h,c(o,'"'+o.family+'",serif')),a(m,function(e){v=e,f()}),i(m,c(o,'"'+o.family+'",monospace'))})})},t=s}();var n=function(e,n){for(var i=n.prefix,o=function(e){var n=e.weight?"-"+e.weight:"",o=e.style?"-"+e.style:"",a=e.className?"-"+e.className:"",s=e.className?"-"+e.className+n+o:"",r=document.getElementsByTagName("html")[0].classList,c=function(e){r.add(i+a+"-"+e),r.add(i+s+"-"+e)},l=function(e){r.remove(i+a+"-"+e),r.remove(i+s+"-"+e)};c("loading"),new t(e.familyName).load(e.testString).then(function(){c("ready"),l("loading")},function(){c("failed"),l("loading")})},a=0;a<e.length;a++)o(e[a])},i=function(e){var t=document.createElement("link");t.href=e,t.media="all",t.rel="stylesheet",document.getElementsByTagName("head")[0].appendChild(t)},o=function(e){!function(e,t,n){function i(){s.addEventListener&&s.removeEventListener("load",i),s.media=n||"all"}var o,a=window.document,s=a.createElement("link");if(t)o=t;else{var r=(a.body||a.getElementsByTagName("head")[0]).childNodes;o=r[r.length-1]}var c=a.styleSheets;s.rel="stylesheet",s.href=e,s.media="only x",function e(t){return a.body?t():void setTimeout(function(){e(t)})}(function(){o.parentNode.insertBefore(s,t?o:o.nextSibling)});var l=function(e){for(var t=s.href,n=c.length;n--;)if(c[n].href===t)return e();setTimeout(function(){l(e)})};s.addEventListener&&s.addEventListener("load",i),s.onloadcssdefined=l,l(i)}(e)},a=function(e){var t=document.createElement("script"),n=document.scripts[0];t.src=e,n.parentNode.appendChild(t)};try{if(window.FontAwesomeCdnConfig){var s=window.FontAwesomeCdnConfig,r=s.useUrl,c=s.faCdnUrl,l=s.code,d="FontAwesome",f=e.bind(e,"fa"),u=function(){};s.autoA11y.enabled&&(function(e){var t,n=[],i=document,o=i.documentElement.doScroll,a="DOMContentLoaded",s=(o?/^loaded|^c/:/^loaded|^i|^c/).test(i.readyState);s||i.addEventListener(a,t=function(){for(i.removeEventListener(a,t),s=1;t=n.shift();)t()}),s?setTimeout(e,0):n.push(e)}(f),function(e){"undefined"!=typeof MutationObserver&&new MutationObserver(e).observe(document,{childList:!0,subtree:!0})}(f)),s.reporting.enabled&&function(e,t){var n=!1;return e.split(",").forEach(function(e){var i=new RegExp(e.trim().replace(".","\\.").replace("*","(.*)"));t.match(i)&&(n=!0)}),n}(s.reporting.domains,location.host)&&a(c+"/js/stats.js"),cssUrl="https://"+r+"/"+l+".css",new t(d).load("ï‰€").then(function(){((window.FontAwesomeHooks||{}).loaded||u)()},u),s.asyncLoading.enabled?o(cssUrl):i(cssUrl),n([{familyName:d,testString:"ï‰€"}],{prefix:"fa-events-icons"})}}catch(e){}}();