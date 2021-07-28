<template>
  <div
    class="announcement"
    :class="{
      mobile: true,
      dark: isDark
    }"
  >
    <placeholder
      :data="announcements.length"
      :loading="fetching"
    >
      <template #placeholder>
        <empty class="announcement-empty" key="empty">
          ARTICLE_PLACEHOLDER
        </empty>
      </template>
      <template #loading>
        <div class="announcement-skeleton" key="skeleton">
          <div class="left">
            <skeleton-line />
          </div>
          <div class="right">
            <skeleton-line />
          </div>
        </div>
      </template>
      <template #default>
        <div class="wrapper" key="wrapper">
          <div
            class="background"
            :data-content="announcements[0].content"
          />
          <div class="title">
            <span
              class="icon-box"
              :style="{ transform: `rotate(-${activeIndex * 90}deg)` }"
            >
              <i class="iconfont icon-windmill" />
            </span>
          </div>
          <div class="swiper-box">
            <div v-swiper="swiperOption" class="swiper" @transition-start="handleSwiperTransitionStart">
              <div class="swiper-wrapper">
                <div class="swiper-slide" :key="an.content" v-for="an in announcements">
                  <div class="content" v-html="an.content" />
                  <div class="date">{{ an.time }}</div>
                </div>
              </div>
            </div>
            <div class="navigation">
              <div
                class="button prev"
                :class="{ disabled: activeIndex === 0 }"
                @click="prevSlide"
              >
                <i class="iconfont icon-announcement-prev" />
              </div>
              <div
                class="button next"
                :class="{ disabled: activeIndex === announcements.length - 1 }"
                @click="nextSlide"
              >
                <i class="iconfont icon-announcement-next" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </placeholder>
  </div>
</template>

<script>
  import { directive } from "vue-awesome-swiper";
  import Placeholder from "./widget-placeholder";
  import SkeletonLine from "./skeleton/line";

  export default {
    name: 'ArchiveAnnouncement',
    components: {SkeletonLine, Placeholder},
    directives: {
      swiper: directive,
    },
    data() {
      const swiperOption = {
        height: 42,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false
        },
        allowTouchMove: false,
        slidesPerView: 1,
        setWrapperSize: true,
        direction: 'vertical',
      }

      const prevSlide = () => this.$swiper.slidePrev()
      const nextSlide = () => this.$swiper.slideNext()
      const handleSwiperTransitionStart = () => this.activeIndex = this.$swiper.activeIndex || 0

      return {
        fetching: false,
        announcements: [
          {
            'content': '我想要1000YOUTUBE訂閱，拜託了',
            'time': 'now'
          },
          {
            'content': '也许高楼越漂亮，我们越痛苦',
            'time': '1 days ago'
          },
          {
            'content': '失去希望，失去一切',
            'time': '3 days ago'
          },
          {
            'content': '不想持有十年以上，就不要持有一分钟',
            'time': '1 weeks ago'
          },
          {
            'content': '真的要 IFC 天台见了😢',
            'time': '2 weeks ago'
          },
          {
            'content': '自由无价，但也很廉价',
            'time': '4 months ago'
          },
          {
            'content': '怎么也飞不出，花花的世界',
            'time': '6 months ago'
          },
          {
            'content': '我想表达的都在推上了',
            'time': '1 years ago'
          },
          {
            'content': '森吉德玛，长生天公主，影后是实至名归',
            'time': '1 years ago'
          },
          {
            'content': '真正的自由职业应该是自由而快乐的',
            'time': '1 years ago'
          },
        ],
        swiperOption,
        activeIndex: 0,
        prevSlide,
        nextSlide,
        handleSwiperTransitionStart
      }
    },
    computed: {
      isDark: function () {
        return this.$store.state.theme === 'dark'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '/assets/styles/init.scss';

  $announcement-height: 42px;
  $title-width: 10%;
  $content-width: 100% - $title-width;
  $demarcation-width: 74%;

  .announcement {
    position: relative;
    margin-bottom: $gap;
    height: $announcement-height;
    line-height: $announcement-height;
    font-size: $font-size-h6;
    color: $text-secondary;
    @include common-bg-module();
    @include radius-box($xs-radius);

    .announcement-empty {
      height: 100%;
      min-height: auto;
    }

    .announcement-skeleton {
      display: flex;
      width: 100%;
      height: 100%;
      padding: $sm-gap;

      .left {
        width: 68%;
        margin-right: $gap;
      }
      .right {
        flex: 1;
      }
    }

    &.dark {
      .background {
        &::after {
          background: $module-bg-darker-1;
        }
      }
    }

    .background {
      display: none;
      position: absolute;
      width: $demarcation-width;
      height: 100%;
      background: linear-gradient(
        66deg,
        $module-bg-opaque,
        $module-bg-lighter
        66%
      );

      &::before {
        content: attr(data-content);
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        font-size: 6em;
        font-weight: bold;
        direction: rtl;
        opacity: .2;
        z-index: -1;
        @include text-overflow(clip);
      }

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
        transform: rotate(18deg);
      }
    }

    .title {
      float: left;
      width: $title-width;
      text-align: center;
      font-size: $font-size-base;

      .icon-box {
        display: inline-block;
        transform: rotate(0deg);
        transition: transform .3s;
      }
    }

    .swiper-box {
      float: right;
      display: flex;
      width: $content-width;

      .swiper {
        flex: 1;
        height: $announcement-height;

        .swiper-wrapper {
          flex-direction: column;
          // Filter for slide when transitioning
          &[style*="300ms"] {
            .swiper-slide-active {
              .content {
                @include blur-filter('vertical-small');
              }
            }
          }
        }

        .swiper-slide {
          width: auto;
          display: flex;
          justify-content: space-between;
          height: $announcement-height;

          .content {
            max-width: 100%;
            position: relative;
            font-weight: bold;
            @include text-overflow();

            ::v-deep(p) {
              margin: 0;
              max-width: 100%;
              @include text-overflow();
            }

            a {
              border-bottom: 1px solid;
            }
          }

          .date {
            display: none;
            color: $text-dividers;
            margin-right: $xs-gap;
          }
        }
      }

      .navigation {
        display: flex;
        flex-direction: column;
        width: 3rem;
        height: $announcement-height;

        .button {
          height: 50%;
          text-align: center;
          color: $text-dividers;
          cursor: pointer;
          @include color-transition();

          &:hover {
            color: $text;
          }

          &.disabled {
            opacity: .8;
            color: $text-dividers;
            cursor: no-drop;
          }

          &.prev {
            line-height: 2;
          }

          &.next {
            line-height: 1.4;
          }
        }
      }
    }

    @media (min-width: 1024px) {
      margin-bottom: $lg-gap;
      .background {
        display: block;
      }
      .swiper-box {
        .swiper {
          .swiper-slide {
            .content {
              max-width: 76%;
            }
            .date {
              display: block;
            }
          }
        }
      }
    }
  }
</style>
