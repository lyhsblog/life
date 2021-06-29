<template>
  <div class="novel-page">
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
          :data="novelList.numberOfElements"
        >
          <template #placeholder>
            <empty
              class="empty"
              i18n-ley="LANGUAGE_KEYS.ARTICLE_PLACEHOLDER"
            />
            <empty
          </template>
          <template #default>
            <transition-group
              key="list"
              name="list-fade"
              tag="div"
            >
              <div
                class="article-list-item"
                v-for="novel in novelList.content" :key="novel.id"
              >
                <div
                  class="item-background"
                />
                <div class="item-content">
                  <div class="item-thumb">
                    <NuxtLink :to="`/article/${novel.id}`">
                      <span
                        class="item-oirigin self"
                      >
                        Origin
                      </span>
                      <img
                        class="item-thumb-img"
                        :src="novel.cover || '/images/2020-08-14-sea-1.webp'"
                        :alt="novel.name">
                    </NuxtLink>
                  </div>
                  <div class="item-body">
                    <h5 class="item-title">
                      <NuxtLink
                        :to="`/novel/${novel.id}`"
                      >
                        {{ novel.name }}
                      </NuxtLink>
                    </h5>
                    <p
                      class="item-description"
                      style="-webkit-box-orient: vertical;"
                      v-html="novel.description || 'No description'"
                    ></p>
                    <div class="item-meta">
                      <span class="date">
                        <i class="iconfont icon-clock"></i>
                        <span>a day ago</span>
                      </span>
                      <span class="views">
                        <i class="iconfont icon-eye"></i>
                        <span>{{novel.clicks || 0}}</span>
                      </span>
                      <span class="comments">
                        <i class="iconfont icon-comment"></i>
                        <span>0</span>
                      </span>
                      <span class="likes">
                        <i class="iconfont icon-heart"></i>
                        <span>{{novel.likes || 0}}</span>
                      </span>
                      <span class="tags">
                        <i class="iconfont icon-tag"></i>
                        <span>{{novel.tags.length}}</span>
                      </span>
                      <span class="categories">
                        <i class="iconfont icon-list"></i>
                        <router-link
                          to="/"
                        >
                          {{novel.category || 'No category'}}
                        </router-link>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </transition-group>
          </template>
        </placeholder>
      </div>

      <!-- loadmore -->
      <div class="article-load">
        <button
          class="loadmore-button"
          :disabled="novelList.last"
        >
        <span class="icon">
          <i class="iconfont icon-peachblossom"></i>
        </span>
          <div class="text">LOADMORE</div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import Placeholder from "../../components/widget-placeholder";
  import SkeletonLine from "../../components/skeleton/line";
  import SkeletonBase from "../../components/skeleton/base";
  import SkeletonParagraph from "../../components/skeleton/paragraph";
  import Empty from "../../components/widget-empty";
  import {nextScreen} from "../../utils/effects";
  export default {
    name: 'Novel',
    head() {
      return  {
        title: 'NOVEL-567WATCH',
        meta: [
          { charset: 'utf-8' },
          {
            hid: 'description',
            name: 'description',
            content: 'index for novel'
          }
        ],
      }
    },
    components: {Placeholder, SkeletonLine, SkeletonBase, SkeletonParagraph, Empty},
    data() {
      return {
        novelList: {
          content: [],
          empty: true,
          first: true,
          last: false,
          number: -1,
          numberOfElements: 0,
          totalElements: 0,
          totalPages: 0,
        },
      }
    },
    computed: {
      isDark: function () {
        return this.$store.state.theme === 'dark'
      },
    },
    async asyncData({$axios, params}) {
      const novelList = await $axios.$get('/novel', {
        params: {
          ...params
        }
      }).then(res => res)
      return {
        novelList
      }
    },
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

    .article-list-item {
      position: relative;
      margin-bottom: $gap;
      @include radius-box($sm-radius);

      &:last-child {
        margin: 0;
      }

      .item-background {
        display: none;
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
        background-size: 120%;
        background-position: 0% 50%;
        opacity: .06;
      }

      > .item-content {
        $height: $gap * 11;
        $padding: $sm-gap;
        $content-height: $height - ($padding * 2);
        display: block;
        height: auto;
        padding: $sm-gap $gap;
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
          display: none;
          float: left;
          width: 15rem;
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
          width: 100%;
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
            height: auto;
            margin: 0 0 .5em;
            line-height: 1.8em;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: $font-size-h6;
            @include clamp(3);
          }

          > .item-meta {
            height: 2em;
            line-height: 2em;
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            overflow: hidden;
            font-size: $font-size-small;
            white-space: nowrap;
            text-overflow: ellipsis;
            word-wrap: normal;

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
        .item-background {
          display: block;
        }

        > .item-content {
          $height: $gap * 11;
          $padding: $sm-gap;
          $content-height: $height - ($padding * 2);
          display: block;
          height: $height;
          padding: $padding;

          > .item-thumb {
            display: block;
          }

          > .item-body {
            width: 32rem;
            height: $content-height;

            > .item-description {
              height: 5rem;
              margin: 0 0 $xs-gap;
            }
          }
        }
      }
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
