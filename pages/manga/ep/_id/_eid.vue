<template>
  <div id="read">
    <div style="position:relative;height:0;z-index:2147483647;">
      <div class="view-fix-top-bar"  style="z-index:2147483647;" :style="{top: toolbar.top}">
        <NuxtLink :to="`/manga/${id}`">
          <img class="view-fix-top-bar-back" src="https://cdn.jsdelivr.net/gh/ybzc-gg/sdfs@0.0.2/images/view-back-logo.png">
        </NuxtLink>
        <p class="view-fix-top-bar-title">{{ episode.name }}</p>
        <div class="view-fix-top-bar-right">
          <a href="javascript:void(0)" class="collection">
            <img class="view-fix-top-bar-right-logo" src="https://cdn.jsdelivr.net/gh/ybzc-gg/sdfs@0.0.2/images/view-top-logo-1.png">
          </a>
          <NuxtLink to="/manga">
            <img class="view-fix-top-bar-right-logo" src="https://cdn.jsdelivr.net/gh/ybzc-gg/sdfs@0.0.2/images/view-top-logo-2.png">
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="view-main-1 readForm" id="cp_img" @click="showToolBar">
      <img v-if="episode.images" v-for="(image, index) in episode.images" :key="index" class="lazy" data-original="https://cdn.jsdelivr.net/gh/ybzc-gg/sdfs@0.0.2/images/loading.gif" :src="image" style="min-height: 100px" alt="" />
    </div>

    <div class="view-fix-bottom-bar" :style="{bottom: toolbar.bottom}">
      <router-link v-if="eid > 0" :to="`/manga/ep/${id}/${eid - 1}`" class="view-fix-bottom-bar-item ad-button">
        <img class="view-fix-bottom-bar-logo" src="https://cdn.jsdelivr.net/gh/ybzc-gg/sdfs@0.0.2/images/view-bottom-logo-5.png">
        <p class="view-fix-bottom-bar-title">上一章</p>
      </router-link>
      <a href="javascript: void(0)" v-else class="view-fix-bottom-bar-item ad-button" style="opacity: 0.6;">
        <img class="view-fix-bottom-bar-logo" src="https://cdn.jsdelivr.net/gh/ybzc-gg/sdfs@0.0.2/images/view-bottom-logo-5.png">
        <p class="view-fix-bottom-bar-title">上一章</p>
      </a>

      <router-link v-if="eid < episodes.length - 1" :to="`/manga/ep/${id}/${eid + 1}`" class="view-fix-bottom-bar-item ad-button">
        <img class="view-fix-bottom-bar-logo" src="https://cdn.jsdelivr.net/gh/ybzc-gg/sdfs@0.0.2/images/view-bottom-logo-6.png">
        <p class="view-fix-bottom-bar-title">下一章</p>
      </router-link>
      <a v-else href="javascript: void(0)" class="view-fix-bottom-bar-item ad-button" style="opacity: 0.6;">
        <img class="view-fix-bottom-bar-logo" src="https://cdn.jsdelivr.net/gh/ybzc-gg/sdfs@0.0.2/images/view-bottom-logo-6.png">
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
        images[i] = 'http://res.567pic.com/manga'+images[i]
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

<style lang="scss">
@import "https://cdn.jsdelivr.net/gh/ybzc-gg/sdfs@0.0.2/css/reset.css";
@import "https://cdn.jsdelivr.net/gh/ybzc-gg/sdfs@0.0.2/css/mstyle.css";
@import "https://cdn.jsdelivr.net/gh/ybzc-gg/sdfs@0.0.2/css/pc_read.css";
@import "https://cdn.jsdelivr.net/gh/ybzc-gg/sdfs@0.0.2/css/p.css";

@import '../../../../assets/styles/init';

body {
  padding-top: 0 !important;
}

#read {
  padding-top: 0;

  .view-fix-bottom-bar {
    display: flex;
    justify-content: space-between;
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

  .read-section {
    height: 55vh;
  }
  .sidebar-btn {
    height: auto;
  }
}
</style>
