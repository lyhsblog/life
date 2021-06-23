<template>
  <div class="manga-index dark">
    <placeholder
      :data="mangaList.numberOfElements"
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
          <ul class="articles" key="mangas">
            <li
              class="item"
              v-for="manga in mangaList.content"
              :key="manga.id"
            >
              <router-link
                class="item-article"
                :to="`/manga/${manga.id}`"
              >
                <div
                  class="thumb"
                  :style="{
                  backgroundImage: `url('${manga.cover}')`
                }"
                />
                <div class="title">{{manga.name}}</div>
              </router-link>
            </li>
          </ul>
          <div class="article-load">
            <button
              class="loadmore-button"
              :disabled="mangaList.last"
              @click="loadMangaList"
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
      mangaList: {
        content: [],
        number: -1,
      },
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.loadMangaList()
    },
    async loadMangaList () {
      const mangaList = this.mangaList
      if(!mangaList.last || mangaList.number === -1 || true) {
        this.fetching = true

        const params = {
          ...this.$route.query
        };
        if(this.$route.query) {
          params.page = 0
        }else {
          params.page = mangaList.number + 1
        }

        const mangas = await this.$axios.$get('/manga', {
          params: {
            ...params
          }
        })
        if(this.$route.query) {
          mangaList.content= []
        }
        mangaList.content.push(...mangas.content)
        mangaList.empty = mangas.empty
        mangaList.first = mangas.first
        mangaList.last = mangas.last
        mangaList.number = mangas.number
        mangaList.numberOfElements = mangas.content.size
        mangaList.totalElements = mangas.totalElements
        mangaList.totalPages = mangas.totalElements
        setTimeout(() => {
          this.fetching = false
        }, 1000)
      }
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

<style lang="scss">
@import '/assets/styles/init.scss';

.manga-index {
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
