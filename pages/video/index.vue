<template>
  <div class="video-index dark">
    <archive-list-header
      background-color=""
      background-image=""
      icon=""
    >
      <span>XXXXXXXXXXXXXX</span>
    </archive-list-header>

    <div>
      <div class="related">
        <ul class="articles" key="articles">
          <li
            class="item"
            v-for="n in 6"
            :key="n"
          >
            <router-link
              class="item-article"
              to="/"
            >
              <div class="thumb"/>
              <div class="title">title</div>
            </router-link>
          </li>
        </ul>
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
    </div>
  </div>
</template>

<script>
import ArchiveListHeader from "../../components/archive-header";
export default {
  name: "MangaIndex",
  components: {
    ArchiveListHeader
  },
}
</script>

<style lang="scss">
@import '/assets/styles/init.scss';

.video-index {
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

      .item {
        float: left;
        width: calc((100% - #{$gap * 2}) / 3);
        margin-right: $gap;
        margin-bottom: $gap;
        @include radius-box($sm-radius);
        @include common-bg-module();

        &.disabled {
          pointer-events: none;
          opacity: .8;
        }

        &:nth-child(3n) {
          margin-right: 0;
          margin-bottom: 0;
        }

        .item-article {
          display: block;
          position: relative;
          overflow: hidden;
          opacity: .8;
          transition: opacity $transition-time-normal;

          .thumb {
            width: 100%;
            height: 7.4rem;
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

    &.mobile {
      .articles {
        .item {
          width: calc((100% - #{$gap}) / 2);
          margin-right: $gap;
          margin-bottom: $gap;
          &:nth-child(2n) {
            margin-right: 0;
            margin-bottom: 0;
          }

          .thumb {
            height: 6rem;
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
