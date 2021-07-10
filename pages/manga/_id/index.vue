<template>
  <div id="manga-detail" :class="{dark: isDark}">
    <placeholder
      :data="article.id != null"
    >
      <template #placeholder>
        <empty class="article-empty" key="empty">
          NO DATA,TRY OTHER MENU
        </empty>
      </template>
      <template #default>
          <div
            class="info"
          >
            <div
              class="item-background"
            />
            <div class="item-content">
              <div class="item-thumb">
            <span
              class="item-oirigin self"
            >
              Origin
            </span>
                  <img
                    class="item-thumb-img"
                    :src="`https://img.567.watch/AfrOrF3gWeDA6VOlDG4TzxMv39O7MXnF4CXpKUwGqRM/fit/400/300/sm/0/plain/${article.cover}@webp`"
                    :alt="article.name"
                    width="0"
                    height="0">
              </div>
              <div class="item-body">
                <h5 class="item-title">
                  {{ article.name }}
                </h5>
                <p
                  class="item-description"
                  style="-webkit-box-orient: vertical;"
                  v-html="article.description || 'No description'"
                ></p>
                <div class="item-meta">
              <span class="date">
                <i class="iconfont icon-clock"></i>
                <span>a day ago</span>
              </span>
                  <span class="views">
                <i class="iconfont icon-eye"></i>
                <span>{{article.clicks || 0}}</span>
              </span>
                  <span class="comments">
                <i class="iconfont icon-comment"></i>
                <span>0</span>
              </span>
                  <span class="likes">
                <i class="iconfont icon-heart"></i>
                <span>{{article.likes || 0}}</span>
              </span>
                  <span class="tags">
                <i class="iconfont icon-tag"></i>
                <span>{{article.tags.length}}</span>
              </span>
                  <span class="categories">
                <i class="iconfont icon-list"></i>
                <span>
                  {{article.category || 'No category'}}
                </span>
              </span>
                </div>
              </div>
            </div>
          </div>
      </template>
    </placeholder>
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
    <placeholder
      :data="episodes.length"
    >
      <template #placeholder>
        <empty class="article-empty" key="empty">
          NO DATA,TRY OTHER MENU
        </empty>
      </template>
      <template #default>
        <div class="episodes">
          <ul class="container">
            <li
              class="item"
              v-for="(episode, index) in episodes"
              :key="episode.id"
            >
              <router-link
                class="link"
                :to="`/manga/ep/${episode.manga.id}/${index}`"
                noindex
              >
                <div class="title">{{episode.name}}</div>
              </router-link>
            </li>
          </ul>
        </div>
      </template>
    </placeholder>

    <div class="block-title">
      <button
        class="block-button"
        :disabled="false"
      >
          <span class="icon">
            <i class="iconfont icon-peachblossom"></i>
          </span>
        <div class="text">RELATED</div>
      </button>
    </div>
    <placeholder
      :data="related.length"
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
        <div class="related">
          <ul class="container">
            <li
              class="item"
              v-for="manga in related"
              :key="manga.id"
            >
              <router-link
                class="link"
                :to="`/manga/${manga.id}`"
              >
                <div
                  class="thumb"
                  :style="{
                    backgroundImage: `url('https://img.567.watch/AfrOrF3gWeDA6VOlDG4TzxMv39O7MXnF4CXpKUwGqRM/fit/400/300/sm/0/plain/${manga.cover}@webp')`
                  }"
                />
                <div class="title">{{manga.name}}</div>
              </router-link>
            </li>
          </ul>
        </div>
      </template>
    </placeholder>
  </div>
</template>

<script>
import SkeletonParagraph from "../../../components/skeleton/paragraph";
import SkeletonLine from "../../../components/skeleton/line";
import Placeholder from "../../../components/widget-placeholder";
import Empty from "../../../components/widget-empty";
import Responsive from "../../../components/widget-responsive";

export default {
  name: "MangaDetailIndex",
  components: {SkeletonParagraph, SkeletonLine, Placeholder, Empty, Responsive},
  head() {
    return  {
      title: `${this.article.name}-567.WATCH`,
      meta: [
        { charset: 'utf-8' },
        {
          hid: 'description',
          name: 'description',
          content: this.article.description
        }
      ],
    }
  },
  data() {
    return {
      fetching: true,
      article: {},
      episodes: [],
      related: [],
    }
  },
  computed: {
    isDark: function () {
      return this.$store.state.theme === 'dark'
    }
  },
  async asyncData({$axios, params}) {
    const article = await $axios.$get("/manga/" + params.id).then(res => res)
    const episodes = await $axios.$get("/manga/" + params.id+"/episodes").then(res => res)
    return {
      article,
      episodes
    }
  },
  mounted() {
    this.loadRelated()
  },
  methods: {
    async loadRelated() {
      this.fetching = true
      const related = await this.$axios.get("/manga/"+this.$route.params.id+"/related")
      this.related.push(...related.data.content)
      this.fetching = false
    },
  }
}
</script>

<style lang="scss" scoped>
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

.article-skeleton {
  background: var(--module-bg);
  position: relative;
  width: 100%;
  height: 100%;
  padding: 2rem;

  .content {
    width: 50%;
    margin-top: 2.6rem;
    margin-left: 1rem;

    .first {
      width: 8rem;
      height: $gap * 2;
      margin-bottom: $gap;
    }
  }

  .title {
    position: absolute;
    top: 2rem;
    right: 2rem;
    height: 2.6rem;
    width: 18rem;
  }
}

#manga-detail {
  .info {
    position: relative;
    margin-bottom: $gap;
    @include radius-box($sm-radius);

    &:last-child {
      margin: 0;
    }

    .item-background {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: -1;
      background-size: 120%;
      background-position: 0% 50%;
      opacity: .06;
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

      &:hover {
        .item-thumb {
          .item-oirigin {
            opacity: 1;
          }

          .item-thumb-img {
            opacity: .95;
            transform: translateX(-3px);
          }
        }
      }

      > .item-thumb {
        float: left;
        width: 10rem;
        height: $content-height;
        overflow: hidden;
        position: relative;

        .item-oirigin {
          $height: 2.1rem;
          $opacity: .8;
          position: absolute;
          left: 0;
          top: 0;
          height: $height;
          line-height: $height;
          z-index:  $z-index-normal + 1;
          padding: 0 $sm-gap;
          opacity: .4;
          font-size: $font-size-small;
          color: $white;
          text-align: center;
          text-transform: uppercase;
          @include visibility-transition();

          &.self {
            background-color: rgba($accent, $opacity);
          }
          &.other {
            background-color: rgba($red, $opacity);
          }
          &.hybrid {
            background-color: rgba($primary, $opacity);
          }
        }

        .item-thumb-img {
          min-width: 100%;
          width: calc(100% + 3px);
          max-width: calc(100% + 3px);
          height: auto;
          min-height: $content-height;
          border-color: transparent;
          background-color: $module-bg-hover;
          opacity: 1;
          transform: translateX(0);
          transition: transform $transition-time-normal, opacity $transition-time-normal;
        }
      }

      > .item-body {
        float: right;
        width: calc(100% - 11rem);
        height: auto;
        > .item-title {
          margin-top: 3px;
          margin-bottom: $sm-gap;
          font-weight: bold;
          color: $link-color-hover;
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
          justify-content: flex-start;
          align-items: baseline;
          overflow: hidden;
          font-size: $font-size-small;
          white-space: nowrap;
          text-overflow: ellipsis;
          word-wrap: normal;
          flex-wrap: wrap;
          > span {
            width: 100%;
          }

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
          height: $content-height;
          > .item-description {
            height: 8.5rem;
            margin-bottom: $xs-gap;
          }

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
        font-family: 'webfont-bolder', DINRegular;
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

  .episodes {
    margin-top: $gap;
    overflow: hidden;

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

    .container {
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

        .link {
          display: block;
          position: relative;
          overflow: hidden;
          opacity: .8;
          transition: opacity $transition-time-normal;

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

            .title {
              color: $link-color;
            }
          }
        }
      }
    }

    @media (min-width: 1024px) {
      .container {
        .item {
          width: calc((100% - #{$gap * 3}) / 3);
          .thumb {
            height: 15rem !important;
          }
        }
      }
    }
  }

  .related {
    margin-top: 1rem;
    overflow: hidden;
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

    .container {
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

        .link {
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
      .container {
        .item {
          width: calc((100% - #{$gap * 3}) / 4);
          .thumb {
            height: 15rem !important;
          }
        }
      }
    }
  }
}

</style>

