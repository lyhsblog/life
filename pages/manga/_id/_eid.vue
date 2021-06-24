<template>
  <div id="read">
    <placeholder
      :data="episode.images.length"
      :loading="fetching"
    >
      <template #loading>
        <ul class="article-list-skeleton" key="skeleton">
          <li v-for="item in 5" :key="item" class="item">
            <div class="thumb">
              <skeleton-base />
            </div>
            <div class="content">
              <div class="title">
                <skeleton-line />
              </div>
              <div class="description">
                <skeleton-paragraph :lines="4" />
              </div>
            </div>
          </li>
        </ul>
      </template>
      <template #placeholder>
        <empty class="article-empty" key="empty">
          NO DATA,TRY OTHER MENU
        </empty>
      </template>
      <template #default>
        <div class="view-main-1 readForm" id="cp_img">
          <img v-if="episode.images" v-for="(image, index) in episode.images" :key="index" class="lazy" data-original="https://cdn.jsdelivr.net/gh/ybzc-gg/sdfs@0.0.2/images/loading.gif" :src="image" style="min-height: 100px" alt="" />
        </div>
      </template>
    </placeholder>

    <div class="view-fix-bottom-bar">
      <router-link v-if="eid > 0" :to="`/manga/${id}/${eid - 1}`" class="view-fix-bottom-bar-item ad-button">
        <img class="view-fix-bottom-bar-logo" src="https://cdn.jsdelivr.net/gh/ybzc-gg/sdfs@0.0.2/images/view-bottom-logo-5.png">
        <p class="view-fix-bottom-bar-title">上一章</p>
      </router-link>
      <a href="javascript: void(0)" v-else class="view-fix-bottom-bar-item ad-button" style="opacity: 0.6;">
        <img class="view-fix-bottom-bar-logo" src="https://cdn.jsdelivr.net/gh/ybzc-gg/sdfs@0.0.2/images/view-bottom-logo-5.png">
        <p class="view-fix-bottom-bar-title">上一章</p>
      </a>

      <router-link v-if="eid < episodes.length - 1" :to="`/manga/${id}/${eid + 1}`" class="view-fix-bottom-bar-item ad-button">
        <img class="view-fix-bottom-bar-logo" src="https://cdn.jsdelivr.net/gh/ybzc-gg/sdfs@0.0.2/images/view-bottom-logo-6.png">
        <p class="view-fix-bottom-bar-title">下一章</p>
      </router-link>
      <a v-else href="javascript: void(0)" class="view-fix-bottom-bar-item ad-button" style="opacity: 0.6;">
        <img class="view-fix-bottom-bar-logo" src="https://cdn.jsdelivr.net/gh/ybzc-gg/sdfs@0.0.2/images/view-bottom-logo-6.png">
        <p class="view-fix-bottom-bar-title">下一章</p>
      </a>
    </div>
  </div>
</template>

<script>
import SkeletonParagraph from "../../../components/skeleton/paragraph";
import SkeletonLine from "../../../components/skeleton/line";
import Placeholder from "../../../components/widget-placeholder";
import Empty from "../../../components/widget-empty";
import Responsive from "../../../components/widget-responsive";

export default {
  name: "MangaEpisode",
  components: {SkeletonParagraph, SkeletonLine, Placeholder, Empty, Responsive},
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
    }
  },
  computed: {
    episode: function () {
      if(this.episodes.length > this.eid) {
        const episode = this.episodes[this.eid]
        const images = episode.content.split("\r\n");
        for (let i = 0; i < images.length; i++) {
          images[i] = 'http://res.567pic.com/manga'+images[i]
        }
        episode.images = images
        return episode
      }
      return {
        name: "Name",
        images: [],
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.id = Number.parseInt(this.$route.params.id)
      this.eid = Number.parseInt(this.$route.params.eid)
      this.loadEpisodes()
    },
    async loadEpisodes() {
      this.fetching = true
      const episodes = await this.$axios.get("/manga/"+this.id+"/episodes")
      this.episodes = []
      this.episodes.push(...episodes.data)
      this.fetching = false
    }
  },
  watch: {
    '$route'(to, from) {
      if (to.fullPath !== from.fullPath) {
        this.$nextTick(() => {
          this.init()
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "https://cdn.jsdelivr.net/gh/ybzc-gg/sdfs@0.0.2/css/mstyle.css";
  @import "https://cdn.jsdelivr.net/gh/ybzc-gg/sdfs@0.0.2/css/p.css";
  @import '../../../assets/styles/init';
  .article-list-skeleton {
    padding: 0;
    margin: $gap 0;
    list-style: none;
    overflow: hidden;

    .item {
      display: flex;
      height: 10rem;
      padding: $sm-gap;
      margin-bottom: $lg-gap;
      @include common-bg-module();
      @include radius-box($sm-radius);
      &:last-child {
        margin-bottom: 0;
      }

      .thumb {
        height: 100%;
        width: 15rem;
      }

      .content {
        margin-left: $lg-gap;
        flex-grow: 1;

        .title {
          height: 1.4em;
          width: 36%;
        }
        .description {
          margin-top: $sm-gap;
        }
      }
    }
  }

  #read {
    .view-fix-bottom-bar {
      display: flex;
      justify-content: space-between;
      position: relative !important;
      bottom: 0 !important;
    }
    #cp_img {
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
    .sidebar-main {
      position: sticky;
      top: 0;
      bottom: 0;
    }
    .sidebar-btn {
      height: auto;
    }
  }
</style>
