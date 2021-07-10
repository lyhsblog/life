<template>
  <div id="read">
    <div style="position:relative;height:0;z-index:1;">
      <div class="view-fix-top-bar"  style="z-index:1;" :style="{top: toolbar.top}">
        <div class="view-fix-top-bar-back">
          <NuxtLink :to="`/manga/${id}`">
            <i class="iconfont icon-reply"></i>
          </NuxtLink>
        </div>

        <p class="view-fix-top-bar-title">{{ episode.name }}</p>
        <div class="view-fix-top-bar-right">
          <a href="javascript:void(0)" class="collection">
            <i class="iconfont icon-star"></i>
          </a>
          <NuxtLink to="/manga">
            <i class="iconfont icon-home" style="margin-left: 10px"></i>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="view-main-1 readForm" id="cp_img" @click="showToolBar">
      <img v-if="episode.images" :src="episode.images[0]" width="0" height="0" :alt="episode.images[0]" style="min-height: 100vh" />
      <img v-if="episode.images && index > 0" v-for="(image, index) in episode.images" :key="index" :data-src="image" width="0" height="0" :alt="image" v-lazy-load />
    </div>

    <div class="view-fix-bottom-bar" :style="{bottom: toolbar.bottom}">
      <router-link noindex v-if="eid > 0" :to="`/manga/ep/${id}/${eid - 1}`" class="view-fix-bottom-bar-item ad-button">
        <i class="iconfont icon-music-prev"></i>
        <p class="view-fix-bottom-bar-title">上一章</p>
      </router-link>
      <a href="javascript: void(0)" v-else class="view-fix-bottom-bar-item ad-button" style="opacity: 0.6;">
        <i class="iconfont icon-music-prev"></i>
        <p class="view-fix-bottom-bar-title">上一章</p>
      </a>

      <router-link noindex v-if="eid < episodes.length - 1" :to="`/manga/ep/${id}/${eid + 1}`" class="view-fix-bottom-bar-item ad-button">
        <i class="iconfont icon-music-next"></i>
        <p class="view-fix-bottom-bar-title">下一章</p>
      </router-link>
      <a v-else href="javascript: void(0)" class="view-fix-bottom-bar-item ad-button" style="opacity: 0.6;">
        <i class="iconfont icon-music-next"></i>
        <p class="view-fix-bottom-bar-title">下一章</p>
      </a>
    </div>

    <div class="read-section sidebar-main" :style="{left: menu.left}">
      <div class="sidebar-header">
        <i class="sidebar-header-l">章节</i>
        <i class="sidebar-header-r">共{{ episodes.length }}话</i>
      </div>
      <div class="sidebar-content">
        <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 357px;">
          <div class="mCustomScrollBox" style="overflow: hidden;width: auto;height: 519px;overflow-y: scroll;">
            <ul>
              <li v-for="(episode, index) in episodes" :key="index">
                <NuxtLink :to="`/manga/ep/${id}/${index}`">
                  {{ episode.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div class="slimScrollBar"
               style="background: rgb(0, 0, 0); width: 7px; position: absolute; top: 0px; opacity: 0.4; display: none; border-radius: 7px; z-index: 99; right: 1px; height: 30px;"></div>
          <div class="slimScrollRail"
               style="width: 7px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(51, 51, 51); opacity: 0.2; z-index: 90; right: 1px;"></div>
        </div>
      </div>
      <div class="sidebar-btn" @click="openMenu"><i class="read-icon-list"></i>章<br>节</div>
    </div>
    <script type="application/javascript">
      (function() {

        //version 1.0.0

        var adConfig = {
          "ads_host": "a.realsrv.com",
          "syndication_host": "syndication.realsrv.com",
          "idzone": 4127818,
          "popup_fallback": true,
          "popup_force": false,
          "chrome_enabled": true,
          "new_tab": true,
          "frequency_period": 10,
          "frequency_count": 1,
          "trigger_method": 2,
          "trigger_class": "ad-button",
          "only_inline": false,
          "t_venor": false
        };

        window.document.querySelectorAll||(document.querySelectorAll=document.body.querySelectorAll=Object.querySelectorAll=function(o,e,t,i,n){var r=document,c=r.createStyleSheet();for(n=r.all,e=[],t=(o=o.replace(/\[for\b/gi,"[htmlFor").split(",")).length;t--;){for(c.addRule(o[t],"k:v"),i=n.length;i--;)n[i].currentStyle.k&&e.push(n[i]);c.removeRule(0)}return e});var popMagic={version:"1.0.0",cookie_name:"",url:"",config:{},open_count:0,top:null,browser:null,venor_loaded:!1,venor:!1,configTpl:{ads_host:"",syndication_host:"",idzone:"",frequency_period:720,frequency_count:1,trigger_method:1,trigger_class:"",popup_force:!1,popup_fallback:!1,chrome_enabled:!0,new_tab:!1,cat:"",tags:"",el:"",sub:"",sub2:"",sub3:"",only_inline:!1,t_venor:!1,cookieconsent:!0},init:function(o){if(void 0!==o.idzone&&o.idzone){for(var e in this.configTpl)this.configTpl.hasOwnProperty(e)&&(void 0!==o[e]?this.config[e]=o[e]:this.config[e]=this.configTpl[e]);void 0!==this.config.idzone&&""!==this.config.idzone&&(!0!==this.config.only_inline&&this.loadHosted(),this.addEventToElement(window,"load",this.preparePop))}},getCountFromCookie:function(){if(!this.config.cookieconsent)return 0;var o=popMagic.getCookie(popMagic.cookie_name),e=void 0===o?0:parseInt(o);return isNaN(e)&&(e=0),e},shouldShow:function(){if(popMagic.open_count>=popMagic.config.frequency_count)return!1;var o=popMagic.getCountFromCookie();return popMagic.open_count=o,!(o>=popMagic.config.frequency_count)},venorShouldShow:function(){return!popMagic.config.t_venor||popMagic.venor_loaded&&"0"===popMagic.venor},setAsOpened:function(){var o=1;o=0!==popMagic.open_count?popMagic.open_count+1:popMagic.getCountFromCookie()+1,popMagic.config.cookieconsent&&popMagic.setCookie(popMagic.cookie_name,o,popMagic.config.frequency_period)},loadHosted:function(){var o=document.createElement("script");for(var e in o.type="application/javascript",o.async=!0,o.src="//"+this.config.ads_host+"/popunder1000.js",o.id="popmagicldr",this.config)this.config.hasOwnProperty(e)&&"ads_host"!==e&&"syndication_host"!==e&&o.setAttribute("data-exo-"+e,this.config[e]);var t=document.getElementsByTagName("body").item(0);t.firstChild?t.insertBefore(o,t.firstChild):t.appendChild(o)},preparePop:function(){if("object"!=typeof exoJsPop101||!exoJsPop101.hasOwnProperty("add")){if(popMagic.top=self,popMagic.top!==self)try{top.document.location.toString()&&(popMagic.top=top)}catch(o){}if(popMagic.cookie_name="zone-cap-"+popMagic.config.idzone,popMagic.config.t_venor&&popMagic.shouldShow()){var o=new XMLHttpRequest;o.onreadystatechange=function(){o.readyState==XMLHttpRequest.DONE&&(popMagic.venor_loaded=!0,200==o.status&&(popMagic.venor=o.responseText))};var e="https:"!==document.location.protocol&&"http:"!==document.location.protocol?"https:":document.location.protocol;o.open("GET",e+"//"+popMagic.config.syndication_host+"/venor.php",!0);try{o.send()}catch(o){popMagic.venor_loaded=!0}}if(popMagic.buildUrl(),popMagic.browser=popMagic.browserDetector.detectBrowser(navigator.userAgent),popMagic.config.chrome_enabled||"chrome"!==popMagic.browser.name&&"crios"!==popMagic.browser.name){var t=popMagic.getPopMethod(popMagic.browser);popMagic.addEvent("click",t)}}},getPopMethod:function(o){return popMagic.config.popup_force?popMagic.methods.popup:popMagic.config.popup_fallback&&"chrome"===o.name&&o.version>=68&&!o.isMobile?popMagic.methods.popup:o.isMobile?popMagic.methods.default:"chrome"===o.name?popMagic.methods.chromeTab:popMagic.methods.default},buildUrl:function(){var o="https:"!==document.location.protocol&&"http:"!==document.location.protocol?"https:":document.location.protocol,e=top===self?document.URL:document.referrer,t={type:"inline",name:"popMagic",ver:this.version};this.url=o+"//"+this.config.syndication_host+"/splash.php?cat="+this.config.cat+"&idzone="+this.config.idzone+"&type=8&p="+encodeURIComponent(e)+"&sub="+this.config.sub+(""!==this.config.sub2?"&sub2="+this.config.sub2:"")+(""!==this.config.sub3?"&sub3="+this.config.sub3:"")+"&block=1&el="+this.config.el+"&tags="+this.config.tags+"&cookieconsent="+this.config.cookieconsent+"&scr_info="+function(o){var e=o.type+"|"+o.name+"|"+o.ver;return encodeURIComponent(btoa(e))}(t)},addEventToElement:function(o,e,t){o.addEventListener?o.addEventListener(e,t,!1):o.attachEvent?(o["e"+e+t]=t,o[e+t]=function(){o["e"+e+t](window.event)},o.attachEvent("on"+e,o[e+t])):o["on"+e]=o["e"+e+t]},addEvent:function(o,e){var t;if("3"!=popMagic.config.trigger_method)if("2"!=popMagic.config.trigger_method||""==popMagic.config.trigger_method)popMagic.addEventToElement(document,o,e);else{var i,n=[];i=-1===popMagic.config.trigger_class.indexOf(",")?popMagic.config.trigger_class.split(" "):popMagic.config.trigger_class.replace(/\s/g,"").split(",");for(var r=0;r<i.length;r++)""!==i[r]&&n.push("."+i[r]);for(t=document.querySelectorAll(n.join(", ")),r=0;r<t.length;r++)popMagic.addEventToElement(t[r],o,e)}else for(t=document.querySelectorAll("a"),r=0;r<t.length;r++)popMagic.addEventToElement(t[r],o,e)},setCookie:function(o,e,t){if(!this.config.cookieconsent)return!1;t=parseInt(t,10);var i=new Date;i.setMinutes(i.getMinutes()+parseInt(t));var n=encodeURIComponent(e)+"; expires="+i.toUTCString()+"; path=/";document.cookie=o+"="+n},getCookie:function(o){if(!this.config.cookieconsent)return!1;var e,t,i,n=document.cookie.split(";");for(e=0;e<n.length;e++)if(t=n[e].substr(0,n[e].indexOf("=")),i=n[e].substr(n[e].indexOf("=")+1),(t=t.replace(/^\s+|\s+$/g,""))===o)return decodeURIComponent(i)},randStr:function(o,e){for(var t="",i=e||"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=0;n<o;n++)t+=i.charAt(Math.floor(Math.random()*i.length));return t},isValidUserEvent:function(o){return!!("isTrusted"in o&&o.isTrusted&&"ie"!==popMagic.browser.name&&"safari"!==popMagic.browser.name)||0!=o.screenX&&0!=o.screenY},isValidHref:function(o){if(void 0===o||""==o)return!1;return!/\s?javascript\s?:/i.test(o)},findLinkToOpen:function(o){var e=o,t=!1;try{for(var i=0;i<20&&!e.getAttribute("href")&&e!==document&&"html"!==e.nodeName.toLowerCase();)e=e.parentNode,i++;var n=e.getAttribute("target");n&&-1!==n.indexOf("_blank")||(t=e.getAttribute("href"))}catch(o){}return popMagic.isValidHref(t)||(t=!1),t||window.location.href},getPuId:function(){return"ok_"+Math.floor(89999999*Math.random()+1e7)},browserDetector:{browserDefinitions:[["firefox",/Firefox\/([0-9.]+)(?:\s|$)/],["opera",/Opera\/([0-9.]+)(?:\s|$)/],["opera",/OPR\/([0-9.]+)(:?\s|$)$/],["edge",/Edg(?:e|)\/([0-9._]+)/],["ie",/Trident\/7\.0.*rv:([0-9.]+)\).*Gecko$/],["ie",/MSIE\s([0-9.]+);.*Trident\/[4-7].0/],["ie",/MSIE\s(7\.0)/],["safari",/Version\/([0-9._]+).*Safari/],["chrome",/(?!Chrom.*Edg(?:e|))Chrom(?:e|ium)\/([0-9.]+)(:?\s|$)/],["chrome",/(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9.]+)(:?\s|$)/],["bb10",/BB10;\sTouch.*Version\/([0-9.]+)/],["android",/Android\s([0-9.]+)/],["ios",/Version\/([0-9._]+).*Mobile.*Safari.*/],["yandexbrowser",/YaBrowser\/([0-9._]+)/],["crios",/CriOS\/([0-9.]+)(:?\s|$)/]],detectBrowser:function(o){var e=o.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WebOS|Windows Phone/i);for(var t in this.browserDefinitions){var i=this.browserDefinitions[t];if(i[1].test(o)){var n=i[1].exec(o),r=n&&n[1].split(/[._]/).slice(0,3),c=Array.prototype.slice.call(r,1).join("")||"0";return r&&r.length<3&&Array.prototype.push.apply(r,1===r.length?[0,0]:[0]),{name:i[0],version:r.join("."),versionNumber:parseFloat(r[0]+"."+c),isMobile:e}}}return{name:"other",version:"1.0",versionNumber:1,isMobile:e}}},methods:{default:function(o){if(!popMagic.shouldShow()||!popMagic.venorShouldShow()||!popMagic.isValidUserEvent(o))return!0;var e=o.target||o.srcElement,t=popMagic.findLinkToOpen(e);return window.open(t,"_blank"),popMagic.setAsOpened(),popMagic.top.document.location=popMagic.url,void 0!==o.preventDefault&&(o.preventDefault(),o.stopPropagation()),!0},chromeTab:function(o){if(!popMagic.shouldShow()||!popMagic.venorShouldShow()||!popMagic.isValidUserEvent(o))return!0;if(void 0===o.preventDefault)return!0;o.preventDefault(),o.stopPropagation();var e=top.window.document.createElement("a"),t=o.target||o.srcElement;e.href=popMagic.findLinkToOpen(t),document.getElementsByTagName("body")[0].appendChild(e);var i=new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window,screenX:0,screenY:0,clientX:0,clientY:0,ctrlKey:!0,altKey:!1,shiftKey:!1,metaKey:!0,button:0});i.preventDefault=void 0,e.dispatchEvent(i),e.parentNode.removeChild(e),window.open(popMagic.url,"_self"),popMagic.setAsOpened()},popup:function(o){if(!popMagic.shouldShow()||!popMagic.venorShouldShow()||!popMagic.isValidUserEvent(o))return!0;var e="";if(popMagic.config.popup_fallback&&!popMagic.config.popup_force){var t=Math.max(Math.round(.8*window.innerHeight),300);e="menubar=1,resizable=1,width="+Math.max(Math.round(.7*window.innerWidth),300)+",height="+t+",top="+(window.screenY+100)+",left="+(window.screenX+100)}var i=document.location.href,n=window.open(i,popMagic.getPuId(),e);setTimeout(function(){n.location.href=popMagic.url},200),popMagic.setAsOpened(),void 0!==o.preventDefault&&(o.preventDefault(),o.stopPropagation())}}};
        popMagic.init(adConfig);
      })();
    </script>
  </div>
</template>

<script>
import SkeletonParagraph from "../../../../components/skeleton/paragraph";
import SkeletonLine from "../../../../components/skeleton/line";
import Placeholder from "../../../../components/widget-placeholder";
import Empty from "../../../../components/widget-empty";
import Responsive from "../../../../components/widget-responsive";

export default {
  name: "MangaEpisode",
  components: {SkeletonParagraph, SkeletonLine, Placeholder, Empty, Responsive},
  scrollToTop: true,
  head() {
    return  {
      title: `${this.episode.name}-567.WATCH`,
      meta: [
        { charset: 'utf-8' },
      ],
    }
  },
  data() {
    return {
      id: 0,
      eid: 0,
      fetching: true,
      episodes: [],
      episode: {},
      toolbar: {
        mode: 0,
        top: '0px',
        bottom: '0px'
      },
      menu: {
        left: "-212px"
      }
    }
  },
  async asyncData({$axios, params}) {
    const id = Number.parseInt(params.id)
    const eid = Number.parseInt(params.eid)
    const episodes = await $axios.$get("/manga/"+id+"/episodes").then(res => res)
    let episode = {
      name: "NoneEpisode",
      images: [],
    }
    if(episodes.length > eid) {
      episode = episodes[eid]
      const images = episode.content.split("\r\n");
      for (let i = 0; i < images.length - 1; i++) {
        images[i] = 'https://res.567pic.com/manga'+images[i]
      }
      episode.images = images
    }
    return {
      id,
      eid,
      episodes,
      episode
    }
  },
  methods: {
    openMenu() {
      if(this.menu.left === "0px") {
        this.menu.left = "-212px"
      }else {
        this.menu.left = "0px"
      }
    },
    showToolBar() {
      if (this.toolbar.mode === 0) {
        this.toolbar.top = '0px'
        this.toolbar.bottom = '0px'
        this.toolbar.mode = 1
      } else {
        this.toolbar.top = '-60px'
        this.toolbar.bottom = '-60px'
        this.toolbar.mode = 0
      }
    }
  },
}
</script>

<style lang="scss" scoped>

@import '../../../../assets/styles/init';

body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre, form,fieldset,input,textarea,p,blockquote,th,td {
  padding: 0;
  margin: 0;
}
html {
  height: 100%;
  width: 100%;
  font-family: sans-serif;
  line-height: 1.15;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%
}

body {
  font-size: 16px;
  color: #555;
  font-family: "Microsoft Yahei",SimSun,Tahoma,arial,SimHei,sans-serif;
  width: 100%;
}

body::-webkit-scrollbar-track-piece,body ::-webkit-scrollbar-track-piece {
  background-color: transparent
}

body::-webkit-scrollbar,body ::-webkit-scrollbar {
  width: 8px;
  height: 4px
}

body::-webkit-scrollbar-thumb,body ::-webkit-scrollbar-thumb {
  background-color: #ddd;
  background-clip: padding-box;
  min-height: 28px;
  border-radius: 4px
}


fieldset {
  border: 0;
}

ol,ul {
  list-style: none;
}

a {
  text-decoration: none;
  background-color: transparent;
  -webkit-text-decoration-skip: objects;
  color: #555
}

svg:not(:root) {
  overflow: hidden
}

img {
  vertical-align: middle;
  border: 0 none;
}

.view-main-1 {
  font-size: 0;
}

.view-main-1 img {
  width: 100%;
}
.view-fix-top-bar {
  height: 60px;
  line-height: 60px;
  background-color: rgba(11, 6, 0, 0.9);
  position: fixed;
  top: -60px;
  left: 0;
  width: 100%;
  z-index: 97;
  transition: top 0.5s;
  -moz-transition: top 0.5s;
  -webkit-transition: top 0.5s;
  -o-transition: top 0.5s;
}
.view-fix-top-bar-back {
  position: absolute;
  left: 5px;
}
.view-fix-top-bar-title {
  font-size: 15px;
  color: #999999;
  letter-spacing: 0;
  padding-left: 30px;
  padding-right: 90px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.view-fix-top-bar-right {
  width: 84px;
  position: absolute;
  right: 0;
  top: 0;
}

.view-fix-top-bar-right-logo {
  height: 24px;
  vertical-align: top;
  margin-top: 18px;
  margin-right: 10px;
}

.view-fix-bottom-bar {
  display: flex;
  justify-content: space-between;
  height: 60px;
  background-color: rgba(11, 6, 0, 0.9);
  position: fixed;
  bottom: -60px;
  left: 0;
  width: 100%;
  z-index: 97;
  font-size: 0;
  transition: bottom 0.5s;
  -moz-transition: bottom 0.5s;
  -webkit-transition: bottom 0.5s;
  -o-transition: top 0.5s;
}
.view-fix-bottom-bar-item {
  width: 20%;
  text-align: center;
  display: inline-block;
}

.view-fix-bottom-bar-logo {
  height: 24px;
  margin-top: 8px;
}

.view-fix-bottom-bar-title {
  font-size: 12px;
  color: #999999;
  letter-spacing: 0;
  text-align: center;
  margin-top: 4px;
}

.read-section {
  height: 55vh;
}

.read-section.sidebar-main {
  left: -212px;
  width: 212px;
}

.sidebar-main {
  position: fixed;
  top: 165px;
  bottom: 200px;
  z-index: 9;
}

.read-section .sidebar-header {
  border-top-right-radius: 4px;
}

.sidebar-header {
  height: 40px;
  line-height: 40px;
  background: #333;
}

.sidebar-header-l {
  float: left;
  margin-left: 10px;
  font-size: 16px;
  color: #fff;
  font-style: normal;
}

.sidebar-header-r {
  float: right;
  margin-right: 15px;
  font-size: 14px;
  color: #fff;
  font-style: normal;
}

.read-section .sidebar-content {
  padding-left: 20px;
  bottom: 0;
  border-bottom-right-radius: 4px;
}
.sidebar-content {
  overflow-x: hidden;
  overflow-y: hidden;
  position: absolute;
  top: 40px;
  right: 0;
  left: 0;
  background: #3c3c3c;
}

.mCustomScrollBox {
  position: relative;
  overflow: hidden;
  height: 100%;
  max-width: 100%;
  outline: 0;
  direction: ltr;
}
.read-section .sidebar-content li {
  position: relative;
  height: 45px;
  line-height: 45px;
  padding-left: 10px;
}

.read-section .sidebar-content li a {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
  width: 80%;
  font-size: 14px;
  color: #b0b0b0;
}
.read-section .sidebar-btn {
  right: -40px;
  border-radius: 0 8px 8px 0;
}

.sidebar-btn {
  position: absolute;
  top: 50%;
  width: 40px;
  height: auto;
  margin-top: -50px;
  padding: 18px 0;
  text-align: center;
  font-size: 14px;
  line-height: 16px;
  color: #b0b0b0;
  background: #3c3c3c;
  cursor: pointer;
}

.sidebar-btn .read-icon-list {
  display: block;
  margin: 0 auto 10px;
}

.read-icon-list {
  width: 16px;
  height: 13px;
}

#cp_img {
  min-height: 100vh;
  width: 100%;
  margin: auto;
  > img {
    width: 100%;
  }
}
@media (min-width: 768px) {
  #cp_img {
    max-width: 768px;
    margin: auto;
  }
}

.iconfont {
  font-size: 2rem;
  color: #c9c0c0;
}
</style>
