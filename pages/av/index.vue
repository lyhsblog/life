<template>
  <div class="video-index dark">
    <placeholder
      :data="avList.numberOfElements"
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
        <empty
          class="empty"
          i18n-ley="LANGUAGE_KEYS.ARTICLE_PLACEHOLDER"
        />
      </template>
      <template #default>
        <div class="related">
          <ul class="articles" key="avs">
            <li
              class="item"
              v-for="av in avList.content"
              :key="av.id"
            >
              <router-link
                class="item-article"
                :to="`/manga/${av.id}`"
              >
                <div
                  class="thumb"
                  :style="{
                  backgroundImage: `url('${av.cover}')`
                }"
                />
                <div class="title">{{av.name}}</div>
              </router-link>
            </li>
          </ul>
          <div class="article-load">
            <button
              class="loadmore-button"
              :disabled="avList.last"
              @click="loadAvList"
            >
                  <span class="icon">
                    <i class="iconfont icon-peachblossom"></i>
                  </span>
              <div class="text">LOADMORE</div>
            </button>
          </div>
        </div>
      </template>
    </placeholder>
  </div>
</template>

<script>
import Placeholder from "../../components/widget-placeholder";
import SkeletonLine from "../../components/skeleton/line";
import SkeletonBase from "../../components/skeleton/base";
import SkeletonParagraph from "../../components/skeleton/paragraph";
import Empty from "../../components/widget-empty";
export default {
  name: "MangaIndex",
  components: { Placeholder, SkeletonLine, SkeletonBase, SkeletonParagraph, Empty },
  data() {
    return {
      fetching: true,
      avList: {
        content: []
      },
    }
  },
  mounted() {
    this.loadAvList()
    this.initSearch()
  },
  methods: {
    async loadAvList () {
      const avList = this.avList
      if(!avList.last || avList.number === -1 || true) {
        this.fetching = true
        const avs = await this.$axios.$get('/manga', {
          params: {
            page: avList.number + 1,
          }
        })
        avList.content.push(...avs.content)
        avList.empty = avs.empty
        avList.first = avs.first
        avList.last = avs.last
        avList.number = avs.number
        avList.numberOfElements = avs.content.size
        avList.totalElements = avs.totalElements
        avList.totalPages = avs.totalElements
        this.fetching = false
      }
    },
    async initSearch() {
      this.$store.commit('changeSearchCall', this.search)
    },
    async search(parmas) {
      const avList = this.avList = {
        content: []
      }
      this.fetching = true
      const avs = await this.$axios.$get('/manga', {
        params: {
          ...parmas
        }
      })
      avList.content.push(...avs.content)
      avList.empty = avs.empty
      avList.first = avs.first
      avList.last = avs.last
      avList.number = avs.number
      avList.numberOfElements = avs.content.size
      avList.totalElements = avs.totalElements
      avList.totalPages = avs.totalElements
      this.fetching = false
    },
  }
}
</script>

<style lang="scss">
@import '/assets/styles/init.scss';

.video-index {
  .article-list-skeleton {
    padding: 0;
    margin: 0;
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
  .related {
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

    .articles {
      list-style: none;
      padding: 0;
      width: 100%;
      overflow: hidden;
      margin-bottom: 0 0 -$gap;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .item {
        width: calc((100% - #{$gap}) / 2);
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
            height: 8rem;
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
          width: calc((100% - #{$gap * 3}) / 3);
          .thumb {
            height: 9rem !important;
          }
        }
      }
    }
  }

  .article-load {
    overflow: hidden;
    z-index: $z-index-normal;
    @include radius-box($sm-radius);
    margin-top: 1rem;

    .loadmore-button {
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
    .article-load {
      .loadmore-button {
        .text {
          &::before {
            background: $module-bg-darker-1 !important;
          }
        }
      }
    }
  }
}

</style>
