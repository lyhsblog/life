<template>
  <div
    class="articles"
    :class="{
      mobile: false,
      dark: isDark
    }"
  >
    <!-- list -->
    <div class="article-list">
      <placeholder
        :data="articleList.content.length"
      >
        <template #placeholder>
          <empty class="article-empty" key="empty">
            NO DATA,TRY OTHER MENU
          </empty>
        </template>
        <template #default>
          <transition-group
            key="list"
            name="list-fade"
            tag="div"
          >
            <article-list-item :key="article.id" :article="article" v-for="article in articleList.content" />
          </transition-group>
        </template>
      </placeholder>
    </div>

    <!-- loadmore -->
    <div class="article-load">
      <div
        class="loadmore-button"
      >
        <NuxtLink
          class="prev"
          :to="{
            path: params.category ? params.category : '/',
            query: {
              ...query,
              page: articleList.number > 0 ? articleList.number - 1 : 0
            }
        }"
        >PREV</NuxtLink>
        <span class="icon">
          <i class="iconfont icon-peachblossom"></i>
        </span>
        <NuxtLink
          class="next"
          :to="{
            path: params.category ? params.category : '/',
            query: {
              ...query,
              page: articleList.number < articleList.totalPages - 1 ? articleList.number + 1 : articleList.number
            }
        }"
        >NEXT</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
  import ArticleListItem from "./article-list-item";
  import Placeholder from "./widget-placeholder";
  import SkeletonParagraph from "./skeleton/paragraph";
  import SkeletonLine from "./skeleton/line";
  import SkeletonBase from "./skeleton/base"
  import Empty from "./widget-empty"
  import {nextScreen} from "../utils/effects";
  export default {
    name: 'ArticleList',
    components: { ArticleListItem, Placeholder, SkeletonLine, SkeletonBase, SkeletonParagraph, Empty },
    props: {
      params: {
        type: Object,
        default: {}
      },
      query: {
        type: Object,
        default: {}
      },
      articleList: Object
    },
    computed: {
      isDark: function () {
        return this.$store.state.theme === 'dark'
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import '/assets/styles/init.scss';

  .articles {
    margin-top: $gap;
    .article-list-mammon {
      width: 100%;
      padding: $sm-gap;
      margin-bottom: $lg-gap;
      @include common-bg-module();
      @include radius-box($sm-radius);

      &::v-deep(.mammon-ins) {
        margin: $xs-gap 0;
        height: 100px;
      }
    }

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

    .article-list {
      margin-bottom: $lg-gap;
      min-height: $lg-gap;
      overflow: hidden;

      .empty {
        height: $gap * 10;
        font-size: $font-size-h4;
        @include common-bg-module();
        @include radius-box($sm-radius);
      }
    }

    .article-load {
      display: flex;
      overflow: hidden;
      z-index: $z-index-normal;
      @include radius-box($sm-radius);

      .loadmore-button {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: $button-block-height;
        line-height: $button-block-height;
        //padding-left: $gap * 2;
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

        > .prev {
          position: relative;
          height: $button-block-height;
          padding: 0 ($gap * 3) 0 ($gap * 2);
          font-family: 'webfont-bolder', DINRegular;
          text-transform: uppercase;
          color: $white;
          background: rgba($red, .6);

          &::after {
            $size: 1rem;
            content: '';
            display: block;
            position: absolute;
            width: $size;
            height: 200%;
            top: -50%;
            right: -($size / 2);
            background: $body-bg;
            transform: rotate(-18deg);
          }
        }

        > .next {
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
    @media (min-width: 1024px) {
      .article-load {
        .prev,.next {
          min-width: 200px;
        }
      }
    }
    &.dark {
      .article-load {
        .loadmore-button {
          .next {
            &::before {
              background: $module-bg-darker-1 !important;
            }
          }
        }
      }
    }

    &.mobile {
      > .article-list,
      > .article-list-mammon {
        margin-bottom: $gap;
      }

      > .article-list-mammon {
        padding: $sm-gap;

        &::v-deep(.mammon-ins) {
          margin: 0;
          height: 81px;
        }
      }
    }
  }
</style>
