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
      <article-list-item />
      <article-list-item />
      <article-list-item />
      <article-list-item />
    </div>

    <!-- loadmore -->
    <div class="article-load">
      <button
        class="loadmore-button"
        :disabled="true"
      >
        <span class="icon">
          <i class="iconfont icon-peachblossom"></i>
        </span>
        <div class="text">LOADMORE</div>
      </button>
    </div>
  </div>
</template>

<script>
  import ArticleListItem from "./archive-list-item";

  export default {
    name: 'ArticleList',
    components: { ArticleListItem },
    computed: {
      isDark: function () {
        return this.$store.state.theme === 'dark'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '/assets/styles/init.scss';

  .articles {
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
      overflow: hidden;
      z-index: $z-index-normal;
      @include radius-box($sm-radius);

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
