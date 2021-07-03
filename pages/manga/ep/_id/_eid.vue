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
      <img v-lazy-load v-if="episode.images && index > 0" v-for="(image, index) in episode.images" :key="index" :src="image" width="0" height="0" :alt="image" />
    </div>

    <div class="view-fix-bottom-bar" :style="{bottom: toolbar.bottom}">
      <router-link v-if="eid > 0" :to="`/manga/ep/${id}/${eid - 1}`" class="view-fix-bottom-bar-item ad-button">
        <i class="iconfont icon-music-prev"></i>
        <p class="view-fix-bottom-bar-title">上一章</p>
      </router-link>
      <a href="javascript: void(0)" v-else class="view-fix-bottom-bar-item ad-button" style="opacity: 0.6;">
        <i class="iconfont icon-music-prev"></i>
        <p class="view-fix-bottom-bar-title">上一章</p>
      </a>

      <router-link v-if="eid < episodes.length - 1" :to="`/manga/ep/${id}/${eid + 1}`" class="view-fix-bottom-bar-item ad-button">
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
      title: `${this.episode.name}-567WATCH`,
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
      for (let i = 0; i < images.length; i++) {
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
