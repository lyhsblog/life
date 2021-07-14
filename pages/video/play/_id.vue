<template>
  <div id="video-page" :class="{dark: isDark}">
    <div id="video-box" >
      <d-player
        :options="options"
        ref="player"
      >
      </d-player>
    </div>

    <div class="info">
      <div class="item-content">
        <div class="item-body">
          <h5 class="item-title">
            {{ video.name }}
            <span v-if="crrEp != null">
              {{`[EP:${crrEp.title}]`}}
            </span>
          </h5>
          <div class="item-meta">
              <span class="date">
                <i class="iconfont icon-clock"></i>
                <span>{{ humanlizeDate(video.updateTime) }}</span>
              </span>
            <span class="views">
                <i class="iconfont icon-eye"></i>
                <span>{{video.clicks || 0}}</span>
              </span>
            <span class="comments">
                <i class="iconfont icon-comment"></i>
                <span>{{ video.comments || 0 }}</span>
              </span>
            <span class="tags">
                <i class="iconfont icon-tag"></i>
                <span>{{video.tags.length}}</span>
              </span>
            <span class="categories">
                <i class="iconfont icon-list"></i>
                <router-link
                  :to="`/video/${video.category.name}/0`"
                >
                  {{ video.category.name || 'No category'}}
                </router-link>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="episodes.length > 0">
      <div class="block-title">
        <button
          class="block-button"
          :disabled="false"
        >
        <span class="icon">
          <i class="iconfont icon-peachblossom"></i>
        </span>
          <div class="text">EPISODES</div>
        </button>
      </div>
      <div class="related">
        <ul class="articles">
          <li
            class="item"
            v-for="episode in episodes"
            :key="episode.id"
          >
            <router-link
              class="item-article"
              :to="`/video/play/${video.id}/${episode.id}`"
            >
              <div class="title">{{episode.title}}</div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="comment">
      <comment
        :fetching="fetching"
        :post-id="video.id"
        :likes="video.tags.length"
      />
    </div>
  </div >
</template>

<script>
import Comment from "../../../components/comment";
import Hls from "hls.js"
import {timeAgo} from "../../../transforms/moment";
export default {
  components: {Comment},
  head() {
    return  {
      title: `${this.video?.name}-567.WATCH`,
      meta: [
        { charset: 'utf-8' },
        {
          hid: 'description',
          name: 'description',
          content: `${this.video?.name}`
        }
      ],
    }
  },
  data() {
    return {
      fetching: false,
      video: {},
      episodes: [],
      crrEp: null,
      options: {
        server: true,
        video: {
          url: 'http://static.smartisanos.cn/common/video/t1-ui.mp4',
          type: 'customHls',
          customType: {
            customHls: function (video, player) {
              const hls = new Hls();
              hls.loadSource(video.src);
              hls.attachMedia(video);
            }
          }
        },
        autoplay: false,
        contextmenu: [
          {
            text: '@567WATCH',
            link: 'https://567.watch'
          }
        ]
      },
      player: null,
    }
  },
  computed: {
    isDark: function () {
      return this.$store.state.theme === 'dark'
    }
  },
  async asyncData({$axios, params}) {
    const video = await $axios.$get(`/av/${params.id}`).then(res => res)

    const c_arr = video.content.split("\r\n");
    let episodes = []
    if(c_arr.length > 0) {
      c_arr.forEach((value, index) => {
        const e_arr = value.split("@@")
        if(e_arr.length === 2) {
          const episode = {
            id: index,
            title: e_arr[0],
            url: `https://video.567.watch${e_arr[1]}`,
            pic: `https://video.567.watch${video.cover}`
          }
          episodes.push(episode)
        }
      })
    }

    let crrEp = null

    if(episodes.length > 0) {
      crrEp = episodes[0]

      if(params.ep) {
        crrEp = episodes[params.ep]
      }
    }

    if(process.server) {
      return {
        video,
        episodes,
        crrEp,
      }
    }

    const hls = {
      type: 'customHls',
      customType: {
        customHls: function (video, player) {
          const hls = new Hls();
          hls.loadSource(video.src);
          hls.attachMedia(video);
        },
      },
    }
    const options = {
      server: false,
      video: {
        url: `https://video.567.watch${video.content}`,
        ...hls
      },
      autoplay: true,
      contextmenu: [
        {
          text: '@567WATCH',
          link: 'https://567.watch'
        }
      ]
    }

    if(episodes.length > 0) {

      for (let i = 0; i < episodes.length; i++) {
        episodes[i] = {...episodes[i], ...hls}
      }

      options.video = episodes[0]

      if(params.ep) {
        options.video = episodes[params.ep]
      }
    }

    return {
      video,
      episodes,
      crrEp,
      options
    }
  },
  mounted() {
    this.player = this.$refs.player.dp
    if(this.options.server) {
      const hls = {
        type: 'customHls',
        customType: {
          customHls: function (video, player) {
            const hls = new Hls();
            hls.loadSource(video.src);
            hls.attachMedia(video);
          }
        }
      }
      if(this.crrEp != null) {
        this.crrEp = {...this.crrEp, ...hls}
        this.player.switchVideo(this.crrEp)
      } else {
        let video = {
          url: `https://video.567.watch${this.video.content}`,
          ...hls
        }
        this.player.switchVideo(video)
      }
    }
  },
  methods: {
    humanlizeDate: function (date) {
      return timeAgo(date, 'en')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/init';

#video-page {
  #video-box {
    height: 230px;
    display: flex;
    flex-flow: column;
    justify-content: center;
  }

  @media (min-width: 768px) {
    #video-box {
      height: 500px;
    }
  }

  @media (min-width: 1024px) {
    #video-box {
      height: 350px;
    }
  }

  .info {
    position: relative;
    margin-bottom: $gap;
    @include radius-box($sm-radius);

    &:last-child {
      margin: 0;
    }

    > .item-content {
      $height: $gap * 15;
      $padding: $sm-gap;
      $content-height: $height - ($padding * 2);
      display: block;
      height: auto;
      padding: $sm-gap $sm-gap;
      overflow: hidden;
      @include common-bg-module($transition-time-fast);

      > .item-body {
        float: right;
        width: 100%;
        height: auto;
        > .item-title {
          margin-top: 3px;
          margin-bottom: $sm-gap;
          font-weight: bold;
          //color: $link-color-hover;
          @include text-overflow();

          > a {
            margin-left: 0;
            transition: margin $transition-time-normal;
            border-bottom: 1px solid transparent;
            text-decoration: none;
            &:hover {
              border-color: initial;
              margin-left: $xs-gap;
            }
          }
        }

        > .item-description {
          height: 2rem;
          margin: 0 0 .5em;
          line-height: 1.8em;
          text-overflow: ellipsis;
          font-size: $font-size-h6;
          @include clamp(3);
        }

        > .item-meta {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          overflow: hidden;
          font-size: $font-size-small;
          white-space: nowrap;
          text-overflow: ellipsis;
          word-wrap: normal;
          flex-wrap: wrap;
          color: $link-color-hover;

          > .views {
            min-width: 4rem;
          }

          > .likes {
            > .liked {
              color: $red;
            }
          }

          > .likes,
          > .comments {
            min-width: 3em;
          }

          > .date,
          > .views,
          > .comments,
          > .likes,
          > .tags,
          > .categories {
            > .iconfont {
              margin-right: $xs-gap;
            }
          }

          > .categories {
            a {
              text-transform: capitalize;
              margin-right: $sm-gap;
            }
          }

          > .tags {
            margin-right: 0;
          }
        }
      }
    }

    @media (min-width: 1024px) {
      margin-bottom: $lg-gap;
      &:last-child {
        margin: 0;
      }

      > .item-content {
        $height: $gap * 15;
        $padding: $sm-gap;
        $content-height: $height - ($padding * 2);
        > .item-body {

          > .item-meta {
            flex-wrap: nowrap;
            justify-content: space-between;
            > span {
              width: auto;
            }
          }
        }
      }
    }
  }

  .block-title {
    overflow: hidden;
    z-index: $z-index-normal;
    @include radius-box($sm-radius);
    margin-top: 2rem;

    .block-button {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: $button-block-height;
      line-height: $button-block-height;
      padding-left: $gap * 2;
      color: $text-reversal;
      @include common-bg-module($transition-time-fast);

      &[disabled] {
        opacity: .6;
      }

      .iconfont {
        color: $text;
        @include color-transition();
      }

      &:hover {
        .iconfont {
          color: rgba($red, .6);
        }
      }

      > .text {
        position: relative;
        height: $button-block-height;
        padding: 0 ($gap * 2) 0 ($gap * 3);
        font-family: 'webfont-bolder', DINRegular,serif;
        text-transform: uppercase;
        color: $white;
        background: rgba($red, .6);

        &::before {
          $size: 1rem;
          content: '';
          display: block;
          position: absolute;
          width: $size;
          height: 200%;
          top: -50%;
          left: -($size / 2);
          background: $body-bg;
          transform: rotate(18deg);
        }
      }
    }
  }

  .block-title {
    overflow: hidden;
    z-index: $z-index-normal;
    @include radius-box($sm-radius);
    margin-top: $sm-gap;

    .block-button {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: $button-block-height;
      line-height: $button-block-height;
      padding-left: $gap * 2;
      color: $text-reversal;
      @include common-bg-module($transition-time-fast);

      &[disabled] {
        opacity: .6;
      }

      .iconfont {
        color: $text;
        @include color-transition();
      }

      &:hover {
        .iconfont {
          color: rgba($red, .6);
        }
      }

      > .text {
        position: relative;
        height: $button-block-height;
        padding: 0 ($gap * 2) 0 ($gap * 3);
        font-family: 'webfont-bolder', DINRegular,serif;
        text-transform: uppercase;
        color: $white;
        background: rgba($red, .6);

        &::before {
          $size: 1rem;
          content: '';
          display: block;
          position: absolute;
          width: $size;
          height: 200%;
          top: -50%;
          left: -($size / 2);
          background: $body-bg;
          transform: rotate(18deg);
        }
      }
    }
  }

  &.dark {
    .block-title {
      .block-button {
        .text {
          &::before {
            background: $module-bg-darker-1 !important;
          }
        }
      }
    }
  }

  .related {
    overflow: hidden;
    margin-top: $gap;
    .skeleton-list {
      padding: 0;
      margin: 0;
      height: 9rem;
      overflow: hidden;
      display: flex;

      .article {
        width: 12rem;
        margin-right: 1rem;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    .articles {
      list-style: none;
      padding: 0;
      margin: 0;
      width: 100%;
      overflow: hidden;
      margin-bottom: -$gap;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .item {
        width: calc((100% - #{$gap}) / 3);
        margin-bottom: $gap;
        @include radius-box($sm-radius);
        @include common-bg-module();

        &.disabled {
          pointer-events: none;
          opacity: .8;
        }

        .item-article {
          display: block;
          position: relative;
          overflow: hidden;
          opacity: .8;
          transition: opacity $transition-time-normal;

          .thumb {
            width: 100%;
            height: 10.5rem;
            background-color: $module-bg-darker-2;
            background-size: cover;
            background-position: 50% 40%;
            transition: background-position $transition-time-fast * 2;
          }

          .title {
            display: block;
            width: 100%;
            padding: 0 1em;
            line-height: 2.4;
            text-align: center;
            font-size: $font-size-small;
            color: $text-secondary;
            transition: color $transition-time-fast;
            @include text-overflow();
          }

          &:hover {
            opacity: 1;

            .thumb {
              background-position: 50% 50%;
            }

            .title {
              color: $link-color;
            }
          }
        }
      }
    }

    @media (min-width: 1024px) {
      .articles {
        .item {
          width: calc((100% - #{$gap * 3}) / 4);
          .thumb {
            height: 15rem !important;
          }
        }
      }
    }
  }

  .comment {
    margin-top: $gap;
  }
}
</style>
