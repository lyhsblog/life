<template>
  <div
    class="carrousel"
    :class="{
      mobile: false,
      dark: isDark
    }"
  >
    <placeholder
      :loading="fetching"
      :data="recommendedList.length"
    >
      <template #placeholder>
        <empty class="article-empty" key="empty">
          ARTICLE_PLACEHOLDER
        </empty>
      </template>
      <template #loading>
        <div class="article-skeleton" key="skeleton">
          <div class="title">
            <skeleton-line />
          </div>
          <div class="content">
            <div class="first">
              <skeleton-line />
            </div>
            <responsive>
              <skeleton-paragraph :lines="5" />
            </responsive>
          </div>
        </div>
      </template>
      <template #default>
        <div
          key="swiper"
          class="swiper"
          v-swiper="swiperOption"
        >
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(article, index) in recommendedList"
              :key="index"
            >
              <div class="content">
                <template v-if="article.ad">
<!--                  <a class="link" :href="`/article/`${article.id}">-->
<!--                    <img :src="article.cover" :alt="article.name">-->
<!--                    <div class="title">-->
<!--                      <div class="background"></div>-->
<!--                      <div class="prospect">-->
<!--                        <span-->
<!--                          class="text"-->
<!--                          :style="{ backgroundImage: article.thumb }"-->
<!--                        >{{ article.title }}</span>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                    <span class="ad-symbol">-->
<!--                      AD-->
<!--                    </span>-->
<!--                  </a>-->
                </template>
                <template v-else>
                  <router-link :to="`/article/${article.id}`" class="link">
                    <img
                      :src="article.cover"
                      :alt="article.name"
                      draggable="false"
                    >
                    <div class="title">
                      <div class="background"></div>
                      <div class="prospect">
                        <span
                          class="text"
                          :style="{ backgroundImage: `url('${article.cover}')` }"
                        >{{ article.name }}</span>
                      </div>
                    </div>
                  </router-link>
                </template>
              </div>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </template>
    </placeholder>

  </div>
</template>

<script>
  import { directive } from "vue-awesome-swiper";
  import Placeholder from "./widget-placeholder";
  import Empty from "./widget-empty";
  import SkeletonLine from "./skeleton/line";
  import SkeletonParagraph from "./skeleton/paragraph";
  import Responsive from "./widget-responsive"

  export default {
    name: 'ArchiveCarrousel',
    components: {SkeletonParagraph, SkeletonLine, Placeholder, Empty, Responsive},
    directives: {
      swiper: directive,
    },
    data() {
      return {
        fetching: true,
        recommendedList: [],
        swiperOption: {
          autoplay: {
            delay: 3500,
            disableOnInteraction: false
          },
          pagination: {
            clickable: true,
            el: '.swiper-pagination'
          },
          setWrapperSize: true,
          mousewheel: true,
          observeParents: true,
          // 禁用 PC 拖动手指样式
          grabCursor: false,
          // 禁用 PC 拖动
          simulateTouch: false,
          preloadImages: false,
          lazy: true
        },
      }
    },
    computed: {
      isDark: function () {
        return this.$store.state.theme === 'dark'
      }
    },
    mounted() {
      this.loadRecommendedList()
    },
    methods: {
      async loadRecommendedList () {
        this.fetching = true
        const recommendedList = await this.$axios.get("/article/related")
        this.recommendedList.push(...recommendedList.data.content)
        this.fetching = false
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import '/assets/styles/init.scss';

  $pc-carrousel-height: 210px;
  $mobile-carrousel-height: calc((100vw - 2rem) * .34);

  .carrousel {
    height: $pc-carrousel-height;
    margin-bottom: $lg-gap;
    position: relative;
    @include common-bg-module();
    @include radius-box($lg-radius);

    .article-empty {
      font-size: $font-size-h1;
      font-weight: bold;
    }

    .article-skeleton {
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

    &.dark {
      .swiper-slide {
        .title {
          .prospect {
            .text {
              -webkit-text-fill-color: $text !important;
            }
          }
        }
      }
    }

    .swiper {
      width: 595px;
      height: $pc-carrousel-height;

      // Filter for slide when transitioning
      .swiper-wrapper[style*="300ms"] {
        .swiper-slide-active {
          .content {
            @include blur-filter('horizontal');
          }
        }
      }

      .swiper-pagination {
        ::v-deep .swiper-pagination-bullet {
          &.swiper-pagination-bullet-active {
            width: 2rem;
            border-radius: $lg-radius;
          }
        }
      }

      .swiper-slide {
        .content {
          width: 100%;
          height: $pc-carrousel-height;
          position: relative;
          overflow: hidden;

          > .link {
            display: block;
            width: 100%;
            height: 100%;
          }

          img {
            width: 100%;
            transform: scale(1);
            transition: transform $transition-time-normal;

            &:hover {
              transform: scale(1.06);
            }
          }

          .ad-symbol {
            display: block;
            position: absolute;
            top: 5.6rem;
            right: 2.6rem;
            font-size: $font-size-small;
            color: $module-bg;
            border-radius: $mini-radius;
            padding: 0.1em 0.3em;
            border: 1px solid;
          }

          .title {
            $offset: 3px;
            display: block;
            position: absolute;
            top: 2rem;
            right: 2.6rem;
            opacity: .8;
            transition: opacity $transition-time-normal;

            .background {
              content: '';
              position: absolute;
              width: 100%;
              height: 100%;
              z-index: -1;
              top: 0;
              left: 0;
              background-color: $module-bg;
              transform: translate3d($offset, -$offset, 0);
              transition: transform $transition-time-fast;
            }

            .prospect {
              padding: 0 1em;
              height: 2em;
              line-height: 2em;
              @include text-overflow;
              background-color: $module-bg-opaque;
              background-position: top right;
              transform: translate3d(- $offset, $offset, 0);
              transition: transform $transition-time-fast;

              .text {
                letter-spacing: .3px;
                font-weight: bold;
                color: $text;
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }

            &:hover {
              opacity: 1;
              .background {
                transform: translate3d(0, 0, 0);
              }
              .prospect {
                transform: translate3d(0, 0, 0);
              }
            }
          }
        }
      }
    }

    @media (min-width: 320px) {
      margin-bottom: $gap;
      height: $mobile-carrousel-height;

      > .swiper {
        width: 100%;
        height: $mobile-carrousel-height;

        .swiper-slide {
          > .content {
            height: $mobile-carrousel-height;

            > .title {
              right: 1.7rem;
              max-width: 70%;
            }
          }
        }
      }
    }

    @media (min-width: 1024px) {
      margin-bottom: $gap;
      height: $pc-carrousel-height;

      > .swiper {
        width: 100%;
        height: $pc-carrousel-height;

        .swiper-slide {
          > .content {
            height: $pc-carrousel-height;

            > .title {
              right: 2.6rem;
              max-width: none;
            }
          }
        }
      }
    }
  }
</style>
